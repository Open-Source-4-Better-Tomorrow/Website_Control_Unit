/**
 * Module that provides backward compatibility in terms of new features.
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
    // define CustomEvent constructor function
    function CustomEvent(event, params) {
        // define params
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };

        // create custom event object
        var evt = document.createEvent('CustomEvent');

        // initialize custom event object
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

        // return custom event object
        return evt;
    }

    // define custom Array's forEach function based on https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/forEach#Kompatybilno.C5.9B.C4.87
    function ArrayForEach(fun /*, thisp*/ ) {
        var len = this.length;

        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];

        for (var i = 0; i < len; i++) {
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    }

    /**
     * Object.prototype.forEach() polyfill
     * https://gomakethings.com/looping-through-objects-with-es6/
     * @author Chris Ferdinandi
     * @license MIT
    */
    var ObjectForEach = {
        value: function (callback, thisArg) {
            if (this == null) {
                throw new TypeError('Not an object');
            }

            thisArg = thisArg || window;

            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    callback.call(thisArg, this[key], key, this);
                }
            }
        }
    };



    /**
     * Define custom polyfills on demand !
    */

    // check existance of a native CustomEvent
    if (typeof window.CustomEvent !== 'function') {
        // "tie" this custom constructor function to the "appropriate" ancestor
        CustomEvent.prototype = window.Event.prototype;

        // make this custom constructor function available in the context of a window
        window.CustomEvent = CustomEvent;
    }

    // check existance of a native Array's forEach method
    if (!Array.prototype.forEach) {
        // "tie" this custom Array's forEach function to the "appropriate" ancestor
        Array.prototype.forEach = ArrayForEach;
    }

    // check existance of a native Object's forEach method
    if (!Object.prototype.forEach) {
        Object.defineProperty(Object.prototype, 'forEach', ObjectForEach);
    }
})();