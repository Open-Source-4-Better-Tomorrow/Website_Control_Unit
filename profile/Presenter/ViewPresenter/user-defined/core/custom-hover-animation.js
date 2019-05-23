/* eslint-disable no-undef */

/**
 * Custom Hover Animation Task Library
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

    var _CUSTOM_HOVER_OBJECT_FACTORY = {
        Factory: {
            HoverAnimationObject: {
                createNewInstance: function (htmlSelector, actionInterval, actionTimeout, actionInHandler, actionOutHandler) {
                    return createNewInstance_I_1L(htmlSelector, actionInterval, actionTimeout, actionInHandler, actionOutHandler);



                    /**
                     * Local helper functions
                    */
                    function createNewInstance_I_1L(htmlSelector, actionInterval, actionTimeout, actionInHandler, actionOutHandler) {
                        // create brand new instance of custom looper object
                        var _CUSTOM_HOVER_OBJECT = {
                            Looping: {
                                _internals_: {
                                    htmlSelector_I: htmlSelector || "",

                                    userInteractionTookPlace_I: false,

                                    actionInterval_I: actionInterval || 5000,
                                    actionTimeout_I: actionTimeout || 500,

                                    actionInHandler_I: actionInHandler,
                                    actionOutHandler_I: actionOutHandler,

                                    hoverAnimationLHandler_I: null
                                }
                            },

                            Functions: {
                                startAnimation: function () {
                                    return startAnimation_I_1L();



                                    /**
                                     * Local helper functions
                                    */
                                    function startAnimation_I_1L() {
                                        _CUSTOM_HOVER_OBJECT.Looping._internals_.hoverAnimationLHandler_I =
                                            setInterval(
                                                function () {
                                                    // apply "hover in" effect
                                                    _CUSTOM_HOVER_OBJECT.Looping._internals_.actionInHandler_I();
                                                    // apply "hover out" effect
                                                    setTimeout(
                                                        function () {
                                                            _CUSTOM_HOVER_OBJECT.Looping._internals_.actionOutHandler_I();
                                                        },
                                                        _CUSTOM_HOVER_OBJECT.Looping._internals_.actionTimeout_I
                                                    );
                                                },
                                                _CUSTOM_HOVER_OBJECT.Looping._internals_.actionInterval_I
                                            );

                                        // do some help if required
                                        if (!_CUSTOM_HOVER_OBJECT.Looping._internals_.userInteractionTookPlace_I)
                                            invokeHoverAnimationHelper_I_2L();



                                        /**
                                         * Local helper functions
                                        */
                                        function invokeHoverAnimationHelper_I_2L() {
                                            $(_CUSTOM_HOVER_OBJECT.Looping._internals_.htmlSelector_I).hover(
                                                function () {
                                                    // stop auto-hover effect
                                                    clearInterval(_CUSTOM_HOVER_OBJECT.Looping._internals_.hoverAnimationLHandler_I);

                                                    // apply "hover in" effect
                                                    _CUSTOM_HOVER_OBJECT.Looping._internals_.actionInHandler_I();
                                                },
                                                function () {
                                                    // apply "hover out" effect
                                                    _CUSTOM_HOVER_OBJECT.Looping._internals_.actionOutHandler_I();

                                                    // mark that user interaction took place
                                                    _CUSTOM_HOVER_OBJECT.Looping._internals_.userInteractionTookPlace_I = true;

                                                    // start auto-hover effect
                                                    startAnimation_I_1L();
                                                }
                                            );
                                        }
                                    }
                                },

                                stopAnimation: function () {
                                    return stopAnimation_I_1L();



                                    /**
                                     * Local helper functions
                                    */
                                    function stopAnimation_I_1L() {
                                        // stop custom hover animation
                                        clearInterval(_CUSTOM_HOVER_OBJECT.Looping._internals_.hoverAnimationLHandler_I);
                                    }
                                }
                            }
                        };

                        // return fresh instance
                        return _CUSTOM_HOVER_OBJECT;
                    }
                }
            }
        }
    };

    /* ~ private variables */



    /* Public API */

    self.GET_HOVER_OBJECT = _CUSTOM_HOVER_OBJECT_FACTORY;

    /* ~ Public API */



    // Expose module API to the outside world
    window.customHoverAnimationAPI = window.customHoverAnimationAPI || self;
})(window);