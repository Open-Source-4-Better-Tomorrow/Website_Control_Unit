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
            _EVENTS_OBJECT.bindListenersWithEvents([_EVENTS_OBJECT.statefulEvents]);
        },

        Functions: {}
    };

    var _EVENTS_OBJECT = {
        statelessEvents: {
            onGetNextViewModel: {
                eventName: 'GetNextViewModel'
            },

            onGotNextViewResources: {
                eventName: 'GotNextViewResources'
            }
        },

        statefulEvents: {
            onLoadNextViewResources: {
                eventName: 'LoadNextViewResources',

                eventListener: function(event) {
                    return onLoadNextViewResources_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onLoadNextViewResources_I_1L(event) {
                        // reference the source event
                        var getNextViewEventObject = event.detail;

                        // prepare the next model data
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGetNextViewModel.eventName, processNextViewModel_I_2L);



                        /**
                         * Local helper functions
                        */
                        function processNextViewModel_I_2L(viewModel, isLast) {
                            // if there is next view model to process
                            if(viewModel) {
                                getNextViewEventObject.viewModel = {
                                    model:  {
                                        data: viewModel.Data.get(),

                                        templateDataBindFunc: viewModel.DataToViewBinder.get(),

                                        prevModelEventListenerBindFunc: viewModel.previousModelEventListenerBinder,

                                        isLast : isLast
                                    }
                               };
                            }
                            else {
                                getNextViewEventObject.viewModel = {
                                    model:  {
                                        data: {},

                                        /**
                                         * Arguments to the templateDataBindFunc function are mandatory !
                                         * You cannot skip them in the function definition !
                                         * Third argument is callback that has to be invoked when all actions completed successfully, otherwise flow of the logic can be unpredictable.
                                        */
                                        templateDataBindFunc: function(htmlTemplate, modelData, bindingCompletedCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                                            // define constants
                                            var headBegin = '<head>';
                                            var headEnd = '</head>';

                                            var bodyBegin = '<body>';
                                            var bodyEnd = '</body>';

                                            var emptyString = '';

                                            // default binding logic takes place here - extract head section
                                            var pageHEAD = htmlTemplate.substring(htmlTemplate.indexOf(headBegin), htmlTemplate.lastIndexOf(headEnd));
                                            pageHEAD = pageHEAD.replace(headBegin, emptyString);

                                            // default binding logic takes place here - extract body section
                                            var pageBody = htmlTemplate.substring(htmlTemplate.indexOf(bodyBegin), htmlTemplate.lastIndexOf(bodyEnd));
                                            pageBody = pageBody.replace(bodyBegin, emptyString);

                                            // "bind" (inject) head and body into container
                                            document.head.innerHTML = pageHEAD;
                                            document.body.innerHTML = pageBody;


                                            /**
                                             * When all binding is completed, notify appropriately.
                                             * This must be a logically last operation in this method !
                                             * Otherwise flow of the logic can be unpredictable.
                                            */
                                            bindingCompletedCallback(isLast, flowNavigation);
                                        },

                                        /**
                                         * When there is no model default listener-to-event binder is an empty function !
                                         * Because it is assumed, that when there is no model, it has to be a static template.
                                         * Because it is a static template, this design pattern does not have buit-in event handlers !
                                        */
                                        prevModelEventListenerBindFunc: function() {},

                                        isLast : false
                                    }
                               };
                            }

                            // update event object
                            getNextViewEventObject.modelHasBeenLoaded = true;

                            _debugger.count("ModelPresenter prepared model data... # ");

                            // return control to PresenterManager passing updated event object along the way
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGotNextViewResources.eventName, getNextViewEventObject);
                        }
                    }
                }
            }
        },

        bindListenersWithEvents: function(arrayOfEventObjectCollection, unbind) {
            return bindListenersToEvents_I_1L(arrayOfEventObjectCollection, unbind);



            /**
             * Local helper functions
            */
            function bindListenersToEvents_I_1L(arrayOfEventObjectCollection, unbind) {
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
                            unbind ? removeEventListener_I_2L(customEventObject.eventName, customEventObject.eventListener) : addEventListener_I_2L(customEventObject.eventName, customEventObject.eventListener);
                    }
                }



                /**
                 * Local helper functions
                */
                function addEventListener_I_2L(eventName, eventListener) {
                    document.addEventListener(eventName, eventListener);
                }

                function removeEventListener_I_2L(eventName, eventListener) {
                    document.removeEventListener(eventName, eventListener);
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