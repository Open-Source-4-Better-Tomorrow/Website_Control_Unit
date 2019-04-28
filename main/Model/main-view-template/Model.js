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

(function (window) {

    var self = this;


    /* private variables */

    var _CUSTOM_MODEL_OBJECT = {
        __init__: function () {
            this.Variables.__init__();
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
        }
    };

    /* ~ private variables */



    /* Public API */

    self.GET_MAIN_MODEL = _CUSTOM_MODEL_OBJECT;

    /* ~ Public API */



    // Expose module API to the outside world
    window.moduleModel = window.moduleModel || self;
})(window);