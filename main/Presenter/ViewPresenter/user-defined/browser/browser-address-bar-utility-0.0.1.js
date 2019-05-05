/**
 * BrowserAddressBarUtility JavaScript library v0.0.1
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
    'use strict';


    /* private variables */

    var _tokenName = "___url_token___";
    var _shadowTokenName = "___url_token_shadow___";
    var _shadowToken;


    var _writeOperation = "___SMDUwVW01T1NsSldXWGhaTWp___PU2xKRlJqTlVNb___VW01T1NsSldXWGhaTWpBMVpERndXRkp1VmtwU2F6UjRXV3hqZUdKSFRuQlJiRlpvVm5wR2MxTXhSVGxRVVQw";
    var _readOperation = "___RXdiRVpqUkVacFVUQk___S1YyRXdiRVpqUkVacFVUQkdORlF4VGtKbFZURkZVbFJPU2xKRlJqTlVNbkJTWlVVN___lVNbkJTWlVVNWNWRlVRa3BTVjFKUFZtdE9lbVF3TVhGUldHUktVVEpvUlZkc1l6Rk5SMDUwVW01T1NsSldXWGhaTWpBMVpERndXRkp1VmtwU2F6UjRXV3hqZUdKSFRuQlJiRlpvVm5wR2MxTXhSVGxRVVQwOQ=SldXWGhaTWp=";
    var _defaultOperation;
    var _defaultOperationName = "___default_operation___";

    var _fallbackUrlName = "___fallbackUrl___";

    /* ~ private variables */



    /* private methods */

    function getDestinationUrlShadowToken_I_1L() {
        return _shadowToken;
    }

    function setDestinationUrlToken_I_1L(token) {
        var encoded_token = btoa(btoa(token));

        sessionStorage.setItem(_tokenName, encoded_token);

        return "#" + encoded_token;
    }

    function createDestinationUrlToken_I_1L() {
        var token = btoa(btoa(
            (Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36) +
                Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36)
            ).substring(3) +
            btoa(unescape(encodeURIComponent(new Date())))
        ));

        return token;
    }

    function getDestinationUrlToken_I_1L() {
        var tokenShadow = getDestinationUrlShadowToken_I_1L();

        var token = setDestinationUrlToken_I_1L(tokenShadow);

        return token;
    }

    function setDestinationUrlNewShadowToken_I_1L() {
        _shadowToken = createDestinationUrlToken_I_1L();

        sessionStorage.setItem(_shadowTokenName, _shadowToken);
    }

    function clearHash_I_1L(hashReplacement) {
        window.location.hash = hashReplacement;
    }

    function isCurrentOperationSetToWrite_I_1L() {
        var result;

        // get current operation
        _defaultOperation = sessionStorage.getItem(_defaultOperationName);

        if (_defaultOperation == null) {
            sessionStorage.setItem(_defaultOperationName, _writeOperation);
            result = true;
        } else {
            result = _defaultOperation === _writeOperation;
        }

        // return current operation writable status
        return result;
    }

    function determineNextOperationWritableStatus_I_1L() {
        // get current operation
        _defaultOperation = sessionStorage.getItem(_defaultOperationName);

        // check if it is read or write
        switch (_defaultOperation) {
            case _writeOperation:
                sessionStorage.setItem(_defaultOperationName, _readOperation);
                break;

            case _readOperation:
                sessionStorage.setItem(_defaultOperationName, _writeOperation);
                break;
        }
    }

    function getFallbackUrl_I_1L() {
        return sessionStorage.getItem(_fallbackUrlName);
    }

    function setFallbackUrl_I_1L(fallbackUrl) {
        sessionStorage.setItem(_fallbackUrlName, fallbackUrl);
    }

    function checkDestinationUrlToken_and_AllowForGeneratingNewIfValidationFailed_I_1L(callback, hashReplacement) {
        var url_token = atob(atob(sessionStorage.getItem(_tokenName) || ""));
        var url_token_shadow = sessionStorage.getItem(_shadowTokenName);

        var url_href_token = atob(atob(window.location.hash.substring(1) || ""));

        if (
            url_token === url_token_shadow &&
            url_token === url_href_token &&
            url_href_token === url_token_shadow
        ) {
            // delete current used token
            sessionStorage.removeItem(_tokenName);
            sessionStorage.removeItem(_shadowTokenName);

            // notify that validation passed
            callback(true, hashReplacement);
        } else {
            // delete current used token
            sessionStorage.removeItem(_tokenName);
            sessionStorage.removeItem(_shadowTokenName);

            // token validation failed, therefore switch to write mode for destination url to be able to generate a new token
            determineNextOperationWritableStatus_I_1L();

            // reverts to the calling url
            window.location.href = getFallbackUrl_I_1L();

            // notify that validation failed
            callback(false);
        }
    }

    function processValidationResponse_I_1L(booleanFlag, hashReplacement) {
        if (booleanFlag) {
            // generate new token to be valid for next GET request
            setDestinationUrlNewShadowToken_I_1L();

            // obfuscate token
            clearHash_I_1L(hashReplacement);
        }
    }

    /* ~ private methods */



    /* Public API */

    self.setupTokenMode = function (hashReplacement) {
        if (isCurrentOperationSetToWrite_I_1L()) {
            // generate new token to be valid for next GET request
            setDestinationUrlNewShadowToken_I_1L();

            // set next operation to READ mode
            determineNextOperationWritableStatus_I_1L();

            // set fallback address
            setFallbackUrl_I_1L(window.location.href);
        } else {
            // if validation fails this method aborts execution in the context in which it is being invoked and reverts to the calling url
            checkDestinationUrlToken_and_AllowForGeneratingNewIfValidationFailed_I_1L(processValidationResponse_I_1L, hashReplacement);

            // set fallback address
            setFallbackUrl_I_1L(window.location.href);
        }
    };

    self.getToken = function () {
        return getDestinationUrlToken_I_1L();
    };

    /* ~ Public API */



    // Expose module API to the outside world
    window.activeBrowserAddressBarUtility = window.activeBrowserAddressBarUtility || self;
})(window);