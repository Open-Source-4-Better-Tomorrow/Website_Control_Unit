/* eslint-disable no-undef */

/**
 * Module that delivers data for the view.
 * The goal is to make this module self-responsible for retrieving data from a database.
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

    /**
     * This is a private object, a.k.a implementation details (~ behind the scenes logic etc.)
    */
    var _VIEW_MODEL_OBJECT = {
        __init__: function () {
            // init variables
            this.Variables.__init__();

            // setup event flow
            this.Functions.bindListenersWithEvents([_EVENTS_OBJECT.initEvents]);
        },

        Variables: {
            __init__: function () {
                this._serverRootDir = window.location.hostname + ":" + window.location.port;
            },

            _serverRootDir: "",

            _siteRootFolder: "/clever_code/",

            _view_Template_Name: "main-view-template.html"
        },

        Contexts: {
            LayoutManagementContext: {
            },

            NewsContentLoadingContext: {
            }
        },

        Functions: {
            viewModelBinder: function(htmlTemplate, dataModel, successCallback, isLast) {
                return viewModelBinder_I_1L(htmlTemplate, dataModel, successCallback, isLast);



                /**
                 * Local helper functions
                */
                function viewModelBinder_I_1L(htmlTemplate, dataModel, successCallback, isLast) {
                    // inject HTML template into DOM
                    $("body").prop("innerHTML", htmlTemplate);

                    // bind model with template
                    for(var tag in dataModel) {
                        var tagObject = dataModel[tag];

                        document.querySelector(tagObject.tagPrefix + tagObject.tagName).innerHTML = tagObject.content;
                    }

                    /**
                     * At this point all data is already binded with template placeholders, hence notify that binding is completed !
                     * This method acting as a callback function has to be invoked as a last one !
                     * Otherwise results could be unpredictable !
                    */
                    successCallback(isLast);
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
            },

            getData: function() {
                return getData_I_1L();



                /**
                 * Local helper functions
                */
                function getData_I_1L() {
                    return {
                                some_key_1: {
                                    tagPrefix:  "",
                                    tagName: "h1",
                                    content: "Hello from Hamburger Project !"
                                },

                                some_key_2: {
                                    tagPrefix:  "",
                                    tagName: "h2",
                                    content: "Officially called [<span class=\"mechanism_name\"> Website Control Unit </span>]"
                                },

                                some_key_3: {
                                    tagPrefix:  "",
                                    tagName: "h3",
                                    content: "Core mechanism of <span class=\"part_of_project_name\"> Progressive Website Concept 1.0 </span>"
                                }
                           };
                }
            }
        }
    };


    /**
     * This is a public object that is requested by the ModelPresenter.
     *
     * It has to have these two "hard-coded" properites called [Data] and [DataToViewBinder].
     *
     * Implementation of the aforementioned props is open to you, i.e. you have to provide valid stuff for these two properties !
     *
     * - [Data] is a property that delivers final view data
     * - [DataToViewBinder.get()] is function that knows the logic of how to "tie" data to html template
     *
     * This object [_VIEW_MODEL_EXPOSER] should be considered as kind of pre-defined object ! (You just copy and paste it into your own Model's module and provide the aforementioned implementation)
    */
    var _VIEW_MODEL_EXPOSER = {
        Data: _VIEW_MODEL_OBJECT.Functions.getData(),

        DataToViewBinder: {
            get: function() {
                return _VIEW_MODEL_OBJECT.Functions.viewModelBinder;
            }
        }
    };

    /**
     * This is an entry point to this model.
     *
     * It has to have this "hard-coded" event called [OnViewModelExposeYourData].
     *
     * Implementation of this event handler should not be changed !
     *
     * This object [_EVENTS_OBJECT] should be considered as kind of pre-defined object ! (You just copy and paste it into your own Model's module and provide the aforementioned implementation)
    */
    var _EVENTS_OBJECT = {
        initEvents: {
            onViewModelExposeYourData: {
                eventName: 'OnViewModelExposeYourData',

                eventListener: function(event) {
                    return onViewModelExposeYourData_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onViewModelExposeYourData_I_1L(event) {
                        // cache event details
                        var details = event.detail;

                        // access model data callback
                        var handleNextViewModelCallback = details[2];

                        // create kind of "singleton", i.e. you can only capture this event once !
                        unbindExposingModel_I_2L();

                        // return the model data
                        handleNextViewModelCallback(_VIEW_MODEL_EXPOSER, details);



                        /**
                         * Local helper functions
                        */
                        function unbindExposingModel_I_2L() {
                            _VIEW_MODEL_OBJECT.Functions.bindListenersWithEvents([_EVENTS_OBJECT.initEvents], true);
                        }
                    }
                }
            }
        }
    };

    // kick off self-init
    _VIEW_MODEL_OBJECT.__init__();

})();