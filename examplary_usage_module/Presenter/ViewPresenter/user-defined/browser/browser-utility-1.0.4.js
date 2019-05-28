/* eslint-disable no-unused-vars */

/**
 * BrowserUtility JavaScript library v1.0.4
 * (https://github.com/dabrowski-software-development/BrowserUtility)
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


    var _currentBrowser = navigator.userAgent;
    var _currentBrowserIsCompatible = true;

    var _mobileBrowserRegex = /mobile/i;

    var _chromeRegex = /chrome/i;
    var _firefoxRegex = /firefox/i;
    var _operaRegex = /opera|opr/i;
    var _safariRegex = /safari/i;
    var _ucRegex = /ucbrowser/i;
    var _edgeRegex = /edge/i;
    var _winPhoneRegex = /windows phone/i;
    var _msieEq11Regex = /rv:11\.0/i;
    var _msieLt11Regex = /msie\s\d+\.\d+/i;


    var _isMobile = _mobileBrowserRegex.test(_currentBrowser);

    var _isChrome = _chromeRegex.test(_currentBrowser);
    var _isFirefox = _firefoxRegex.test(_currentBrowser);
    var _isOpera = _operaRegex.test(_currentBrowser);
    var _isSafari = _safariRegex.test(_currentBrowser);
    var _isbrowsuc = _ucRegex.test(_currentBrowser);
    var _isMicrosoftEdge = _edgeRegex.test(_currentBrowser);
    var _isWinPhone = _winPhoneRegex.test(_currentBrowser);
    var _isIE11 = _msieEq11Regex.test(_currentBrowser);
    var _isIELowThen11 = _msieLt11Regex.test(_currentBrowser);

    var _isIE = _isIE11 || _isIELowThen11;

    var _versionOfIE = _isIE ? _isIE11 ? _currentBrowser.match(_msieEq11Regex)[0] : _isIELowThen11 ? _currentBrowser.match(_msieLt11Regex)[0] : -1 : -1;
    if (_isIE) {
        try {
            if (_isIE11) {
                _versionOfIE = parseInt(_versionOfIE.substr(3).trim()); //IE 11
            } else {
                _versionOfIE = parseInt(_versionOfIE.substr(4).trim()); // < IE 11
            }
        } catch (error) {
            _currentBrowserIsCompatible = false;
        }
    }
    // of all _implementationDetails props only one is set to true, plus 'isMobile' is set to true if being runned under mobile browser
    var _implementationDetails = {
        notSupportedBrowserMessage: 'This library version does not support current browser yet',
        isMobile: _isMobile,
        chrome: _isChrome && _isSafari && !_isFirefox && !_isOpera && !_isMicrosoftEdge,
        firefox: _isFirefox && !_isChrome,
        opera: _isOpera && (_isChrome || _isOpera),
        safari: _isSafari && !_isChrome,
        uc: _isMobile && _isbrowsuc,
        microsoftEdge: _isMicrosoftEdge && (_isChrome || _isMicrosoftEdge),
        ie: _isIE && !_isChrome,
        currentBrowserIsCompatible: _currentBrowserIsCompatible,
        isWindowsPhone: _isWinPhone,

        removeUrlFragment: function () {
            setTimeout(removeUrlFragment_I_1L, 1);



            /**
             * Local helper functions
            */
            function removeUrlFragment_I_1L() {
                window.history.pushState("#", "", window.location.href.substring(0, window.location.href.length - window.location.hash.length));
            }
        },

        createRedirectionToMobileVersion: function (mobilePrefix) {
            return createRedirectionToMobileVersion_I_1L(mobilePrefix);
        },

        redirectToMobileVersion: function (mobilePrefix) {
            redirectToMobileVersion_I_1L(mobilePrefix);



            /**
             * Local helper functions
            */
            function redirectToMobileVersion_I_1L(mobilePrefix) {
                // create mobile url
                var mobileUrl = createRedirectionToMobileVersion_I_1L(mobilePrefix);

                // redirect to mobile site
                location.href = mobileUrl;
            }
        },

        createRedirectionToDesktopVersion: function () {
            return createRedirectionToDesktopVersion_I_1L();
        },

        redirectToDesktopVersion: function () {
            redirectToDesktopVersion_I_1L();



            /**
             * Local helper functions
            */
            function redirectToDesktopVersion_I_1L() {
                // create desktop url
                var desktopUrl = createRedirectionToDesktopVersion_I_1L();

                // redirect to desktop site
                location.href = desktopUrl;
            }
        },

        detectCompatibilityWithCurrentInternetExplorerVersion: function (currentInternetExplorerVersion) {
            return detectIfCurrentInternetExplorerVersionCanHandleThisPage_I_1L(currentInternetExplorerVersion);



            /**
             * Local helper functions
            */
            function detectIfCurrentInternetExplorerVersionCanHandleThisPage_I_1L(currentInternetExplorerVersion) {
                try {
                    if (!_implementationDetails.currentBrowserIsCompatible || _implementationDetails.ie && _implementationDetails.ieVersion < currentInternetExplorerVersion)
                        return false;
                    return true;
                } catch (error) {
                    return false;
                }
            }
        },

        checkMinAllowedResolution: function (width, height, minRatio, excludeSomeResolutions, resolutionsArray) {
            return checkMinAllowedResolution_I_1L(width, height, minRatio, excludeSomeResolutions, resolutionsArray);



            /**
             * Local helper functions
            */
            function checkMinAllowedResolution_I_1L(width, height, minRatio, excludeSomeResolutions, resolutionsArray) {
                var calculatedRatio = width / height;
                var ratio = Math.round(calculatedRatio * 100) / 100;

                if (ratio >= minRatio) {
                    if (excludeSomeResolutions) {
                        for (var i = 0; i < resolutionsArray.length; i += 2) {
                            if (width == resolutionsArray[i] && height == resolutionsArray[i + 1])
                                return false;
                        }
                    }
                    return true;
                }
                return false;
            }
        },

        checkMinAllowedResolution_2: function (width, height, excludeSomeResolutions, resolutionsArray) {
            return checkMinAllowedResolution_2_I_1L(width, height, excludeSomeResolutions, resolutionsArray);



            /**
             * Local helper functions
            */
            function checkMinAllowedResolution_2_I_1L(width, height, excludeSomeResolutions, resolutionsArray) {
                if (excludeSomeResolutions) {
                    for (var i = 0; i < resolutionsArray.length; i += 2) {
                        if (width == resolutionsArray[i] && height == resolutionsArray[i + 1])
                            return false;
                    }
                }
                return true;
            }
        },

        redirectToMobileVersionIfMobileBrowserDetected: function (mobilePrefix) {},

        displayMessageForNotSupportedBrowser: function (message) {
            return displayMessageForNotSupportedBrowser_I_3L(message);



            /**
             * Local helper function
            */
            function displayMessageForNotSupportedBrowser_I_3L(message) {
                document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + message + "</div>";
            }
        },

        checkRequirements: function (mobileVersionPrefix, disallowedResolutionsArray, ieVersion, notSupportedResolutionMessage) {
            return checkRequirements_I_1L(mobileVersionPrefix, disallowedResolutionsArray, ieVersion, notSupportedResolutionMessage);



            /**
             * Local helper functions
            */
            function checkRequirements_I_1L(mobileVersionPrefix, disallowedResolutionsArray, ieVersion, notSupportedResolutionMessage) {
                // redirect to mobile version in case of mobile browser
                if (_implementationDetails.isMobile) {
                    _implementationDetails.redirectToMobileVersion(mobileVersionPrefix);
                }

                /* check whether current browser can handle this page */
                var canHandle =
                    _implementationDetails.checkMinAllowedResolution_2(screen.width, screen.height, true, disallowedResolutionsArray) &&
                    _implementationDetails.detectCompatibilityWithCurrentInternetExplorerVersion(ieVersion);

                // if browser cannot handle this page display proper message
                if (!canHandle) {
                    _implementationDetails.displayMessageForNotSupportedBrowser(notSupportedResolutionMessage);
                    return false;
                }

                // notify the caller that there are no browser issues
                return true;
            }
        }
    };

    if (_isIE) {
        _implementationDetails.ieVersion = _versionOfIE;
    }

    function createRedirectionToMobileVersion_I_1L(mobilePrefix) {
        var mobileIndex = -1;

        mobileIndex = location.protocol.length;
        mobileIndex += 2;

        var mobileUrl = location.href.substring(0, mobileIndex) + mobilePrefix + location.href.substring(mobileIndex);
        return mobileUrl;
    }

    function createRedirectionToDesktopVersion_I_1L() {
        var desktopIndex = -1;

        desktopIndex = location.protocol.length;
        desktopIndex += 2;

        var desktopUrl = location.href.substring(0, desktopIndex) + location.href.substring(desktopIndex + 2);
        return desktopUrl;
    }



    // Expose module API to the outside world
    window.activeBrowser = window.activeBrowser || {};
    window.activeBrowser.browserUtility = window.activeBrowser.browserUtility || _implementationDetails;
})(window);