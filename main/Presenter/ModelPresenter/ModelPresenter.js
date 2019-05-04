/* eslint-disable no-empty */

/**
 * ModelPresenter manages loading of all Model-related resources on demand
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
            onGetNextViewModel: {
                eventName: 'OnGetNextViewModel'
            },

            onGotNextViewResources: {
                eventName: 'OnGotNextViewResources'
            }
        },

        statefulEvents: {
            onLoadNextViewResources: {
                eventName: 'OnLoadNextViewResources',

                eventListener: function(event) {
                    return onLoadNextViewResources_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onLoadNextViewResources_I_1L(event) {
                        // reference the source event
                        var getNextViewEventObject = event.detail;

                        // prepare the next model data, i.e. output has to match the viewModel object structure !
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGetNextViewModel.eventName, processNextViewModel_I_2L);



                        /**
                         * Local helper functions
                        */
                        function processNextViewModel_I_2L(viewModel, isLast) {
                            // if there is next view's model to process
                            if(viewModel) {
                                getNextViewEventObject.viewModel = {
                                    model:  {
                                        required : viewModel.isRequired,

                                        data: {
                                            a1: {
                                                tagPrefix: "",
                                                tagName : "h1",
                                                content: "Hello from Hamburger Project !"
                                            }
                                        },

                                        bindFunc: viewModel.Functions.viewModelBinder,

                                        isLast : isLast
                                    }
                               };
                            }
                            else {
                                getNextViewEventObject.viewModel = {
                                    model:  {
                                        required : false,
                                        data: {},
                                        /**
                                         * Arguments to bindFunc function are mandatory !
                                         * You cannot skip them in the function definition !
                                         * Third argument is callback that has to be invoked when all actions completed successfully, otherwise flow of the logic can be unpredictable.
                                        */
                                        bindFunc: function(htmlTemplate, modelData, bindingCompletedCallback, isLast) {
                                            bindingCompletedCallback(isLast);
                                        }
                                    }
                               };
                            }

                            // update event object
                            getNextViewEventObject.modelHasBeenLoaded = true;

                            _debugger.count("ModelPresenter prepared model data... #");

                            // return control to PresenterManager with passing updated event object
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGotNextViewResources.eventName, getNextViewEventObject);
                        }
                    }
                }
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

                if(eventDetails) {
                    customEvent = new CustomEvent(eventName, { bubbles: false, cancelable: false, detail: eventDetails });
                }
                else
                    customEvent = new CustomEvent(eventName);

                document.dispatchEvent(customEvent);
            }
        }
    };


    // kick of self-init
    _CORE_OBJECT.__init__();

})();