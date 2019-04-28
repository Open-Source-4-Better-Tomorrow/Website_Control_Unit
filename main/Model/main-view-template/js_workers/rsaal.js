/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * Resilient Storage Access Abstraction Layer
 *
 *
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(
    function (window) {
        var self = this;


        /* private variables */

        var _isFlatFileStorage = false;
        var _isDatabaseStorage = false;
        var _isWebServiceStorage = false;

        var _invocationContext = {
            constants: {
                isFile: "isFile",
                isDatabase: "isDatabase",
                isService: "isService"
            },

            isValid: false,

            storageDescription: ""
        };

        var _resilientAttemptTimeInterval = 10;

        var _moduleDOM_Object;

        /* ~ private variables */



        /* private functions */

        function setModuleDOM_Object_and_ResilientTimeInterval_I_1L(moduleDOM_Object, resilientAttemptTimeInterval) {
            // store module DOM object for later usage
            _moduleDOM_Object = moduleDOM_Object;

            // setup time interval of how fast try to renew the load process
            _resilientAttemptTimeInterval = resilientAttemptTimeInterval || _resilientAttemptTimeInterval;
        }

        function readDataFromExternalStorage_I_1L(dataPath, callback) {
            // create temporary container
            var temporaryContainer = $("<div />");

            // trigger load process
            $(temporaryContainer).load(dataPath, externalDataHandler_I_2L);



            /**
             * Local helper functions
            */
            function externalDataHandler_I_2L(responseTxt, textStatus, xhr) {
                // on success invoke callback with received data
                if (xhr.status === 200 && xhr.readyState === 4) {
                    callback(responseTxt);
                }
                // on failure just invoke parent of this data handler function (a way to achieve kind of a recurrency in JavaScript to provide resilient load mechanism !)
                else {
                    setTimeout(
                        function () {
                            readDataFromExternalStorage_I_1L(dataPath, callback);
                        },
                        _resilientAttemptTimeInterval
                    );
                }
            }
        }

        function parseConfig_I_1L(configData) {
            // convert config to JSON object
            var configJsonObject = JSON.parse(configData);

            // parse JSON config object
            parseConfigJsonObject_I_2L(configJsonObject);



            /**
             * Local helper functions
            */

            // local helper function to parse module config
            function parseConfigJsonObject_I_2L(configJsonObject) {
                // validate object
                var isValid = validate_SALM_Params_Object_I_3L(configJsonObject);
                if (!isValid) {
                    throw Error("Invalid params object passed to SAAL");
                }

                // parse object
                var storageObject = parse_SALM_Params_Object_I_3L(configJsonObject);

                // perform asynchronous data fetching from a storage
                return doRetrieval_I_3L(storageObject);



                /**
                 * Local helper functions
                */

                // local helper function to validate SAAL params object
                function validate_SALM_Params_Object_I_3L(salpo) {
                    var isValid = false;

                    // validate storage type

                    if (salpo.isFile !== 'undefined' && salpo.isFile === true) {
                        _isFlatFileStorage = true;
                    } else if (salpo.isDatabase !== 'undefined' && salpo.isDatabase === true) {
                        _isDatabaseStorage = true;
                    } else if (salpo.isService !== 'undefined' && salpo.isService === true) {
                        _isWebServiceStorage = true;
                    }

                    // evaluate validation result
                    isValid = _isFlatFileStorage || _isDatabaseStorage || _isWebServiceStorage;


                    // validate storage type metadata if #1 validation phase passed
                    if (isValid) {

                        //reset flags to check the second validation phase
                        isValid = _isFlatFileStorage = _isDatabaseStorage = _isWebServiceStorage = false;


                        if (
                            salpo.isFile === true &&
                            salpo.storageLocation !== 'undefined' && salpo.storageLocation !== ""
                        ) {
                            _isFlatFileStorage = true;
                            _invocationContext.storageDescription = _invocationContext.constants.isFile;
                        } else if (
                            salpo.isDatabase === true &&
                            salpo.serverSideScriptUrl !== 'undefined' && salpo.serverSideScriptUrl !== "" &&
                            salpo.contentType !== 'undefind' && salpo.contentType !== "" &&
                            salpo.dataType !== 'undefind' && salpo.dataType !== "" &&
                            salpo.serverName !== 'undefined' && salpo.serverName !== "" &&
                            salpo.portNumber !== 'undefined' && salpo.portNumber !== 0 &&
                            salpo.databaseName !== 'undefined' &&
                            salpo.userName !== 'undefined' && salpo.userName !== "" &&
                            salpo.userPassword !== 'undefined' && salpo.userPassword !== "" &&
                            salpo.queryString !== 'undefined' && salpo.queryString !== ""
                        ) {
                            _isDatabaseStorage = true;
                            _invocationContext.storageDescription = _invocationContext.constants.isDatabase;

                            if (salpo.databaseRequestRequiresAuth === true && salpo.databaseRequestAuth == undefined) {
                                _isDatabaseStorage = false;
                            }
                        } else if (
                            salpo.isService === true &&
                            salpo.serviceUrl !== 'undefined' && salpo.serviceUrl !== "" &&
                            salpo.contentType !== 'undefind' && salpo.contentType !== "" &&
                            salpo.dataType !== 'undefind' && salpo.dataType !== ""
                        ) {
                            _isWebServiceStorage = true;
                            _invocationContext.storageDescription = _invocationContext.constants.isWebService;

                            var serviceMethodParamsValidationPassed = true;

                            if (salpo.serviceMethodRequiresParams === true && salpo.serviceMethodParams == undefined) {
                                serviceMethodParamsValidationPassed = false;
                            }


                            var serviceMethodAuthValidationPassed = true;

                            if (salpo.serviceMethodRequiresAuth === true && salpo.serviceMethodAuth == undefined) {
                                serviceMethodAuthValidationPassed = false;
                            }


                            _isWebServiceStorage = _isWebServiceStorage && serviceMethodParamsValidationPassed && serviceMethodAuthValidationPassed;
                        }
                    }

                    // evaluate validation result
                    isValid = _isFlatFileStorage || _isDatabaseStorage || _isWebServiceStorage;

                    return isValid;
                }

                // local helper function to parse SAAL params object
                function parse_SALM_Params_Object_I_3L(salpo) {
                    // metadata object of storage data
                    var storageDataObject;

                    if (_isFlatFileStorage) {
                        storageDataObject = convertTo_FlatFile_AbstractionLayer_I_4L(salpo);
                    } else if (_isDatabaseStorage) {
                        storageDataObject = convertTo_Database_AbstractionLayer_I_4L(salpo);
                    } else if (_isWebServiceStorage) {
                        storageDataObject = convertTo_WebService_AbstractionLayer_I_4L(salpo);
                    }

                    // add callback function to handle storage abstraction response data
                    storageDataObject.callback = handleStorageAbstractionResponseData_I_4L;

                    // return metadata object
                    return storageDataObject;



                    /**
                     * Local helper functions
                    */

                    // local helper function to convert to flat file
                    function convertTo_FlatFile_AbstractionLayer_I_4L(salpo) {
                        var result = {
                            storageLocation: salpo.storageLocation,
                            isFlatFile: _isFlatFileStorage
                        };

                        if (_moduleDOM_Object.use_flat_file_storage_view_bag_data === true) {
                            result.storageLocation += _moduleDOM_Object.flat_file_storage_view_bag_data;
                        }

                        return result;
                    }

                    // local helper function to convert to database
                    function convertTo_Database_AbstractionLayer_I_4L(salpo) {
                        var result = {
                            serverSideScriptUrl: salpo.serverSideScriptUrl,
                            contentType: salpo.contentType,
                            dataType: salpo.dataType,
                            serverName: salpo.serverName,
                            portNumber: salpo.portNumber,
                            databaseName: salpo.databaseName,
                            userName: salpo.userName,
                            userPassword: salpo.userPassword,
                            queryString: salpo.queryString,
                            databaseRequestRequiresAuth: salpo.databaseRequestRequiresAuth,
                            databaseRequestAuth: salpo.databaseRequestAuth,
                            isDatabase: _isDatabaseStorage
                        };

                        if (_moduleDOM_Object.use_database_storage_view_bag_data === true) {
                            result.viewBagData = _moduleDOM_Object.database_storage_view_bag_data;
                        }

                        return result;
                    }

                    // local helper function to convert to web service
                    function convertTo_WebService_AbstractionLayer_I_4L(salpo) {
                        var result = {
                            serviceUrl: salpo.serviceUrl,
                            contentType: salpo.contentType,
                            dataType: salpo.dataType,
                            serviceMethodRequiresParams: salpo.serviceMethodRequiresParams,
                            serviceMethodParams: salpo.serviceMethodParams,
                            serviceMethodRequiresAuth: salpo.serviceMethodRequiresAuth,
                            serviceMethodAuth: salpo.serviceMethodAuth,
                            isWebService: _isWebServiceStorage
                        };

                        return result;
                    }

                    // local helper function to handle storage data
                    function handleStorageAbstractionResponseData_I_4L(storageData) {
                        // check whether return data immediately or load it into DOM
                        if (_moduleDOM_Object.return_data_instead_of_loading_into_DOM === true) {
                            // this method is invoked on successful data fetch from storage abstraction and returning it to the caller
                            _moduleDOM_Object.onReturnDataCallback(storageData);
                        } else {
                            // load data directly into DOM
                            _moduleDOM_Object.onInternalDOMUploadDataCallback(storageData, _moduleDOM_Object);

                            // this method is invoked on successful data fetch from storage abstraction and DOM update
                            _moduleDOM_Object.onReturnDataCallback();
                        }
                    }
                }

                // local helper function to retrieve actual data
                function doRetrieval_I_3L(storageObject) {
                    // fetch data from an external source
                    return fetchDataFromStorage_I_4L(storageObject);



                    /**
                     * Local helper functions
                    */

                    // local helper function to fetch actual data
                    function fetchDataFromStorage_I_4L(storageDataObject) {
                        if (storageDataObject.isFlatFile) {
                            // load data from an external flat file
                            readDataFromExternalFlatFile_I_5L(storageDataObject.storageLocation, storageDataObject.callback);
                        } else if (storageDataObject.isDatabase) {
                            // load data from an external database
                            readDataFromExternalDatabase_I_5L(storageDataObject);
                        } else if (storageDataObject.isWebService) {
                            // load data from an external service
                            readDataFromExternalService_I_5L(storageDataObject);
                        } else {
                            throw Error("Unsupported abstraction layer");
                        }



                        /**
                         * Local helper functions
                        */

                        // local helper function to read data from an external flat file
                        function readDataFromExternalFlatFile_I_5L(dataPath, callback) {
                            // create temporary container
                            var temporaryContainer = $("<div />");

                            // trigger load process
                            $(temporaryContainer).load(dataPath, externalDataHandler_I_6L);



                            /**
                             * Local helper functions
                            */
                            function externalDataHandler_I_6L(responseTxt, textStatus, xhr) {
                                // on success invoke callback with received data
                                if (xhr.status === 200 && xhr.readyState === 4) {
                                    // at this point we already know that we are about to return some data
                                    _invocationContext.isValid = true;

                                    // return data via callback
                                    callback(responseTxt);
                                }
                                // on failure just invoke parent of this data handler function (a way to achieve kind of a recurrency in JavaScript to provide resilient load mechanism !)
                                else {
                                    setTimeout(
                                        function () {
                                            readDataFromExternalFlatFile_I_5L(dataPath, callback);
                                        },
                                        _resilientAttemptTimeInterval
                                    );
                                }
                            }
                        }

                        // local helper function to read data from an external database
                        function readDataFromExternalDatabase_I_5L(storageDataObject) {
                            $.ajax({
                                type: "GET",
                                url: storageDataObject.serverSideScriptUrl,
                                data: {
                                    "ServerName": storageDataObject.serverName,
                                    "PortNumber": storageDataObject.portNumber,
                                    "DatabaseName": storageDataObject.databaseName,
                                    "UserName": storageDataObject.userName,
                                    "UserPassword": storageDataObject.userPassword,
                                    "QueryString": storageDataObject.queryString,
                                    "ViewBagData": storageDataObject.viewBagData
                                },
                                contentType: storageDataObject.contentType,
                                dataType: storageDataObject.dataType,
                                processData: true,
                                crossDomain: true,
                                beforeSend: function (xhr) {
                                    if (storageDataObject.databaseRequestRequiresAuth) {
                                        xhr.setRequestHeader('Authorization', prepareUserAuthenticationData_I_5L(storageDataObject.databaseRequestAuth));
                                    }
                                },
                                success: onDatabaseSuccess_I_6L,
                                error: onDatabaseError_I_6L
                            });



                            /**
                             * Local helper functions
                            */
                            function onDatabaseSuccess_I_6L(data) {
                                // at this point we already know that we are about to return some data
                                _invocationContext.isValid = true;

                                // return data via callback
                                return storageDataObject.callback(data);
                            }

                            function onDatabaseError_I_6L(xhr, textStatus, err) {
                                // renew load process
                                return readDataFromExternalDatabase_I_5L(storageDataObject);
                            }
                        }

                        // local helper function to read data from an external service
                        function readDataFromExternalService_I_5L(storageDataObject) {
                            $.ajax({
                                type: "GET",
                                url: storageDataObject.serviceUrl,
                                data: storageDataObject.serviceMethodRequiresParams ?
                                    JSON.stringify(storageDataObject.serviceMethodParams) : null,
                                contentType: storageDataObject.contentType,
                                dataType: storageDataObject.dataType,
                                processData: true,
                                crossDomain: true,
                                beforeSend: function (xhr) {
                                    if (storageDataObject.serviceMethodRequiresAuth) {
                                        xhr.setRequestHeader('Authorization', prepareUserAuthenticationData_I_5L(storageDataObject.serviceMethodAuth));
                                    }
                                },
                                success: onServiceSuccess_I_6L,
                                error: onServiceError_I_6L
                            });



                            /**
                             * Local helper functions
                            */
                            function onServiceSuccess_I_6L(data) {
                                // at this point we already know that we are about to return some data
                                _invocationContext.isValid = true;

                                // return data via callback
                                return storageDataObject.callback(data);
                            }

                            function onServiceError_I_6L(xhr, textStatus, err) {
                                // renew load process
                                return readDataFromExternalService_I_5L(storageDataObject);
                            }
                        }

                        // local helper function to prepare user auth credentials
                        function prepareUserAuthenticationData_I_5L(operationAuthObject) {
                            var token = operationAuthObject.user + ':' + operationAuthObject.password;
                            var hash = window.btoa(token);

                            return 'Basic ' + hash;
                        }
                    }
                }
            }
        }

        /* ~ private functions */



        /* Public API */

        self.getModuleData = function (pathToConfig, moduleDOM_Object, resilientAttemptTimeInterval) {
            // setup module DOM object and resilient attempt time interval
            setModuleDOM_Object_and_ResilientTimeInterval_I_1L(moduleDOM_Object, resilientAttemptTimeInterval);

            // fetch data
            return readDataFromExternalStorage_I_1L(pathToConfig, parseConfig_I_1L);
        };

        self.getInvocationContext = function () {
            return _invocationContext;
        };

        /* ~ Public API */



        // Expose module API to the outside world
        window.rsaal = window.rsaal || self;
    }
)(window);