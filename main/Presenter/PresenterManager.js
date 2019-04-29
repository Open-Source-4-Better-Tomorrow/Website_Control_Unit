/* eslint-disable no-undef */

/**
 * PresenterManager manages the Model-View-View-Model all interactions.
 * In short, is responsible for supervising preparation of the next view from the conceptual point of view.
 *
 *
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function () {

    var _CORE_OBJECT = {
        __init__: function () {
            // init variables
            this.Variables.__init__();

            // setup event flow
            this.Functions.bindListenersToEvents([_EVENTS_OBJECT.initEvents, _EVENTS_OBJECT.statefulEvents, _EVENTS_OBJECT.nextViewEvents]);
        },

        Variables: {
            __init__: function () {
                // setup event flow
                this.resource_notification_array = [
                                                    _EVENTS_OBJECT.statefulEvents.onPresenterViewReady.eventName,
                                                    _EVENTS_OBJECT.statefulEvents.onPresenterModelReady.eventName
                                                   ];
            },

            resource_path_array: ['/Presenter/Presenter.View.resources.txt', '/Presenter/Presenter.Model.resources.txt'],

            resource_type_array: ['js', 'js'],

            resource_separator_array: [',', ','],

            resource_notification_array: null,

            resource_isJSONFormat_array: [false, false],

            resilient_attempt_time_interval: 50
        },

        Functions: {
            run: function () {
                return run_I_1L();



                /**
                 * Local helper functions
                */
                function run_I_1L() {
                    for(var i = 0, length = _CORE_OBJECT.Variables.resource_path_array.length; i < length; i++) {
                        flatFileAPI.Factory.LoadObject.createNew(
                                                                _CORE_OBJECT.Variables.resource_type_array[i],
                                                                _CORE_OBJECT.Variables.resource_separator_array[i],
                                                                _CORE_OBJECT.Variables.resource_notification_array[i],
                                                                _CORE_OBJECT.Variables.resource_isJSONFormat_array[i],
                                                                _CORE_OBJECT.Variables.resilient_attempt_time_interval
                                                                )
                                                                .Functions.loadFlatFile(_CORE_OBJECT.Variables.resource_path_array[i]);
                    }
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
            loadYourOwnResources: {
                eventName: 'LoadYourOwnResources',

                eventListener: function() {
                    return loadYourOwnResources_I_1L();



                    /**
                     * Local helper functions
                    */
                    function loadYourOwnResources_I_1L() {
                        // kick off the load of core resources
                        _CORE_OBJECT.Functions.run();
                    }
                }
            }
        },

        statelessEvents: {
            onPresenterReady: {
                eventName: 'OnPresenterReady'
            }
        },

        statefulEvents: {
            onPresenterViewReady: {
                eventName: 'OnPresenterViewReady',

                eventListener: function() {
                    return onPresenterViewReady_I_1L(_EVENTS_OBJECT.statefulEvents.onPresenterViewReady);



                    /**
                     * Local helper functions
                    */
                    function onPresenterViewReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all events completed by this time
                        _EVENTS_OBJECT.checkEventsCompletion(_EVENTS_OBJECT.statefulEvents);
                    }
                },

                hasCompleted: false
            },

            onPresenterModelReady: {
                eventName: 'OnPresenterModelReady',

                eventListener: function() {
                    return onPresenterModelReady_I_1L(_EVENTS_OBJECT.statefulEvents.onPresenterModelReady);



                    /**
                     * Local helper functions
                    */
                    function onPresenterModelReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all events completed by this time
                        _EVENTS_OBJECT.checkEventsCompletion(_EVENTS_OBJECT.statefulEvents);
                    }
                },

                hasCompleted: false
            }
        },

        nextViewEvents: {
            onGetNextView: {
                eventName: 'OnGetNextView',

                eventListener: function() {
                    return onGetNextView_I_1L();



                    /**
                     * Local helper functions
                    */
                    function onGetNextView_I_1L() {
                        console.log("Presenter took control from FCU (Flow Control Unit), and will start yielding \"the next view on demand\"...");
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
                    // return control to FCU
                    _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onPresenterReady.eventName);
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


    // kick of self-init
    _CORE_OBJECT.__init__();

})();