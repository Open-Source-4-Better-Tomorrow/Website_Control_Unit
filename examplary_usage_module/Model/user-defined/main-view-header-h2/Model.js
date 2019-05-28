/* eslint-disable no-undef */

/**
 * Module that delivers data for the view.
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

    var _VIEW_MODEL_OBJECT = {
        __init__: function () {
            // init variables
            this.Variables.__init__();

            // setup event flow
            baseModelObject.Factory.createNew(this.Functions.getData, this.Functions.applyViewModelBinder, this.Functions.applyListenerEventBinder);
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
            applyViewModelBinder: function(htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                return applyViewModelBinder_I_1L(htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation);



                /**
                 * Local helper functions
                */
                function applyViewModelBinder_I_1L(htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                    // get encapsulated object
                    var dataModelObject = dataModel();

                    // reference "entry point"
                    var contentContainer = document.body.querySelector(dataModelObject.parentSelector);

                    // inject HTML template into DOM
                    contentContainer.innerHTML += htmlTemplate;

                    // reference collection of tags
                    var dataCollection = dataModelObject.dataCollection;

                    // bind model with template
                    for(var tag in dataCollection) {
                        var tagObject = dataCollection[tag];

                        contentContainer.querySelector(tagObject.tagPrefix + tagObject.tagName).innerHTML = tagObject.content;
                    }

                    // add some event handlers for this view-model part that will resume further flow of logic if required by Presenter.View.metadata.resources' flowNavigaton object
                    _VIEW_MODEL_OBJECT.Functions.applyListenerEventBinder(applyViewModelUnbinder_I_1L, htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation);

                    /**
                     * At this point all data is already binded with template placeholders, hence notify that binding is completed !
                     * This method acting as a callback function has to be invoked as a last one !
                     * Otherwise results could be unpredictable !
                    */
                    successCallback(isLast, flowNavigation);
                }

                function applyViewModelUnbinder_I_1L(htmlTemplate, dataModel, successCallback, isLast, flowNavigation) {
                    // remove some event handlers for this view-model part
                    _VIEW_MODEL_OBJECT.Functions.applyListenerEventBinder(function() {});

                    // get encapsulated object
                    var dataModelObject = dataModel();

                    // reference "entry point"
                    var contentContainer = document.body.querySelector(dataModelObject.parentSelector);

                    // reference data collection
                    var dataCollection = dataModelObject.dataCollection;

                    // remove all children from DOM (much faster solution than contentContainer.innerHTML = "" !!!!)
                    for(var tag in dataCollection) {
                        // get current partial view selector
                        var tagObject = dataCollection[tag];

                        // reference current partial view
                        var currentPartialView = contentContainer.querySelector(tagObject.tagPrefix + tagObject.tagName);

                        // remove all children of this partial view
                        while(currentPartialView.firstChild) {
                            currentPartialView.removeChild(currentPartialView.firstChild);
                        }

                        // remove current partial view itself
                        contentContainer.removeChild(currentPartialView);
                    }


                    /**
                     * At this point all data is already binded with template placeholders, hence notify that binding is completed !
                     * This method acting as a callback function has to be invoked as a last one !
                     * Otherwise results could be unpredictable !
                    */
                    successCallback(isLast, flowNavigation);
                }
            },

            getData: function() {
                return getData_I_1L();



                /**
                 * Local helper functions
                */
                function getData_I_1L() {
                    return {
                                parentSelector: ".content",
                                dataCollection: {
                                    some_key_2: {
                                        tagPrefix:  ".",
                                        tagName: "div_h2",
                                        content: "<span class=\"mechanism_officially\">Officially</span> called [<span class=\"mechanism_name\"> Website Control Unit </span>]"
                                    }
                                }
                           };
                }
            },

            applyListenerEventBinder: function(viewModelUnbinder, htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                return applyListenerEventBinder_I_1L(viewModelUnbinder, htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation);



                /**
                 * Local helper functions
                */
                function applyListenerEventBinder_I_1L(viewModelUnbinder, htmlTemplate, dataModel, successCallback, prevModelEventListenerBinder, isLast, flowNavigation) {
                    getNextView_I_2L(true);
                    removeCurrentView_I_2L(
                                            true,
                                            viewModelUnbinder.bind(
                                                                    null,
                                                                    htmlTemplate,
                                                                    dataModel,
                                                                    successCallback,
                                                                    isLast,
                                                                    flowNavigation
                                                                  ),
                                            prevModelEventListenerBinder
                                          );



                    /**
                     * Local helper functions
                    */
                    function getNextView_I_2L(doBind) {
                        // handle get next view
                        if(doBind) {
                            document.getElementsByClassName('mechanism_name')[0].addEventListener('click', yieldNextView_I_3L);
                        }
                        else {
                            document.getElementsByClassName('mechanism_name')[0].removeEventListener('click', yieldNextView_I_3L);
                        }



                        /**
                         * Local helper functions
                        */
                        function yieldNextView_I_3L() {
                            // resume flow from this point (yield the next view) !!!!
                            document.dispatchEvent(new CustomEvent('GetNextView'));
                        }
                    }

                    function removeCurrentView_I_2L(doBind, unbinderCallback, previousModelEventListenerBinder) {
                        if(doBind) {
                            // bind core data to callback that will remove the current view view
                            var removeCurrentViewCallback = removeCurrentView_I_3L.bind(null, unbinderCallback, previousModelEventListenerBinder);

                            // handle get previous view
                            document.getElementsByClassName('mechanism_officially')[0].addEventListener('click', removeCurrentViewCallback);
                        }
                        else {
                            // handle get previous view
                            document.getElementsByClassName('mechanism_officially')[0].removeEventListener('click', removeCurrentView_I_3L);
                        }



                        /**
                         * Local helper functions
                        */
                        function removeCurrentView_I_3L(optionalUnbinderCallback, optionalPreviousModelEventListenerBinder) {
                            // resume flow from this point (remove the current view view) !!!!
                            if(optionalUnbinderCallback)
                                document.dispatchEvent(new CustomEvent('RemoveCurrentView',{bubbles: false, cancelable: false, detail: [optionalUnbinderCallback, optionalPreviousModelEventListenerBinder]}));
                            else
                                document.dispatchEvent(new CustomEvent('RemoveCurrentView'));
                        }
                    }
                }
            }
        }
    };

    // kick off model self-init
    _VIEW_MODEL_OBJECT.__init__();

})();