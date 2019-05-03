/* eslint-disable no-undef */

/**
 * Model-to-View Binder Factory
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

    var _CUSTOM_MODEL_TO_VIEW_BINDER_OBJECT_FACTORY = {
        Factory: {
            BinderObject: {
                createNew: function () {
                    return createNew_I_1L();



                    /**
                     * Local helper functions
                    */
                    function createNew_I_1L() {
                        // create brand new instance of custom flat file load object
                        var _CUSTOM_MODEL_TO_VIEW_BINDER_OBJECT = {

                            Functions: {
                                bindModelWithView : function (htmlTemplate, modelData) {
                                    return bindModelWithView_I_1L(htmlTemplate, modelData);



                                    /**
                                     * Local helper functions
                                    */
                                    function bindModelWithView_I_1L(htmlTemplate, modelData) {
                                        _debugger.count("Binding model with html template... attempt # ");
                                        _debugger.count("Binding model with html template... completed ! attempt # ");
                                    }
                                }
                            }
                        };

                        // return fresh instance
                        return _CUSTOM_MODEL_TO_VIEW_BINDER_OBJECT;
                    }
                }
            }
        }
    };

    var _CORE_OBJECT = {
        __init__: function () {
            // setup event flow
            this.Functions.bindListenersWithEvents([_EVENTS_OBJECT.statefulEvents]);
        },

        Functions: {
            bindListenersWithEvents: function(arrayOfEventObjectCollection) {
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
                                addEventListener_I_2L(customEventObject.eventName, customEventObject.eventListener);
                        }
                    }



                    /**
                     * Local helper functions
                    */
                    function addEventListener_I_2L(eventName, eventListener) {
                        document.addEventListener(eventName, eventListener);
                    }
                }
            }
        }
    };


    var _EVENTS_OBJECT = {
        statelessEvents: {
            onGetNextView: {
                eventName: 'OnGetNextView'
            }
        },

        statefulEvents: {
            onBindNextViewResourcesTogether: {
                eventName: 'OnBindNextViewResourcesTogether',

                eventListener: function(event) {
                    return onBindNextViewResourcesTogether_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onBindNextViewResourcesTogether_I_1L(event) {
                        // reference html template
                        var viewTemplate = event.detail.view;

                        // reference model data
                        var viewModelData = event.detail.model;

                        // create instance of the binder object
                        _CUSTOM_MODEL_TO_VIEW_BINDER_OBJECT_FACTORY.Factory.BinderObject.createNew()
                                                                                        .Functions.bindModelWithView(viewTemplate, viewModelData);

                        // at this point we are sure that successful binding took place, hence return control to PresenterManager
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGetNextView.eventName);
                    }
                },

                hasCompleted: false
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