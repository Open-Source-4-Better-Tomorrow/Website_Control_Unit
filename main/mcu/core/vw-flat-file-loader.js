/* eslint-disable no-undef */

/**
 * Flat File Loader Factory
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

    var _CUSTOM_FLAT_FILE_LOAD_OBJECT_FACTORY = {
        Factory: {
            LoadObject: {
                createNew: function (resource_type, resource_separator, notification_event, isJSON, resilient_attempt_time_interval) {
                    return createNew_I_1L(resource_type, resource_separator, notification_event, isJSON, resilient_attempt_time_interval);



                    /**
                     * Local helper functions
                    */
                    function createNew_I_1L(resource_type, resource_separator, notification_event, isJSON, resilient_attempt_time_interval) {
                        // throw error if no notification event present
                        if(!notification_event)
                            throw Error("No valid notification event provided to dispatch upon successful loading of resources !");

                        // create brand new instance of custom flat file load object
                        var _CUSTOM_FLAT_FILE_LOAD_OBJECT = {
                            Loading: {
                                _internals_: {
                                    resource_type_I: resource_type || 'js',

                                    resource_separator_I: resource_separator || ',',

                                    notification_event_I: notification_event,

                                    isJSON: isJSON || false,

                                    resilient_attempt_time_interval_I: resilient_attempt_time_interval || 50
                                }
                            },

                            Functions: {
                                loadFlatFile : function (dataConfigPath) {
                                    return loadFlatFile_I_1L(dataConfigPath);



                                    /**
                                     * Local helper functions
                                    */
                                    function loadFlatFile_I_1L(dataConfigPath) {
                                        // create XHR object
                                        var xhr = createXHR_I_2L();

                                        // open channel
                                        xhr.open("GET", dataConfigPath, true);

                                        // trigger flow
                                        xhr.send(null);



                                        /**
                                         * Local helper functions
                                        */
                                        function createXHR_I_2L() {
                                            // create request
                                            var xhr = new XMLHttpRequest();

                                            // save callback
                                            xhr.callback = _CUSTOM_FLAT_FILE_LOAD_OBJECT.Functions.handleFlatFileContent;

                                            // handle request flow change
                                            xhr.onreadystatechange = function() {
                                                try {
                                                    // on success invoke callback with received data
                                                    if(this.status == 200 && this.readyState == 4) {
                                                        this.callback(this.responseText);
                                                    }
                                                }
                                                catch (error) {
                                                    // on failure just invoke parent of this data handler function (a way to achieve resilient load mechanism !)
                                                    setTimeout(
                                                                function() {
                                                                    loadFlatFile_I_1L(dataConfigPath, xhr.callback);
                                                                },
                                                                _CUSTOM_FLAT_FILE_LOAD_OBJECT.Loading._internals_.resilient_attempt_time_interval_I
                                                            );
                                                }
                                            };

                                            // return XmlHttpRequest object instance
                                            return xhr;
                                        }
                                    }
                                },

                                handleFlatFileContent : function (resource_array_string) {
                                    return handleFlatFileContent_I_1L(resource_array_string);



                                    /**
                                     * Local helper functions
                                    */
                                    function handleFlatFileContent_I_1L(resource_array_string) {
                                        // check if we're dealing with a JSON format
                                        if(_CUSTOM_FLAT_FILE_LOAD_OBJECT.Loading._internals_.isJSON) {
                                            return handleJSONFormat_I_2L(resource_array_string);
                                        }
                                        // otherwise handle plain text format
                                        else {
                                            return handlePlainTextFormat_I_2L(resource_array_string);
                                        }



                                        /**
                                         * Local helper functions
                                        */
                                        function handleJSONFormat_I_2L(content) {
                                            // parse JSON object
                                            var jsonObject = JSON.parse(content);

                                            // dispatch an event
                                            prepareAndDispatchEvent_I_2L(jsonObject);
                                        }

                                        function handlePlainTextFormat_I_2L(content) {
                                            // create base array
                                            var resource_array = content.split(_CUSTOM_FLAT_FILE_LOAD_OBJECT.Loading._internals_.resource_separator_I);

                                            // clean an array of resources
                                            resource_array.forEach(function(item, index) {resource_array[index] = item.trim().replace('\r\n', '');});

                                            // load up resources
                                            ral.GET_RAL_OBJECT.Loader.loadAsync(
                                                resource_array,
                                                _CUSTOM_FLAT_FILE_LOAD_OBJECT.Loading._internals_.resource_type_I,
                                                /**
                                                 * Modules returned by ral.GET_RAL_OBJECT.Loader.loadAsync are executed in the order provided above.
                                                 * They're available globally via window object, therefore you can skip them in the function's arguments.
                                                */
                                                function () {
                                                    // dispatch an event
                                                    prepareAndDispatchEvent_I_2L();
                                                }
                                            );
                                        }

                                        function prepareAndDispatchEvent_I_2L(eventDetailData) {
                                            // if there is some event detail data
                                            if(eventDetailData) {
                                                // prepare event detail data
                                                var params = {
                                                    bubbles: false,
                                                    cancelable: false,
                                                    detail: eventDetailData
                                                };

                                                // notify that all resources were successfully loaded up by dispatching an event
                                                document.dispatchEvent(new CustomEvent(_CUSTOM_FLAT_FILE_LOAD_OBJECT.Loading._internals_.notification_event_I, params));
                                            }
                                            // otherwise just dispatch the event
                                            else {
                                                // notify that all resources were successfully loaded up by dispatching an event
                                                document.dispatchEvent(new CustomEvent(_CUSTOM_FLAT_FILE_LOAD_OBJECT.Loading._internals_.notification_event_I));
                                            }
                                        }
                                    }
                                }
                            }
                        };

                        // return fresh instance
                        return _CUSTOM_FLAT_FILE_LOAD_OBJECT;
                    }
                }
            }
        }
    };


    // Expose module API to the outside world
    window.flatFileAPI = window.flatFileAPI || _CUSTOM_FLAT_FILE_LOAD_OBJECT_FACTORY;

})(window);