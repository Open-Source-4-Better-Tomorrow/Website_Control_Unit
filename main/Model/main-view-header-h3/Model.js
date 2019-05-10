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
            baseModelObject.Factory.createNew(this.Functions.getData, this.Functions.viewModelBinder);
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

                    /**
                     * At this point all data is already binded with template placeholders, hence notify that binding is completed !
                     * This method acting as a callback function has to be invoked as a last one !
                     * Otherwise results could be unpredictable !
                    */
                    successCallback(isLast);
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
                                    some_key_3: {
                                        tagPrefix:  ".",
                                        tagName: "div_h3",
                                        content: "Core mechanism of <span class=\"part_of_project_name\"> Progressive Website Concept 1.0</span>"
                                    }
                                }
                           };
                }
            }
        }
    };

    // kick off model self-init
    _VIEW_MODEL_OBJECT.__init__();

})();