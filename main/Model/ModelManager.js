/* eslint-disable no-empty */

/**
 * ModelManager manages loading of all models on demand
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
                                                    _EVENTS_OBJECT.statefulEvents.onModelCoreReady.eventName,
                                                    _EVENTS_OBJECT.statefulEvents.onModelMetadataReady.eventName
                                                   ];
            },

            resource_path_array: ['/Model/Model.core.resources.txt', '/Model/Model.metadata.resources.txt'],

            resource_type_array: ['js', 'json'],

            resource_separator_array: [',', ''],

            resource_notification_array: null,

            resource_isJSONFormat_array: [false, true],

            resource_isHTMLFormat_array: [false, false],

            resilient_attempt_time_interval: 50,

            model_metadata: null,
            model_metadata_index: -1
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

            processModelsMetadata: function(metadataObject) {
                return processModelsMetadata_I_1L(metadataObject);



                /**
                 * Local helper functions
                */
                function processModelsMetadata_I_1L(metadataObject) {
                    // create array
                    var viewModel_array = [];

                    // put all models from object to array
                    for(var key in metadataObject) {
                        viewModel_array.push(metadataObject[key]);
                    }

                    // store array for later usage
                    _CORE_OBJECT.Variables.model_metadata = viewModel_array;
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
            onModelReady: {
                eventName: 'OnModelReady'
            },

            onViewModelExposeYourData: {
                eventName: 'OnViewModelExposeYourData'
            }
        },

        statefulEvents: {
            onModelCoreReady: {
                eventName: 'OnModelCoreReady',

                eventListener: function() {
                    return onModelCoreReady_I_1L(_EVENTS_OBJECT.statefulEvents.onModelCoreReady);



                    /**
                     * Local helper functions
                    */
                    function onModelCoreReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onModelMetadataReady.hasCompleted) {
                            // return control to FCU
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onModelReady.eventName);
                        }
                    }
                },

                hasCompleted: false
            },

            onModelMetadataReady: {
                eventName: 'OnModelMetadataReady',

                eventListener: function(event) {
                    return onModelMetadataReady_I_1L(_EVENTS_OBJECT.statefulEvents.onModelMetadataReady, event);



                    /**
                     * Local helper functions
                    */
                    function onModelMetadataReady_I_1L(self, eventObject) {
                        // process event detial data
                        _CORE_OBJECT.Functions.processModelsMetadata(eventObject.detail[0]);

                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onModelCoreReady.hasCompleted) {
                            // return control to FCU
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onModelReady.eventName);
                        }
                    }
                },

                hasCompleted: false
            }
        },

        nextViewEvents: {
            onGetNextViewModel: {
                eventName: 'OnGetNextViewModel',

                eventListener: function(event) {
                    return onGetNextViewModel_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onGetNextViewModel_I_1L(event) {
                        _debugger.count("ModelManager received an order to yield the next view model... # ");

                        // fetch the next model metadata
                        var nextViewModelMetadata = _CORE_OBJECT.Variables.model_metadata[++_CORE_OBJECT.Variables.model_metadata_index];

                        var secondLevelEventDetails;
                        // if there is another physical model data available
                        if(nextViewModelMetadata && nextViewModelMetadata.isRequired) {
                            // check if this is last view model in the whole workflow
                            nextViewModelMetadata.isLast = _CORE_OBJECT.Variables.model_metadata_index + 1 === _CORE_OBJECT.Variables.model_metadata.length;

                            // store event detail and next model metadata
                            secondLevelEventDetails = [event.detail, nextViewModelMetadata];

                            // load up physical model given its physical location (load up JavaScript file)
                            ral.GET_RAL_OBJECT.Loader.loadAsync(
                                                                    [
                                                                        nextViewModelMetadata.relativePath + nextViewModelMetadata.modelName
                                                                    ],
                                                                    'js',
                                                                    /**
                                                                     * Modules returned by ral.GET_RAL_OBJECT.Loader.loadAsync are executed in the order provided above.
                                                                     * They're available globally via window object, therefore you can skip them in the function's arguments.
                                                                    */
                                                                    function () {
                                                                        // trigger further flow
                                                                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.nextViewEvents.onNextViewModelPhysicallyLoaded.eventName, secondLevelEventDetails);
                                                                    }
                                                               );
                        }
                        else {
                            // store event detail and next model metadata, which is null
                            secondLevelEventDetails = [event.detail, null];

                            // dispatch proper notification immediately
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.nextViewEvents.onNextViewModelPhysicallyLoaded.eventName, secondLevelEventDetails);
                        }

                    }
                }
            },

            onNextViewModelPhysicallyLoaded: {
                eventName: 'OnNextViewModelPhysicallyLoaded',

                eventListener: function(event) {
                    return onNextViewModelPhysicallyLoaded_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onNextViewModelPhysicallyLoaded_I_1L(event) {
                        _debugger.count("ModelManager received a notification that next view model was loaded up into memory and is available to be fetched... # ");

                        // cache event details
                        var details = event.detail;

                        // next view model callback
                        var processNextViewModelCallback = details[0];

                        // was next model available or required
                        var nextViewModel = details[1];

                        // if there is next view model "in accessible space" request the model data
                        if(nextViewModel) {
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onViewModelExposeYourData.eventName, [nextViewModel.isLast, processNextViewModelCallback, handleViewModel_I_2L]);
                        }
                        else {
                            processNextViewModelCallback();
                        }



                        /**
                         * Local helper functions
                        */
                        function handleViewModel_I_2L(viewModel, details) {
                            // is last in the workflow
                            var isLast = details[0];

                            // next view model callback
                            var processNextViewModelCallback = details[1];

                            // return control to ModelPresenter passing required model data
                            processNextViewModelCallback(viewModel, isLast);
                        }
                    }
                }
            },

            onNextViewModelHasArrived: {
                eventName: 'OnNextViewModelHasArrived',

                eventListener: function(event) {
                    return onNextViewModelHasArrived_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onNextViewModelHasArrived_I_1L(event) {
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


    // kick off self-init
    _CORE_OBJECT.__init__();

})();