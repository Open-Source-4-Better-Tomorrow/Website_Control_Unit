/**
 * Custom Text Looping Task Library
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

    var _CUSTOM_LOOPER_OBJECT_FACTORY = {
        Factory: {
            TextLooperObject: {
                createNewInstance: function (textToLoop, textPartSeparator, messageViewerSelector, timeIntervalInSeconds, showMessageViewerIfHidden) {
                    return createNewInstance_I_1L(textToLoop, textPartSeparator, messageViewerSelector, timeIntervalInSeconds, showMessageViewerIfHidden);



                    /**
                     * Local helper functions
                    */
                    function createNewInstance_I_1L(textToLoop, textPartSeparator, messageViewerSelector, timeIntervalInSeconds, showMessageViewerIfHidden) {
                        // create brand new instance of custom looper object
                        var _CUSTOM_LOOPER_OBJECT = {
                            Looping: {
                                _internals_: {
                                    textToLoop: textToLoop || "",

                                    chunkSeparator: textPartSeparator || "|",

                                    messageViewer: messageViewerSelector || ".messageViewer",

                                    interval: timeIntervalInSeconds * 1000 || 10 * 1000,
                                    intervalHandler: null,

                                    showMessageViewer: showMessageViewerIfHidden || true,

                                    loopInitializer: {
                                        // all text parts to iterate over
                                        textParts: "",

                                        // value to initialize index with
                                        initialTextPartIndexValue: 1,

                                        // index of current text part
                                        textPartIndex: -1
                                    },

                                    isLoopRunning: false,

                                    initializeLoop: function () {
                                        // prepare text parts
                                        _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textParts = _CUSTOM_LOOPER_OBJECT.Looping._internals_.textToLoop.split(_CUSTOM_LOOPER_OBJECT.Looping._internals_.chunkSeparator);

                                        // initialize all indices
                                        _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textPartIndex = _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.initialTextPartIndexValue;
                                    },

                                    runLoop: function () {
                                        return runLoop_I_1L();



                                        /**
                                         * Local helper functions
                                        */
                                        function runLoop_I_1L() {
                                            // run first iteration
                                            invokeLoop_I_1L();

                                            // schedule further iterations
                                            scheduleLoop_I_1L();
                                        }

                                        function invokeLoop_I_1L() {
                                            // check if index reset required
                                            if (_CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textPartIndex > _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textParts.length)
                                                _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textPartIndex = _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.initialTextPartIndexValue;

                                            // insert current text part
                                            document.querySelector(_CUSTOM_LOOPER_OBJECT.Looping._internals_.messageViewer).innerHTML =
                                                _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textParts[_CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textPartIndex - 1];

                                            // increment index
                                            _CUSTOM_LOOPER_OBJECT.Looping._internals_.loopInitializer.textPartIndex++;
                                        }

                                        function scheduleLoop_I_1L() {
                                            // move to the next text part (a.k.a setup text part carousel)
                                            _CUSTOM_LOOPER_OBJECT.Looping._internals_.intervalHandler = setInterval(function () {
                                                    // manage text part
                                                    invokeLoop_I_1L();
                                                },
                                                _CUSTOM_LOOPER_OBJECT.Looping._internals_.interval
                                            );
                                        }
                                    },

                                    resetLoop: function () {
                                        this.initializeLoop();
                                    }
                                }
                            },

                            Functions: {
                                startLoop: function () {
                                    return startLoop_I_1L();



                                    /**
                                     * Local helper functions
                                    */
                                    function startLoop_I_1L() {
                                        // only run loop once, i.e. you can only run loop when it is paused or stopped
                                        if (!_CUSTOM_LOOPER_OBJECT.Looping._internals_.isLoopRunning) {
                                            // make a loop container visible if required
                                            if (_CUSTOM_LOOPER_OBJECT.Looping._internals_.showMessageViewer)
                                                document.querySelector(_CUSTOM_LOOPER_OBJECT.Looping._internals_.messageViewer).style.visibility = "visible";

                                            // run loop
                                            _CUSTOM_LOOPER_OBJECT.Looping._internals_.runLoop();

                                            // mark that we started the loop
                                            _CUSTOM_LOOPER_OBJECT.Looping._internals_.isLoopRunning = true;
                                        }
                                    }
                                },

                                pauseLoop: function () {
                                    return pauseLoop_I_1L();



                                    /**
                                     * Local helper functions
                                    */
                                    function pauseLoop_I_1L() {
                                        // stop looper
                                        clearInterval(_CUSTOM_LOOPER_OBJECT.Looping._internals_.intervalHandler);

                                        // mark that we stopped the loop
                                        _CUSTOM_LOOPER_OBJECT.Looping._internals_.isLoopRunning = false;

                                        // no need to reset to default settings, hence kind of "pausing" the current execution
                                    }
                                },

                                stopLoop: function () {
                                    return stopLoop_I_1L();



                                    /**
                                     * Local helper functions
                                    */
                                    function stopLoop_I_1L() {
                                        // stop looper
                                        clearInterval(_CUSTOM_LOOPER_OBJECT.Looping._internals_.intervalHandler);

                                        // reset to default settings
                                        _CUSTOM_LOOPER_OBJECT.Looping._internals_.resetLoop();

                                        // clear the message viewer
                                        document.querySelector(_CUSTOM_LOOPER_OBJECT.Looping._internals_.messageViewer).innerHTML = "";

                                        // mark that we stopped the loop
                                        _CUSTOM_LOOPER_OBJECT.Looping._internals_.isLoopRunning = false;
                                    }
                                }
                            }
                        };

                        // initialize this brand new instance of custom looper object
                        _CUSTOM_LOOPER_OBJECT.Looping._internals_.initializeLoop();

                        // return fresh instance
                        return _CUSTOM_LOOPER_OBJECT;
                    }
                }
            }
        }
    };

    /* ~ private variables */



    /* Public API */

    self.GET_LOOPER_OBJECT = _CUSTOM_LOOPER_OBJECT_FACTORY;

    /* ~ Public API */



    // Expose module API to the outside world
    window.customTextLooperAPI = window.customTextLooperAPI || self;
})(window);