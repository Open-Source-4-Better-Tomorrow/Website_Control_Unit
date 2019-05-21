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
            _EVENTS_OBJECT.bindListenersWithEvents([_EVENTS_OBJECT.initEvents, _EVENTS_OBJECT.statefulEvents, _EVENTS_OBJECT.nextViewEvents, _EVENTS_OBJECT.rollbackEvents]);
        },

        Variables: {
            __init__: function () {
                // setup event flow
                this.resource_notification_array = [
                                                    _EVENTS_OBJECT.statefulEvents.onPresenterViewReady.eventName,
                                                    _EVENTS_OBJECT.statefulEvents.onPresenterViewMetadataReady.eventName,
                                                    _EVENTS_OBJECT.statefulEvents.onPresenterModelReady.eventName
                                                   ];
            },

            resource_path_array: ['/Presenter/Presenter.View.core.resources.txt', '/Presenter/Presenter.View.metadata.resources.txt', '/Presenter/Presenter.Model.core.resources.txt'],

            resource_type_array: ['js', 'json', 'js'],

            resource_separator_array: [',', '', ','],

            resource_notification_array: null,

            resource_isJSONFormat_array: [false, true, false],

            resource_isHTMLFormat_array: [false, false, false],

            resilient_attempt_time_interval: 50,

            view_metadata: null,
            view_metadata_index: -1
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
                                                                _CORE_OBJECT.Variables.resource_isHTMLFormat_array[i],
                                                                _CORE_OBJECT.Variables.resilient_attempt_time_interval
                                                                )
                                                                .Functions.loadFlatFile(_CORE_OBJECT.Variables.resource_path_array[i]);
                    }
                }
            },

            processTemplatesMetadata: function(metadataObject) {
                return processTemplatesMetadata_I_1L(metadataObject);



                /**
                 * Local helper functions
                */
                function processTemplatesMetadata_I_1L(metadataObject) {
                    // create array
                    var viewTemplates_array = [];

                    // put all view templates from object to array
                    for(var key in metadataObject) {
                        viewTemplates_array.push(metadataObject[key]);
                    }

                    // store array for later usage
                    _CORE_OBJECT.Variables.view_metadata = viewTemplates_array;
                }
            }
        }
    };

    var _EVENTS_OBJECT = {
        initEvents: {
            onLoadYourOwnResources: {
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
                eventName: 'PresenterReady'
            },

            onLoadNextViewResources: {
                eventName: 'LoadNextViewResources'
            },

            onBindNextViewResourcesTogether: {
                eventName: 'BindNextViewResourcesTogether'
            },

            onResetCurrentView: {
                eventName: 'ResetCurrentView'
            }
        },

        statefulEvents: {
            onPresenterViewReady: {
                eventName: 'PresenterViewReady',

                eventListener: function() {
                    return onPresenterViewReady_I_1L(_EVENTS_OBJECT.statefulEvents.onPresenterViewReady);



                    /**
                     * Local helper functions
                    */
                    function onPresenterViewReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onPresenterViewMetadataReady.hasCompleted && _EVENTS_OBJECT.statefulEvents.onPresenterModelReady.hasCompleted) {
                            // return control to FCU
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onPresenterReady.eventName);
                        }
                    }
                },

                hasCompleted: false
            },

            onPresenterViewMetadataReady: {
                eventName: 'PresenterViewMetadataReady',

                eventListener: function(event) {
                    return onPresenterViewMetadataReady_I_1L(_EVENTS_OBJECT.statefulEvents.onPresenterViewMetadataReady, event);



                    /**
                     * Local helper functions
                    */
                    function onPresenterViewMetadataReady_I_1L(self, eventObject) {
                        // process event detial data
                        _CORE_OBJECT.Functions.processTemplatesMetadata(eventObject.detail[0]);

                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onPresenterViewReady.hasCompleted && _EVENTS_OBJECT.statefulEvents.onPresenterModelReady.hasCompleted) {
                            // return control to FCU
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onPresenterReady.eventName);
                        }
                    }
                },

                hasCompleted: false
            },

            onPresenterModelReady: {
                eventName: 'PresenterModelReady',

                eventListener: function() {
                    return onPresenterModelReady_I_1L(_EVENTS_OBJECT.statefulEvents.onPresenterModelReady);



                    /**
                     * Local helper functions
                    */
                    function onPresenterModelReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onPresenterViewReady.hasCompleted && _EVENTS_OBJECT.statefulEvents.onPresenterViewMetadataReady.hasCompleted) {
                            // return control to FCU
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onPresenterReady.eventName);
                        }
                    }
                },

                hasCompleted: false
            }
        },

        nextViewEvents: {
            onGetNextView: {
                eventName: 'GetNextView',

                eventListener: function() {
                    return onGetNextView_I_1L();



                    /**
                     * Local helper functions
                    */
                    function onGetNextView_I_1L() {
                        _debugger.count("PresenterManager received an order to yield the next view... # ");

                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onLoadNextViewResources.eventName, _EVENTS_OBJECT.nextViewEvents.onGetNextView);
                    }
                },

                viewHasBeenLoaded: false,
                modelHasBeenLoaded: false,

                viewTemplate: null,
                viewModel: null,

                resetToDefault: function() {
                    this.viewHasBeenLoaded = this.modelHasBeenLoaded = false;
                    this.viewTemplate = this.viewModel = null;
                }
            },

            onGetNextViewTemplate: {
                eventName: 'GetNextViewTemplate',

                eventListener: function(event) {
                    return onGetNextViewTemplate_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onGetNextViewTemplate_I_1L(event) {
                        _debugger.count("PresenterManager received a request from a ViewPresenter to yield next view template metadata... # ");

                        // fetch the next template metadata
                        var nextViewTemplateMetadata = _CORE_OBJECT.Variables.view_metadata[++_CORE_OBJECT.Variables.view_metadata_index];

                        // check if this is last view template in the whole workflow
                        var isLast = _CORE_OBJECT.Variables.view_metadata_index + 1 === _CORE_OBJECT.Variables.view_metadata.length;

                        // get the information, whether this view template requires some user interaction to yield the next one or the previous one
                        var flowNavigation = nextViewTemplateMetadata.flowNavigation;

                        // cache event details
                        var details = event.detail;

                        // reference callback of these two-item array
                        var processNextViewTemplateCallback = details[1];

                        // yield this template's metadata to ViewPresenter
                        processNextViewTemplateCallback(nextViewTemplateMetadata, isLast, flowNavigation, details[0]);
                    }
                }
            },

            onGotNextViewResources: {
                eventName: 'GotNextViewResources',

                eventListener: function(event) {
                    return onGotNextViewResources_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onGotNextViewResources_I_1L(event) {
                        // cache event details
                        var details = event.detail;

                        // check this view's resources load status
                        var isNextViewReady = details.viewHasBeenLoaded && details.modelHasBeenLoaded;

                        // if view's resources and model's resources were successfully loaded up, notify FCU, i.e. dispatch work to a MCU's binder
                        if(isNextViewReady) {
                            // reference html template and model
                            var viewTemplate = details.viewTemplate;
                            var viewModel = details.viewModel;

                            // reset onGetNextView object to default values
                            _EVENTS_OBJECT.nextViewEvents.onGetNextView.resetToDefault();

                            // dispatch event to MCU's binder
                            _DISPATCHER_OBJECT.dispatchEvent(
                                _EVENTS_OBJECT.statelessEvents.onBindNextViewResourcesTogether.eventName,
                                {
                                    view: viewTemplate.template.data,

                                    model: viewModel.model.data,

                                    binder: {
                                        bindDataWithTemplate: viewModel.model.templateDataBindFunc,

                                        prevModelBindListenerWithEvent: viewModel.model.prevModelEventListenerBindFunc,

                                        onBindingCompleted: onBindingCompleted_I_2L
                                    },

                                    isLast: viewModel.model.isLast && viewTemplate.template.isLast,

                                    flowNavigation: viewTemplate.template.flowNavigation
                                }
                            );
                        }



                        /**
                         * Local helper functions
                        */
                        function onBindingCompleted_I_2L(isWorkflowCompleted, flowNavigation) {
                            _debugger.count(
                                        "Binding model with template have been completed... (Last view: " + (isWorkflowCompleted ? " YES " : " NO ") +
                                        ", User has to yield the next view: " + (flowNavigation.userYieldsNextView ? " YES " : " NO ") +
                                        " ! # "
                                      );

                            if(!isWorkflowCompleted && !flowNavigation.userYieldsNextView) {
                                _debugger.check();
                                // otherwise after successful binding took place, yield the next view
                                _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.nextViewEvents.onGetNextView.eventName);
                            }

                            /**
                             * Subsequent blocks can be safely removed.
                             * They're provided here for debugging purposes !
                            */
                            else if(!isWorkflowCompleted && flowNavigation.userYieldsNextView) {
                                _debugger.count("Whole workflow has been PAUSED... User interaction required ! # ");
                                _debugger.check();
                            }
                            else if(isWorkflowCompleted) {
                                _debugger.count("Whole workflow has been COMPLETED... ! # ");
                                _debugger.check();
                            }
                        }
                    }
                }
            }
        },

        rollbackEvents: {
            onRemoveCurrentView: {
                eventName: 'RemoveCurrentView',

                eventListener: function(event) {
                    return onRemoveCurrentView_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onRemoveCurrentView_I_1L(event) {
                        _debugger.count("PresenterManager received an order to yield the previous view, i.e. remove the current view from DOM !... # ");
                        _debugger.count("PresenterManager disabled receiving GetNextView requests... # ");
                        // disable receiving GetNextView requests
                        _EVENTS_OBJECT.bindListenersWithEvents([ {nextViewEvents: _EVENTS_OBJECT.nextViewEvents.onGetNextView}], true);

                        // reset current view i.e. view's template metadata object internals as well as view's model metadata object internals
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onResetCurrentView.eventName, event.detail);
                    }
                }
            },

            onResetCurrentViewTemplateMetadata: {
                eventName: 'ResetCurrentView',

                eventListener: function(event) {
                    return onResetCurrentViewTemplateMetadata_I_1L(_EVENTS_OBJECT.rollbackEvents.onResetCurrentViewTemplateMetadata, event);



                    /**
                     * Local helper functions
                    */
                    function onResetCurrentViewTemplateMetadata_I_1L(self, eventObject) {
                        _debugger.count("PresenterManager supervised a removal from DOM the current view template... # ");

                        // cache event details
                        var details = eventObject.detail;

                        // reference the current view-model-unbinder that will "rollback" changes made to DOM by current view-model-binder
                        var unbinderCallback = details[0];
                        // "rollback", i.e. unbind changes
                        unbinderCallback();

                        // move the view's metadata index to the previous position
                        _CORE_OBJECT.Variables.view_metadata_index--;

                        // update and/or override view metadata to reflect current flow changes (require user to resume the flow in order to avoid infinite loop)
                        _CORE_OBJECT.Variables.view_metadata[_CORE_OBJECT.Variables.view_metadata_index].flowNavigation.userYieldsNextView = true;

                        // update event completion state
                        self.hasCompleted = true;

                        // check if current view internals were updated
                        if(_EVENTS_OBJECT.rollbackEvents.onResetCurrentViewModelMetadata.hasCompleted) {
                            // enable receiving GetNextView requests
                            _EVENTS_OBJECT.bindListenersWithEvents([ {nextViewEvents: _EVENTS_OBJECT.nextViewEvents.onGetNextView}]);

                            // reference the previous view's event-listener-binder
                            var prevModelEventListenerBinderCallback = details[1];
                            // assign listeners to events of the previous view
                            prevModelEventListenerBinderCallback();

                            _debugger.count("PresenterManager enabled receiving GetNextView requests... # ");
                        }
                    }
                },

                hasCompleted: false
            },

            onResetCurrentViewModelMetadata: {
                eventName: 'ResetCurrentViewModelMetadata',

                eventListener: function(event) {
                    return onResetCurrentViewModelMetadata_I_1L(_EVENTS_OBJECT.rollbackEvents.onResetCurrentViewModelMetadata, event);



                    /**
                     * Local helper functions
                    */
                    function onResetCurrentViewModelMetadata_I_1L(self, eventObject) {
                        _debugger.count("PresenterManager received a notification that current view model state was updated by ModelManager !... # ");

                        // update event completion state
                        self.hasCompleted = true;

                        // check if current view internals were updated
                        if(_EVENTS_OBJECT.rollbackEvents.onResetCurrentViewTemplateMetadata.hasCompleted) {
                            // enable receiving GetNextView requests
                            _EVENTS_OBJECT.bindListenersWithEvents([ {nextViewEvents: _EVENTS_OBJECT.nextViewEvents.onGetNextView}]);

                            // cache event details
                            var details = eventObject.detail;
                            // reference the previous view's event-listener-binder
                            var prevModelEventListenerBinderCallback = details[1];
                            // assign listeners to events of the previous view
                            prevModelEventListenerBinderCallback();

                            _debugger.count("PresenterManager enabled receiving GetNextView requests... # ");
                        }
                    }
                },

                hasCompleted: false
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