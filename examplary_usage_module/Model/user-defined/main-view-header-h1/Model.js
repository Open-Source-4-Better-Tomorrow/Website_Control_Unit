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
                    _VIEW_MODEL_OBJECT.Functions.applyListenerEventBinder();

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
                                    some_key_1: {
                                        tagPrefix:  ".",
                                        tagName: "div_h1",
                                        content: "Hello from <span class=\"mechanism_unofficially\">Hamburger Project</span> !"
                                    }
                                }
                           };
                }
            },

            applyListenerEventBinder: function() {
                return applyListenerEventBinder_I_1L();



                /**
                 * Local helper functions
                */
                function applyListenerEventBinder_I_1L() {
                    // handle get next view
                    document.getElementsByClassName('mechanism_unofficially')[0].addEventListener('click', yieldNextView_I_2L);



                    /**
                     * Local helper functions
                    */
                    function yieldNextView_I_2L() {
                        // resume flow from this point (yield the next view) !!!!
                        document.dispatchEvent(new CustomEvent('GetNextView'));
                    }
                }
            }
        }
    };

    // kick off model self-init
    _VIEW_MODEL_OBJECT.__init__();

})();