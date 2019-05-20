/* eslint-disable no-empty */

/**
 * ViewPresenter manages loading of all View-related resources on demand
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
        statelessEvents: {
            onGetNextViewTemplate: {
                eventName: 'GetNextViewTemplate'
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
                        // prepare event detail data
                        var details = [event.detail, processNextViewTemplate_I_2L];

                        // prepare the next view template
                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGetNextViewTemplate.eventName, details);



                        /**
                         * Local helper functions
                        */
                        function processNextViewTemplate_I_2L(nextViewTemplateMetadata, isLast, flowNavigation, getNextViewEventObject) {
                            // store event detail and next template metadata
                            var secondLevelEventDetails = [isLast, flowNavigation, getNextViewEventObject];

                            // load HTML template for this view
                            loadHTML_I_3L();

                            // load CSS stylesheets if there are any
                            loadCSS_I_3L();



                            /**
                             * Local helper functions
                            */
                            function loadHTML_I_3L() {
                                flatFileAPI.Factory.LoadObject.createNew(
                                    null,
                                    null,
                                    _EVENTS_OBJECT.statefulEvents.onHTMLLoaded.eventName,
                                    false,
                                    true,
                                    null,
                                    secondLevelEventDetails
                                )
                                .Functions.loadFlatFile((nextViewTemplateMetadata.rootPath + nextViewTemplateMetadata.html.relativePath).trim().replace('\r\n', ''));
                            }

                            function loadCSS_I_3L() {
                                if(nextViewTemplateMetadata.css.isRequired) {
                                    // test whether not to wait for all CSS to be fully loaded, and bind model data with html template
                                    if(!nextViewTemplateMetadata.css.waitForLoad) {
                                        // notify that CSS load has logically completed
                                        pretendCssWasLoaded_I_4L();
                                    }

                                    // declare CSS array of valid paths
                                    var css_fonts_array = [];

                                    // declare 'this' value
                                    var thisValue;

                                    // prepare full path of each local CSS stylesheet if there are present
                                    if(nextViewTemplateMetadata.css.fonts.internal) {
                                        // define 'this' value
                                        thisValue = {
                                            isInternal: true,
                                            isExternal: false
                                        };

                                        // process CSS stylesheets (create copy of the base array)
                                        var fonts_internal_array = nextViewTemplateMetadata.css.fonts.internal.slice();
                                        fonts_internal_array.forEach(forEachFilter_I_4L, thisValue);

                                        // add internal stylesheets
                                        css_fonts_array.push.apply(css_fonts_array, fonts_internal_array);
                                    }

                                    // clean the path of each external CSS stylesheet
                                    if(nextViewTemplateMetadata.css.fonts.external) {
                                        // define 'this' value
                                        thisValue = {
                                            isInternal: false,
                                            isExternal: true
                                        };

                                        // process CSS stylesheets (create copy of the base array)
                                        var fonts_external_array = nextViewTemplateMetadata.css.fonts.external.slice();
                                        fonts_external_array.forEach(forEachFilter_I_4L, thisValue);

                                        // add external stylesheets
                                        css_fonts_array.push.apply(css_fonts_array, fonts_external_array);
                                    }

                                    // load up physical template's stylesheet given its physical location (load up CSS file)
                                    ral.GET_RAL_OBJECT.Loader.loadAsync(
                                        css_fonts_array,
                                        'css',
                                        /**
                                         * Modules returned by ral.GET_RAL_OBJECT.Loader.loadAsync are executed in the order provided above.
                                         * They're available globally via window object, therefore you can skip them in the function's arguments.
                                        */
                                        onCSSLoad_I_4L
                                    );
                                }
                                // otherwise "mark" that loading of CSS stylesheets has been completed
                                else {
                                    // notify that CSS load has logically completed
                                    pretendCssWasLoaded_I_4L();
                                }



                                /**
                                 * Local helper functions
                                */
                                function pretendCssWasLoaded_I_4L() {
                                    // mark that loading of all CSS stylesheets has logically been completed
                                    _EVENTS_OBJECT.statefulEvents.onCSSLoaded.hasCompleted = true;
                                }

                                function forEachFilter_I_4L(item, index, itemParentArray) {
                                    // check 'this' value to determine internal CSS stylesheets or external ones
                                    if(this.isInternal) {
                                        // clean the stylesheet path
                                        item = nextViewTemplateMetadata.rootPath + nextViewTemplateMetadata.css.relativePath + removeNonPrintableChars_I_5L(item);
                                    }
                                    else if(this.isExternal) {
                                        // clean the stylesheet path
                                        item = removeNonPrintableChars_I_5L(item);
                                    }

                                    // update this cleaned stylesheet in the array
                                    itemParentArray[index] = item;



                                    /**
                                     * Local helper functions
                                    */
                                    function removeNonPrintableChars_I_5L(item) {
                                        return item.trim().replace('\r\n', '');
                                    }
                                }

                                function onCSSLoad_I_4L() {
                                    // if wait for all CSS to be fully loaded
                                    if(nextViewTemplateMetadata.css.waitForLoad) {
                                        // notify that all CSS stylesheets have been loaded as well as external Google Fonts files
                                        _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statefulEvents.onCSSLoaded.eventName, secondLevelEventDetails);
                                    }
                                }
                            }
                        }
                    }
                }
            },

            onCSSLoaded: {
                eventName: 'CSSLoaded',

                eventListener: function(event) {
                    return onCSSLoaded_I_1L(_EVENTS_OBJECT.statefulEvents.onCSSLoaded, event);



                    /**
                     * Local helper functions
                    */
                    function onCSSLoaded_I_1L(self, event) {
                        // update event completion state
                        self.hasCompleted = true;

                        // cache event details
                        var details = event.detail;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onHTMLLoaded.hasCompleted) {
                            // is this template the last one in the workflow
                            var isLast = details[0];

                            // check whether this view template requires some user interaction to yield the next one or the previous one
                            var flowNavigation = details[1];

                            // reference next view event object
                            var getNextViewEventObject = details[2];

                            // update next view event object
                            getNextViewEventObject.viewTemplate = {
                                template:  {
                                    data: _EVENTS_OBJECT.statefulEvents.onHTMLLoaded.htmlTemplate,

                                    isLast: isLast,

                                    flowNavigation: flowNavigation
                                }
                           };

                            // update event object
                            getNextViewEventObject.viewHasBeenLoaded = true;

                            // reset state of _EVENTS_OBJECT.statefulEvents object to a default one
                            _EVENTS_OBJECT.resetToDefault();

                            _debugger.count("ViewPresenter prepared html template... # ");

                            // return control to PresenterManager with passing updated event object
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGotNextViewResources.eventName, getNextViewEventObject);
                        }
                    }
                },

                hasCompleted: false
            },

            onHTMLLoaded: {
                eventName: 'HTMLLoaded',

                eventListener: function(event) {
                    return onHTMLLoaded_I_1L(_EVENTS_OBJECT.statefulEvents.onHTMLLoaded, event);



                    /**
                     * Local helper functions
                    */
                    function onHTMLLoaded_I_1L(self, event) {
                        // update event completion state
                        self.hasCompleted = true;

                        // cache event details
                        var details = event.detail;

                        // store html template inside this custom event object
                        self.htmlTemplate = details[0];

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onCSSLoaded.hasCompleted) {
                            // is this template the last one in the workflow
                            var isLast = details[1];

                            // check whether this view template requires some user interaction to yield the next one or the previous one
                            var flowNavigation = details[2];

                            // reference next view event object
                            var getNextViewEventObject = details[3];

                            // update next view event object
                            getNextViewEventObject.viewTemplate = {
                                template:  {
                                    data: self.htmlTemplate,

                                    isLast: isLast,

                                    flowNavigation: flowNavigation
                                }
                           };

                            // update event object
                            getNextViewEventObject.viewHasBeenLoaded = true;

                            // reset state of _EVENTS_OBJECT.statefulEvents object to a default one
                            _EVENTS_OBJECT.resetToDefault();

                            _debugger.count("ViewPresenter prepared html template... # ");

                            // return control to PresenterManager with passing updated event object
                            _DISPATCHER_OBJECT.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGotNextViewResources.eventName, getNextViewEventObject);
                        }
                    }
                },

                hasCompleted: false,

                htmlTemplate: null
            }
        },

        resetToDefault: function() {
            return resetToDefault_I_1L();



            /**
             * Local helper functions
            */
            function resetToDefault_I_1L() {
                _EVENTS_OBJECT.statefulEvents.onCSSLoaded.hasCompleted = _EVENTS_OBJECT.statefulEvents.onHTMLLoaded.hasCompleted = false;
                _EVENTS_OBJECT.statefulEvents.onHTMLLoaded.htmlTemplate = null;
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