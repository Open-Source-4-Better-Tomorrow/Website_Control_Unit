/* eslint-disable no-undef */

/**
 * Module that provides some help in navigation between Model and View.
 * This single module is part of the bigger one, that stands for Controller in the MVC design pattern.
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
    function () {
        var self = this;


        /* private variables */

        var _moduleModel;

        /* ~ private variables */




        /* private functions */

        function initializeModel_I_1L() {
            // force initialization of a model
            moduleModel.GET_MAIN_MODEL.__init__();

            _moduleModel = {
                GET: moduleModel.GET_MAIN_MODEL
            };
        }

        function updateMainView_I_1L() {
            // get current main view's url
            var currentUrl = location.href.substring(0, location.href.lastIndexOf('/') + 1) + _moduleModel.GET.Variables._view_Template_Name;

            var currentUrl_HTML = sessionStorage.getItem(currentUrl);

            var pageHEAD = currentUrl_HTML.substring(currentUrl_HTML.indexOf("<head>"), currentUrl_HTML.lastIndexOf("</head>"));

            var pageBody = currentUrl_HTML.substring(currentUrl_HTML.indexOf("<body>"), currentUrl_HTML.lastIndexOf("</body>"));

            $("head").prop("innerHTML", pageHEAD);
            $("body").prop("innerHTML", pageBody);
        }

        function loadCSS_I_1L() {
            ral.GET_RAL_OBJECT.Loader.loadAsync(
                [
                    '//' + _moduleModel.GET.Variables._serverRootDir + '/clever_code/main/V/css/main-view/normalize.css',
                    '//' + _moduleModel.GET.Variables._serverRootDir + '/clever_code/main/V/css/main-view/index__misc.css',
                    'https://fonts.googleapis.com/css?family=Aldrich',
                    'https://fonts.googleapis.com/css?family=Rajdhani',
                    'https://fonts.googleapis.com/icon?family=Material+Icons'
                ],
                'css',
                function () {
                    // on having all CSS loaded, inject all static text, enable navigation, and handle all visual issues
                    injectStaticLabels_and_BindActions_I_2L();
                }
            );



            /**
             * Local helper functions
            */
            function injectStaticLabels_and_BindActions_I_2L() {
                /**
                 *
                */
            }
        }

        function on_SAAL_BeingAccessible_I_1L() {
            /**
             * Setup two callbacks:
             *  - [onInternalDOMUploadDataCallback] - set callback to do internal DOM data upload [in this case no such requirement !]
             *
             *  - [onReturnDataCallback] - set callback to invoke on successfull completion of returning external data or notify about successfull completion of internal DOM data upload
            */

            _moduleModel.GET.Contexts.NewsContentLoadingContext.onReturnDataCallback = initializeNewsFunctionality_I_2L;

            // load module data asynchronously given current configuration of module config and data loading context object
            window.rsaal.getModuleData(_moduleModel.GET.Variables._pathToConfig, _moduleModel.GET.Contexts.NewsContentLoadingContext, _moduleModel.GET.Constants._dataFetchingTimeInterval);



            /**
             * Local helper functions
            */
            function initializeNewsFunctionality_I_2L(abstractionOfData) {

            }
        }

        /* ~ private functions */



        /* Public API */

        /**
         * Run necessary pending operations after the fast initial view,
         * the most important of which is initializing the model.
        */
        self.runPendingOperationsAfterFastInitialView = function () {
            initializeModel_I_1L();

            updateMainView_I_1L();

            loadCSS_I_1L();

            //loadCacheIfAny_I_1L();

            on_SAAL_BeingAccessible_I_1L();
        };

        /* ~ Public API */



        // Expose module API to the outside world
        window.moduleControllerHelper = window.moduleControllerHelper || self;
    }
)();