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
            this.Functions.bindListenersWithEvents([_EVENTS_OBJECT.initEvents, _EVENTS_OBJECT.statefulEvents, _EVENTS_OBJECT.nextViewEvents]);
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
            },

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
        initEvents: {
            onLoadYourOwnResources: {
                eventName: 'OnLoadYourOwnResources',

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
            },

            onLoadNextViewResources: {
                eventName: 'OnLoadNextViewResources'
            },

            onBindNextViewResourcesTogether: {
                eventName: 'OnBindNextViewResourcesTogether'
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
                eventName: 'OnPresenterViewMetadataReady',

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
                eventName: 'OnPresenterModelReady',

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
                eventName: 'OnGetNextView',

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
                eventName: 'OnGetNextViewTemplate',

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

                        // cache event details
                        var details = event.detail;

                        // reference callback of these two-item array
                        var processNextViewTemplateCallback = details[1];

                        // yield this template's metadata to ViewPresenter
                        processNextViewTemplateCallback(nextViewTemplateMetadata, isLast, details[0]);
                    }
                }
            },

            onGotNextViewResources: {
                eventName: 'OnGotNextViewResources',

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
                                                                        callBind : viewModel.model.bindFunc,

                                                                        onBindingCompleted: function(isWorkflowCompleted) {
                                                                            _debugger.count("Binding model with template have been completed... ! # ");

                                                                            if(!isWorkflowCompleted) {
                                                                                _debugger.check();
                                                                                // otherwise after successful binding took place, yield the next view
                                                                                _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.nextViewEvents.onGetNextView.eventName);
                                                                            }
                                                                            // else block can be safely removed. It's provided here for debugging purposes
                                                                            else {
                                                                                _debugger.count("Whole workflow has been completed... ! # ");
                                                                                _debugger.check();
                                                                            }
                                                                        }
                                                                    },

                                                                    isLast: viewModel.model.isLast && viewTemplate.template.isLast
                                                                }
                                                            );
                        }
                    }
                },
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