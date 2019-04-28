/* eslint-disable no-undef */

/**
 * Module that controls the loading process of this DHTML MVC module.
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
        // create controller functions object
        var _CONTROLLER_FUNCTIONS = {
            onRequiredModulesLoaded: function () {
                return onRequiredModulesLoaded_I_1L();



                /**
                 * Local helper functions
                */
                function onRequiredModulesLoaded_I_1L() {
                    /**
                     * Trigger controller's entry method as soon as HTML document has been completely loaded and parsed (althought some images, frames & other external resources may still be loading).
                     * This allows controller for kicking off its entry method as soon as possible with View knowing nothing about mechanism that renders View's layout.
                     * This is further separation of concerns (DHTML MVC Concept).
                     * This provides better CSP (Content Security Policy).
                    */
                    runControllerEntryPoint_I_2L();



                    /**
                     * Local helper functions
                    */
                    function runControllerEntryPoint_I_2L() {
                        // check browser requirements from the site point of view
                        var areValid = activeBrowser.browserUtility.checkRequirements(
                            _CONTROLLER_OBJECT.Variables._mobileVersionPrefix,
                            _CONTROLLER_OBJECT.Variables._disallowedResolutionsArray,
                            11,
                            _CONTROLLER_OBJECT.Variables._notSupportedResolution
                        );
                        // if browser requirements are ok, proceed with token
                        if (areValid) {
                            // setup token mode
                            activeBrowserAddressBarUtility.setupTokenMode(_CONTROLLER_OBJECT.Variables._hashReplacement);

                            /**
                             * This method - show_Fast_Initial_View_I_3L - represents CRP (Critical Rendering Path), which means the TTFP (Time To First Paint),
                             * which in plain English means the very first something that is shown instead of blank page, i.e. in this case it is the logo.
                             * CSS styles responsible for appropriate styling the logo are put directly into HTML HEAD section.
                             * This is commonly agreed a professional way of handling so-called Above-The-Fold-View,
                             * which in plain English means all HTML and CSS that must be shown as soon as possible with proper styling.
                             * I deliberately broke this rule a little bit, because actual CRP -> TTFP takes place when this loading progress stuff happens.
                             * This is a real TTFP, but in this case TTFP means meaningful content strictly related to the website, which is the logo.
                            */
                            show_Fast_Initial_View_I_3L();
                        }



                        /**
                         * Local helper functions
                        */
                        function show_Fast_Initial_View_I_3L() {
                            // inject Fast Initial View template
                            setupFastInitialView_I_4L();

                            // at this stage initial view was already set up, so show progress bar
                            showProgressBar_I_4L();

                            // at this stage initial view was already set up, so proceed with pending data load process
                            confirm_that_FastInitialView_was_loaded_I_4L();

                            // show logo and do some animation
                            showLogo_I_4L();



                            /**
                             * Local helper functions
                            */
                            function setupFastInitialView_I_4L() {
                                // get current main view's url
                                var currentUrl = location.href.substring(0, location.href.lastIndexOf('/') + 1) + _CONTROLLER_OBJECT.Variables._view_Template_Name;

                                var currentUrl_HTML = sessionStorage.getItem(currentUrl);

                                var pageHEAD = currentUrl_HTML.substring(currentUrl_HTML.indexOf("<head>"), currentUrl_HTML.lastIndexOf("</head>"));

                                var pageBody = currentUrl_HTML.substring(currentUrl_HTML.indexOf("<body>"), currentUrl_HTML.lastIndexOf("</body>"));

                                // set up initial view
                                $("head").prop("innerHTML", pageHEAD);
                                $("body").prop("innerHTML", pageBody);
                            }

                            function showProgressBar_I_4L() {
                                $(".progressInfo").css("visibility", "visible");

                                var _progressCounter = 1;

                                document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                                document.getElementsByClassName("progress_" + (_progressCounter + 1))[0].style.backgroundColor = "white";
                                document.getElementsByClassName("progress_" + (_progressCounter + 2))[0].style.backgroundColor = "white";

                                _progressCounter++;

                                _CONTROLLER_OBJECT.Variables._animationIntervalHandler = setInterval(function () {
                                    switch (_progressCounter) {
                                        case 1:
                                            document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                                            document.getElementsByClassName("progress_" + (_progressCounter + 1))[0].style.backgroundColor = "white";
                                            document.getElementsByClassName("progress_" + (_progressCounter + 2))[0].style.backgroundColor = "white";
                                            break;

                                        case 2:
                                            document.getElementsByClassName("progress_" + (_progressCounter - 1))[0].style.backgroundColor = "white";
                                            document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                                            document.getElementsByClassName("progress_" + (_progressCounter + 1))[0].style.backgroundColor = "white";
                                            break;

                                        case 3:
                                            document.getElementsByClassName("progress_" + (_progressCounter - 2))[0].style.backgroundColor = "white";
                                            document.getElementsByClassName("progress_" + (_progressCounter - 1))[0].style.backgroundColor = "white";
                                            document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                                            break;
                                    }
                                    _progressCounter++;
                                    if (_progressCounter === 4) _progressCounter = 1;
                                }, 300);
                            }

                            function confirm_that_FastInitialView_was_loaded_I_4L() {
                                document.dispatchEvent(new CustomEvent(_CONTROLLER_OBJECT.DynamicResources.eventTypeArray[1]));
                            }

                            function showLogo_I_4L() {
                                setTimeout(function () {
                                    $("body").css("overflow-y", "hidden");
                                }, 0);

                                setTimeout(function () {
                                    $(".splash").css("opacity", "0.2");
                                }, 500);

                                setTimeout(function () {
                                    $(".splash").css("opacity", "0.6");
                                }, 1500);

                                setTimeout(function () {
                                    $(".splash").css("opacity", "1");

                                    $("body").css("overflow-y", "auto");
                                }, 2000);
                            }
                        }
                    }
                }
            },

            onLoadFastInitialView: function () {
                return onLoadFastInitialView_I_1L();



                /**
                 * Local helper functions
                */
                function onLoadFastInitialView_I_1L() {
                    // load other required resources for page being fully usable
                    ral.GET_RAL_OBJECT.Loader.loadAsync(
                        _CONTROLLER_OBJECT.DynamicResources.fastInitialView_PendingOperations_RequiredModulesArray,
                        _CONTROLLER_OBJECT.DynamicResources.fastInitialView_PendingOperations_RequiredModulesArray_Type,
                        /**
                         * Modules returned by ral.GET_RAL_OBJECT.Loader.loadAsync are executed in the order provided above.
                         * They're available globally via window object, therefore you can skip them in the function' arguments.
                        */
                        function () {
                            // after Fast Initial View was loaded, trigger pending operations
                            confirm_that_FastInitialView_was_shown_I_1L();



                            /**
                             * Local helper functions
                            */
                            function confirm_that_FastInitialView_was_shown_I_1L() {
                                document.dispatchEvent(new CustomEvent(_CONTROLLER_OBJECT.DynamicResources.eventTypeArray[2]));
                            }
                        }
                    );
                }
            },

            onShowFastInitialView: function () {
                return onShowFastInitialView_I_1L();



                /**
                 * Local helper functions
                */
                function onShowFastInitialView_I_1L() {
                    // cancel progress bar animation
                    clearInterval(_CONTROLLER_OBJECT.Variables._animationIntervalHandler);

                    // run pending operations
                    moduleControllerHelper.runPendingOperationsAfterFastInitialView();
                }
            }
        };

        // create main controller object
        var _CONTROLLER_OBJECT = {
            __init__: function () {
                // check if every event has its matching handler
                var length = this.DynamicResources.eventTypeArray.length === this.DynamicResources.eventTypeHandlerArray.length ? this.DynamicResources.eventTypeArray.length : null;
                if (!length)
                    throw new Error("Every event has to have its corresponding handler");

                // assign event with its matching handler
                for (var i = 0; i < length; i++) {
                    this.Events.addEventHandler(this.DynamicResources.eventTypeArray[i], this.DynamicResources.eventTypeHandlerArray[i]);
                }
            },

            // This is the only object where you change some resources to load and some events to react to
            DynamicResources: {
                fastInitialView_PendingOperations_RequiredModulesArray: [
                    '../C/js_workers/external/dom/jquery-ui.min.js',
                    '../M/js_workers/tasks/js-custom-markup.js',
                    '../M/js_workers/tasks/js-custom-text-looper.js',
                    '../M/js_workers/tasks/js-custom-hover-animation.js',
                    '../M/ModuleModel.js',
                    '../C/js_workers/internal/controller_helpers/ModuleControllerHelper.js',
                    '../C/js_workers/internal/storage_abstraction/rsaal.js'
                ],

                fastInitialView_PendingOperations_RequiredModulesArray_Type: 'js',

                eventTypeArray: ["requiredModulesLoaded", "loadFastInitialView", "showFastInitialView"],

                eventTypeHandlerArray: [_CONTROLLER_FUNCTIONS.onRequiredModulesLoaded, _CONTROLLER_FUNCTIONS.onLoadFastInitialView, _CONTROLLER_FUNCTIONS.onShowFastInitialView]
            },

            Variables: {
                _mobileVersionPrefix: "mobile.",
                _disallowedResolutionsArray: ["640", "480", "800", "600", "1024", "600", "1024", "768", "1152", "864", "1280", "720", "1280", "768", "1280", "950"],

                _notSupportedResolution: "This site does not support this browser or resolution." +
                    "<br />" +
                    "Please use IE 11, Firefox, Google Chrome, Opera, Safari or Microsoft Edge." +
                    "<br />" +
                    "Please use higher resolution." +
                    "<br />" +
                    "The base device supported is 1280 x 768",

                _hashReplacement: "",

                _view_Template_Name: "fast-initial-view-template.html",

                // this handler controls progress bar's animation cancelation
                _animationIntervalHandler: null
            },

            Events: {
                addEventHandler: function (eventType, eventHandler) {
                    return addEventHandler_I_1L();



                    /**
                     * Local helper functions
                    */
                    function addEventHandler_I_1L() {
                        document.addEventListener(eventType, eventHandler);
                    }
                }
            }
        };

        // initialize and run controller
        _CONTROLLER_OBJECT.__init__();
    }
)();