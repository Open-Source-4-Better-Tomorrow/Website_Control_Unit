/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */

/**
 * Module Task Library
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




    /* private methods */

    function loadDynamicallyContent_I_1L(itemPath, callback) {
        if (typeof (Storage) !== "undefined") {
            var xhr = createXmlHttpRequest_I_2L("", callback, false);

            xhr.open("GET", itemPath, true);
            xhr.send(null);
        }



        /**
         * Local helper functions
        */
        function createXmlHttpRequest_I_2L(itemNameForLaterAccess, callback, doCache) {
            // create request
            var xhr = new XMLHttpRequest();

            // store custom variable into request
            xhr.itemNameForLaterAccess = itemNameForLaterAccess;

            // handle request flow change
            xhr.onreadystatechange = function () {
                try {
                    if (this.status == 200 && this.readyState == 4) {
                        if (doCache) {
                            sessionStorage.setItem(this.itemNameForLaterAccess, this.responseText);
                            callback();
                        } else {
                            callback(this.responseText);
                        }
                    }
                } catch (error) {}
            };

            return xhr;
        }
    }

    function processNewsFromFlatFile_I_1L(
        storageData,
        parentContainerCssClass,
        mainContainerCssClass,
        creationDateCssClassName,
        contentCssClassName,
        customMarkupAPI
    ) {
        // extract only up to date news
        var upToDateNewsArray = extractOnlyUpToDateNews_I_2L(storageData);

        // process all up to date news and load them into DOM
        loadUpToDateNewsIntoDOM_I_2L(upToDateNewsArray);



        /**
         * Local helper functions
        */
        function extractOnlyUpToDateNews_I_2L(rawData) {
            // array holding up to date news
            var upToDateNewsArray = [];

            var emptyString = "";
            var numberOfDaysBehind = 2;
            var numberOfDaysAhead = 15;

            // extract all news into array
            var dataObjectArray = rawData.split("},");
            // determine number of news
            var dataObjectArrayLength = dataObjectArray.length;

            // extract only news that are up to date
            for (var i = 0; i < dataObjectArrayLength; i++) {
                // extract current news' raw content
                var dataEntryArray = dataObjectArray[i].replace("{", emptyString).replace("}", emptyString).split("\n");

                // remove irrelevant stuff
                dataEntryArray = removeEmptyArrayItems_I_3L(dataEntryArray);

                // determine number of lines in this news
                var dataEntryArrayLength = dataEntryArray.length;

                // check if this news is up to date. If not, skip it
                if (dataEntryArrayLength) {
                    // first line contains news' date
                    var givenDate = dataEntryArray[0];

                    // is up to date ?
                    var isUpToDate = isDateWithinRange_I_1L(givenDate, numberOfDaysBehind, numberOfDaysAhead);
                    if (isUpToDate) {
                        upToDateNewsArray.push(dataEntryArray);
                    }
                }
            }

            // return all news that are up to date
            return upToDateNewsArray;



            /**
             * Local helper functions
            */

            // remove empty items in an array
            function removeEmptyArrayItems_I_3L(inputArray) {
                var outputArray = [];

                var outputArrayIndex = -1;
                for (var indexStart = 0; indexStart < inputArray.length; indexStart++) {
                    if (validateAgainstNonPrintableChars_I_4L(inputArray[indexStart])) {
                        outputArray.push(null);
                        outputArrayIndex += 1;
                        outputArray[outputArrayIndex] = inputArray[indexStart];
                    }
                }

                return outputArray;



                /**
                 * Local helper functions
                */
                function validateAgainstNonPrintableChars_I_4L(inputString) {
                    if (inputString.length == 0)
                        return false;
                    if (inputString.length == 1 && (inputString.charCodeAt(0) == 13 || inputString.charCodeAt(0) == 10))
                        return false;

                    return true;
                }
            }
        }

        function loadUpToDateNewsIntoDOM_I_2L(onlyUpToDateNewsArray) {
            var newsMainDiv;
            var newsContentDiv;
            var newsContent_innerHTML;

            if (onlyUpToDateNewsArray.length === 0) {
                // create div main container for this news
                newsMainDiv = $("<div id=\"" + mainContainerCssClass + "_" + i + "\" class=\"" + mainContainerCssClass + "\" />");

                // create sub div content container for this news
                newsContentDiv = $("<div id=\"" + contentCssClassName + "_" + i + "\" class=\"" + contentCssClassName + "\" />");
                newsContent_innerHTML = ["No news today !"];

                // inject news' HTML into its div container
                $(newsContentDiv).prop("innerHTML", newsContent_innerHTML.join(""));

                // connect all divs together - append entry (no news this time) to the collection
                $(newsMainDiv).append(newsContentDiv);

                $(parentContainerCssClass).append(newsMainDiv);

                return;
            }

            for (var i = onlyUpToDateNewsArray.length - 1; i >= 0; i--) {

                // create div main container for this news
                newsMainDiv = $("<div id=\"" + mainContainerCssClass + "_" + i + "\" class=\"" + mainContainerCssClass + "\" />");

                // create sub div creation date container for this news
                var newsCreationDateDiv = $("<div id=\"" + creationDateCssClassName + "_" + i + "\" class=\"" + creationDateCssClassName + "\" />");

                // create sub div content container for this news
                newsContentDiv = $("<div id=\"" + contentCssClassName + "_" + i + "\" class=\"" + contentCssClassName + "\" />");
                newsContent_innerHTML = [];


                // get current news
                var currentNews = onlyUpToDateNewsArray[i];

                // determine number of lines in this news
                var numberOfLinesInCurrentNews = currentNews.length;


                // process all lines of current entry (one single news)
                for (var j = 0; j < numberOfLinesInCurrentNews; j++) {
                    if (j == 0) {
                        $(newsCreationDateDiv).prop("innerHTML", currentNews[j]);
                    } else {
                        var contentLineDiv = customMarkupAPI.GET_MARKUP_API.Converter.CustomMarkup.convertToHTML(currentNews[j]);
                        newsContent_innerHTML.push(contentLineDiv);
                    }
                }
                // inject news' HTML into its div container
                $(newsContentDiv).prop("innerHTML", newsContent_innerHTML.join(""));

                // connect all divs together - append entry (any single news) to the collection (all news)
                $(newsMainDiv).append(newsCreationDateDiv);
                $(newsMainDiv).append(newsContentDiv);

                $(parentContainerCssClass).append(newsMainDiv);
            }
        }
    }

    function processNewsFromDatabase_I_1L(
        storageData,
        parentContainerCssClass,
        contentCssClassName,
        creationDateCssClassName,
        customMarkupAPI
    ) {


    }

    function processNewsFromService_I_1L(
        storageData,
        parentContainerCssClass,
        contentCssClassName,
        creationDateCssClassName,
        customMarkupAPI
    ) {


    }

    function isDateWithinRange_I_1L(givenDate, numberOfDaysBehind, numberOfDaysAhead) {
        // remove "enters"
        givenDate = givenDate.replace("\r", "");
        givenDate = givenDate.replace("\n", "");

        // convert to Date object
        givenDate = new Date(givenDate);

        /**
         * Set date that is equal to [numberOfDaysBehind] days behind.
         * [numberOfDaysBehind] days multiplied by 24 hours per each day gives the desired number of hours behind)
        */
        var pastDate = new Date();
        pastDate.setHours(-numberOfDaysBehind * 24, 0, 0, 0);

        /**
         * Set date that is equal to [numberOfDaysAhead] days ahead.
         * [numberOfDaysAhead] days multiplied by 24 hours per each day gives the desired number of hours ahead)
        */
        var futureDate = new Date();
        futureDate.setHours(numberOfDaysAhead * 24, 0, 0, 0);

        // check if date of news is valid (greater than or equal to today, but not more than [numberOfDaysAhead] days ahead)
        if (givenDate > pastDate && givenDate < futureDate)
            return true;

        return false;
    }

    /* ~ private methods */



    /* Public API */

    self.loadDynamicallyContent = function (itemPath, callback) {
        return loadDynamicallyContent_I_1L(itemPath, callback);
    };

    self.processNewsFromFlatFile = function (
        storageData,
        parentContainerCssClass,
        mainContainerCssClass,
        creationDateCssClassName,
        contentCssClassName,
        customMarkupAPI
    ) {
        return processNewsFromFlatFile_I_1L(
            storageData,
            parentContainerCssClass,
            mainContainerCssClass,
            creationDateCssClassName,
            contentCssClassName,
            customMarkupAPI
        );
    };

    self.processNewsFromDatabase = function (
        storageData,
        parentContainerCssClass,
        mainContainerCssClass,
        creationDateCssClassName,
        contentCssClassName,
        customMarkupAPI
    ) {
        return processNewsFromDatabase_I_1L(
            storageData,
            parentContainerCssClass,
            mainContainerCssClass,
            creationDateCssClassName,
            contentCssClassName,
            customMarkupAPI
        );
    };

    self.processNewsFromService = function (
        storageData,
        parentContainerCssClass,
        mainContainerCssClass,
        creationDateCssClassName,
        contentCssClassName,
        customMarkupAPI
    ) {
        return processNewsFromService_I_1L(
            storageData,
            parentContainerCssClass,
            mainContainerCssClass,
            creationDateCssClassName,
            contentCssClassName,
            customMarkupAPI
        );
    };

    self.isDateWithinRange = function (givenDate, numberOfDaysBehind, numberOfDaysAhead) {
        return isDateWithinRange_I_1L(givenDate, numberOfDaysBehind, numberOfDaysAhead);
    };

    /* ~ Public API */



    // Expose module API to the outside world
    window.jsUtilities = window.jsUtilities || self;
})(window);