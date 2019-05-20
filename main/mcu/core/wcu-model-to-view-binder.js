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

    var _MODEL_TO_VIEW_BINDER_OBJECT_FACTORY = {
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
                                bindModelWithView : function (htmlTemplate, modelData, binderFunction, bindingCompletedCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                                    return bindModelWithView_I_1L(htmlTemplate, modelData, binderFunction, bindingCompletedCallback, prevModelEventListenerBinder, isLast, flowNavigation);



                                    /**
                                     * Local helper functions
                                    */
                                    function bindModelWithView_I_1L(htmlTemplate, modelData, binderFunction, bindingCompletedCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                                        _debugger.count("Binding model with html template... # ");

                                        // check if binder function is present, otherwise throw error
                                        if(!binderFunction)
                                            throw Error("MCU requires custom binder function to be present to render a view !");

                                        // binder model with template and notify upon successful completion
                                        binderFunction(htmlTemplate, modelData, bindingCompletedCallback, prevModelEventListenerBinder, isLast, flowNavigation);
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
        statefulEvents: {
            onBindNextViewResourcesTogether: {
                eventName: 'BindNextViewResourcesTogether',

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

                        // reference custom binder object that will bind a model to a template and successfully render the view
                        var binder = event.detail.binder;

                        // reference binder function itself
                        var binderFunction = binder.bindDataWithTemplate;

                        // reference previous model's event-to-listener binder function itself
                        var prevModelEventListenerBinder = binder.prevModelBindListenerWithEvent;

                        // reference callback that will be send when all binding have been completed
                        var bindingCompletedCallback = binder.onBindingCompleted;

                        // is this flow the last one in the workflow ?
                        var isLast = event.detail.isLast;

                        // check whether this view template requires some user interaction to yield the next one or the previous one
                        var flowNavigation = event.detail.flowNavigation;

                        // create instance of the binder object
                        _MODEL_TO_VIEW_BINDER_OBJECT_FACTORY.Factory.BinderObject.createNew()
                                                                                 .Functions.bindModelWithView(
                                                                                                                viewTemplate,
                                                                                                                viewModelData,
                                                                                                                binderFunction,
                                                                                                                bindingCompletedCallback,
                                                                                                                prevModelEventListenerBinder,
                                                                                                                isLast,
                                                                                                                flowNavigation
                                                                                                             );
                    }
                },

                hasCompleted: false
            }
        }
    };


    // kick of self-init
    _CORE_OBJECT.__init__();

})();