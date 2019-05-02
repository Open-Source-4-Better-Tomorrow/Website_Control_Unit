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
            this.Functions.bindListenersToEvents([_EVENTS_OBJECT.statefulEvents]);
        },

        Functions: {
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
        statelessEvents: {
            onGotNextViewResources: {
                eventName: 'OnGotNextViewResources'
            }
        },

        statefulEvents: {
            loadNextViewResources: {
                eventName: 'LoadNextViewResources',

                eventListener: function(event) {
                    return onLoadNextViewResources_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onLoadNextViewResources_I_1L(event) {
                        // reference the source event
                        var getNextViewEventObject = event.detail;

                        /**
                         * Prepare the next model data... (some calculations take place here)
                        */
                        getNextViewEventObject.viewModel = {model:  {h1: "Hello from dynamically fetched template"}};

                        // update event object
                        getNextViewEventObject.modelHasBeenLoaded = true;
_debugger.count("ModelPresenter prepared model data... attempt #");
                        // return control to PresenterManager with passing updated event object
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGotNextViewResources.eventName, getNextViewEventObject);
                    }
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