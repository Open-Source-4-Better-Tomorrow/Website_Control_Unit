/* eslint-disable no-empty */

/**
 * Module Entry Point controls loading of the critical resources
 *
 *
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function (window) {


    var _CORE_OBJECT = {
        __init__: function (mep_resources_path) {
            // setup event flow
            this.Functions.bindListenersToEvents([_EVENTS_OBJECT.initEvents, _EVENTS_OBJECT.dynamicEvents]);

            // kick off the load process
            this.Functions.run(mep_resources_path);
        },

        Variables: {
            resource_type: 'js',
            resource_separator: ',',

            resilient_attempt_time_interval: 50
        },

        Functions: {
            run: function (path_to_resources) {
                return run_I_1L(path_to_resources);



                /**
                 * Local helper functions
                */
                function run_I_1L(path_to_resources) {
                    flatFileAPI.Factory.LoadObject.createNew(
                                                            _CORE_OBJECT.Variables.resource_type,
                                                            _CORE_OBJECT.Variables.resource_separator,
                                                            _EVENTS_OBJECT.initEvents.onMepReady.eventName,
                                                            _CORE_OBJECT.Variables.resilient_attempt_time_interval
                                                            )
                                                            .Functions.loadFlatFile(path_to_resources);
                }
            },

            bindListenersToEvents: function(arrayOfEventObjectCollection) {
                return bindListenersToEvents_I_1L(arrayOfEventObjectCollection);



                /**
                 * Local helper functions
                */
                function bindListenersToEvents_I_1L(arrayOfEventObjectCollection) {
                    // iterate over array of event object collections
                    for(var i = 0, length = arrayOfEventObjectCollection.length; i < length; i++) {
                        // access current event object collection
                        var eventObjectCollection = arrayOfEventObjectCollection[i];

                        // iterate over event objects
                        for(var eventObject in eventObjectCollection) {
                            // access current event object
                            var customEventObject = eventObjectCollection[eventObject];

                            // if current event object has appropriate structure, bind its listener to its event
                            if(customEventObject.eventListener)
                                _EVENTS_OBJECT.addEventListener(customEventObject.eventName, customEventObject.eventListener);
                        }
                    }
                }
            }
        }
    };

    var _EVENTS_OBJECT = {
        initEvents: {
            onMepReady: {
                eventName: 'OnMepReady',
                eventListener: function() {
                    return dispatchLoadOrders_I_1L();



                    /**
                     * Local helper functions
                    */
                    function dispatchLoadOrders_I_1L() {
                        // call on Presenter and Model to load their own resources
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.staticEvents.loadYourOwnResources.eventName);
                    }
                }
            },
        },

        staticEvents: {
            loadYourOwnResources: {
                eventName: 'LoadYourOwnResources'
            }
        },

        dynamicEvents: {
            onPresenterReady: {
                eventName: 'OnPresenterReady',

                eventListener: function() {
                    return onPresenterReady_I_1L(this);



                    /**
                     * Local helper functions
                    */
                    function onPresenterReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all events completed by this time
                        _EVENTS_OBJECT.checkEventsCompletion(_EVENTS_OBJECT.dynamicEvents);
                    }
                },

                hasCompleted: false
            },

            onModelReady: {
                eventName: 'OnModelReady',

                eventListener: function() {
                    return onModelReady_I_1L(this);



                    /**
                     * Local helper functions
                    */
                    function onModelReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all events completed by this time
                        _EVENTS_OBJECT.checkEventsCompletion(_EVENTS_OBJECT.dynamicEvents);
                    }
                },

                hasCompleted: false
            }
        },

        checkEventsCompletion : function(eventObjectCollection) {
            return checkEventsCompletion_I_1L(eventObjectCollection);



            /**
             * Local helper functions
            */
            function checkEventsCompletion_I_1L(eventObjectCollection) {
                // assume all events have completed successfully
                var allEventsCompleted = true;

                // iterate over all event objects to assess the completion status
                for(var eventObjectKey in eventObjectCollection) {
                    // on first event that haven't completed yet, abort the assessment
                    if(!eventObjectCollection[eventObjectKey].hasCompleted) {
                        allEventsCompleted = false;
                        break;
                    }
                }

                // act appropriately
                if(allEventsCompleted) {
                    _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.staticEvents.loadYourOwnResources.eventName);
                }
            }
        },

        addEventListener : function(eventName, eventListener) {
            return addEventListener_I_1L(eventName, eventListener);



            /**
             * Local helper functions
            */
            function addEventListener_I_1L(eventName, eventListener) {
                document.addEventListener(eventName, eventListener);
            }
        }
    };

    var _DISPATCHER_OBJECT = {
        dispatchEvent : function(eventName, eventDetails) {
            return dispatchEvent_I_1L(eventName, eventDetails);



            /**
             * Local helper functions
            */
            function dispatchEvent_I_1L(eventName, eventDetails) {
                var customEvent;

                if(eventDetails)
                    customEvent = new CustomEvent(eventName, { bubbles: false, cancelable: false, detail: eventDetails });
                else
                    customEvent = new CustomEvent(eventName);

                document.dispatchEvent(customEvent);
            }
        }
    };



    // Expose module API to the outside world
    window.mep = window.mep || _CORE_OBJECT;
})(window);