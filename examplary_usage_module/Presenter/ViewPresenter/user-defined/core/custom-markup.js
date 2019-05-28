/**
 * Custom Markup Processor
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

    var _RESOURCE_TYPE_OBJECT = {
        resourceType_URL: "url",

        resourceType_CLIP: "clip",

        resourceType_DOC: "doc",

        resourceType_PDF: "pdf",

        resourceType_IMAGE: "image",

        resourceType_ENTER: "enter",

        resourceType_IMAGE_URL: "image-url",

        resourceType_IMAGE_IMAGE: "image-image",

        resourceType_SINGLE_LINE: "single-line",

        resourceType_MULTI_LINE: "multi-line",

        resourceType_SPACE: "space",

        resourceType_ZIP: "zip"
    };

    var _CUSTOM_MARKUP_OBJECT = {

        ResourceType: {
            URL: _RESOURCE_TYPE_OBJECT.resourceType_URL,

            CLIP: _RESOURCE_TYPE_OBJECT.resourceType_CLIP,

            DOC: _RESOURCE_TYPE_OBJECT.resourceType_DOC,

            PDF: _RESOURCE_TYPE_OBJECT.resourceType_PDF,

            IMAGE: _RESOURCE_TYPE_OBJECT.resourceType_IMAGE,

            ENTER: _RESOURCE_TYPE_OBJECT.resourceType_ENTER,

            IMAGE_URL: _RESOURCE_TYPE_OBJECT.resourceType_IMAGE_URL,

            IMAGE_IMAGE: _RESOURCE_TYPE_OBJECT.resourceType_IMAGE_IMAGE,

            SINGLE_LINE: _RESOURCE_TYPE_OBJECT.resourceType_SINGLE_LINE,

            MULTI_LINE: _RESOURCE_TYPE_OBJECT.resourceType_MULTI_LINE,

            SPACE: _RESOURCE_TYPE_OBJECT.resourceType_SPACE,

            ZIP: _RESOURCE_TYPE_OBJECT.resourceType_ZIP
        },

        Transformation: {
            urlTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                url_value_array: [],
                url_display_text_array: [],

                url_regex: /\[url:.+?\]/g,
                url_css_attributes: ["class", "blogUrl"],

                url_onclick_method: null,
                url_store_onclick_method: function (onclick_method) {
                    this.url_onclick_method = onclick_method;
                },
                url_invoke_onclick_method: function (id) {
                    this.url_onclick_method(this.url_value_array[id]);
                }
            },

            clipTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                clip_value_array: [],
                clip_display_text_array: [],

                clip_regex: /\[clip:.+?\]/g,
                clip_css_attributes: ["class", "blogClip"],

                clip_onclick_method: null,
                clip_store_onclick_method: function (onclick_method) {
                    this.clip_onclick_method = onclick_method;
                },
                clip_invoke_onclick_method: function (id) {
                    this.clip_onclick_method(this.clip_value_array[id]);
                }
            },

            docTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                doc_value_array: [],
                doc_display_text_array: [],

                doc_regex: /\[doc:.+?\]/g,
                doc_css_attributes: ["class", "blogDoc"],

                doc_onclick_method: null,
                doc_store_onclick_method: function (onclick_method) {
                    this.doc_onclick_method = onclick_method;
                },
                doc_invoke_onclick_method: function (id) {
                    this.doc_onclick_method(this.doc_value_array[id]);
                }
            },

            pdfTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                pdf_value_array: [],
                pdf_display_text_array: [],

                pdf_regex: /\[pdf:.+?\]/g,
                pdf_css_attributes: ["class", "blogPdf"],

                pdf_onclick_method: null,
                pdf_store_onclick_method: function (onclick_method) {
                    this.pdf_onclick_method = onclick_method;
                },
                pdf_invoke_onclick_method: function (id) {
                    this.pdf_onclick_method(this.pdf_value_array[id]);
                }
            },

            imageTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                image_value_array: [],
                image_display_text_array: [],

                image_regex: /\[image:.+?\]/g,
                image_css_attributes: ["class", "blogImage"],

                image_onclick_method: null,
                image_store_onclick_method: function (onclick_method) {
                    this.image_onclick_method = onclick_method;
                },
                image_invoke_onclick_method: function (id) {
                    this.image_onclick_method(this.image_value_array[id]);
                }
            },

            enterTransformations: {
                resourceType: "",

                enter_regex: /\[enter:.+?\]/g,
                enter_css_attributes: []
            },

            imageUrlTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                imageUrl_value_array: [],
                imageUrl_display_text_array: [],

                imageUrl_regex: /\[image-url:.+?\]/g,
                imageUrl_css_attributes: ["class", "blogImageUrl"],

                imageUrl_onclick_method: null,
                imageUrl_store_onclick_method: function (onclick_method) {
                    this.imageUrl_onclick_method = onclick_method;
                },
                imageUrl_invoke_onclick_method: function (id) {
                    this.imageUrl_onclick_method(this.imageUrl_value_array[id]);
                }
            },

            imageImageTransformations: {
                resourceType: "",

                imageImage_regex: /\[image-image:.+?\]/g,
                imageImage_css_attributes: ["class", "blogImageImage"]
            },

            singleLineTransformations: {
                resourceType: "",

                singleLine_regex: /\[single-line:.+?\]/g,
                singleLine_css_attributes: ["class", "blogSingleLine"]
            },

            multiLineTransformations: {
                resourceType: "",

                multiLine_regex: /\[multi-line:.+?\]/g,
                multiLine_css_attributes: ["class", "blogMultiLine"]
            },

            spaceTransformations: {
                resourceType: "",

                space_regex: /\[space:.+?\]/g,
                space_css_attributes: []
            },

            zipTransformations: {
                next_id: 0,
                getNextId: function () {
                    return this.next_id++;
                },

                resourceType: "",

                zip_value_array: [],
                zip_display_text_array: [],

                zip_regex: /\[zip:.+?\]/g,
                zip_css_attributes: ["class", "blogZip"],

                zip_onclick_method: null,
                zip_store_onclick_method: function (onclick_method) {
                    this.zip_onclick_method = onclick_method;
                },
                zip_invoke_onclick_method: function (id) {
                    this.zip_onclick_method(this.zip_value_array[id]);
                }
            },

            validate: function () {
                var valid =
                    this.urlTransformations.url_css_attributes.length % 2 == 0 &&
                    this.clipTransformations.clip_css_attributes.length % 2 == 0 &&
                    this.docTransformations.doc_css_attributes.length % 2 == 0 &&
                    this.pdfTransformations.pdf_css_attributes.length % 2 == 0 &&
                    this.imageTransformations.image_css_attributes.length % 2 == 0 &&
                    this.enterTransformations.enter_css_attributes.length % 2 == 0 &&
                    this.imageUrlTransformations.imageUrl_css_attributes.length % 2 == 0 &&
                    this.imageImageTransformations.imageImage_css_attributes.length % 2 == 0 &&
                    this.singleLineTransformations.singleLine_css_attributes.length % 2 == 0 &&
                    this.multiLineTransformations.multiLine_css_attributes.length % 2 == 0 &&
                    this.spaceTransformations.space_css_attributes.length % 2 == 0 &&
                    this.zipTransformations.zip_css_attributes.length % 2 == 0;


                if (valid !== true) {
                    throw Error("Transformation Object did not pass the validation! Each transformation CSS attribute has to have a value!");
                }
            }
        },

        ActionHandler: {
            URL: {
                handleUrl: function (url) {
                    return download_I_1L(url);
                }
            },

            CLIP: {
                handleClip: function (url) {
                    return download_I_1L(url);
                }
            },

            DOC: {
                handleDoc: function (url) {
                    return download_I_1L(url);
                }
            },

            PDF: {
                handlePdf: function (url) {
                    return download_I_1L(url);
                }
            },

            IMAGE: {
                handleImage: function (url) {
                    return download_I_1L(url);
                }
            },

            ZIP: {
                handleZip: function (url) {
                    return download_I_1L(url);
                }
            }
        },

        Converter: {
            CustomMarkup: {
                convertToHTML: function (text_line) {
                    return convert_CustomMarkup_to_HTML_Markup_I_1L(text_line);
                }
            }
        }
    };

    /* ~ private variables */


    /* private functions */

    function download_I_1L(url) {
        window.open(url, "_blank");
    }

    function convert_CustomMarkup_to_HTML_Markup_I_1L(text_line) {
        var index;
        var element;
        var matchValue;

        var url_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.url_regex);
        if (url_match !== null) {
            for (index = 0; index < url_match.length; index++) {
                element = url_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.URL;
                _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.url_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.url_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.url_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.URL.handleUrl
                );

                var url_id = _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.resourceType,
                    text_line,
                    element,
                    url_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.urlTransformations.url_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.url_display_text_array[url_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.urlTransformations.url_css_attributes
                );
            }
        }

        var clip_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.clip_regex);
        if (clip_match !== null) {
            for (index = 0; index < clip_match.length; index++) {
                element = clip_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.CLIP;
                _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.clip_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.clip_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.clip_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.CLIP.handleClip
                );

                var clip_id = _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.resourceType,
                    text_line,
                    element,
                    clip_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.clipTransformations.clip_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.clip_display_text_array[clip_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.clipTransformations.clip_css_attributes
                );
            }
        }

        var doc_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.doc_regex);
        if (doc_match !== null) {
            for (index = 0; index < doc_match.length; index++) {
                element = doc_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.DOC;
                _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.doc_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.doc_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.doc_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.DOC.handleDoc
                );

                var doc_id = _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.resourceType,
                    text_line,
                    element,
                    doc_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.docTransformations.doc_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.doc_display_text_array[doc_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.docTransformations.doc_css_attributes
                );
            }
        }

        var pdf_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.pdf_regex);
        if (pdf_match !== null) {
            for (index = 0; index < pdf_match.length; index++) {
                element = pdf_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.PDF;
                _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.pdf_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.pdf_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.pdf_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.PDF.handlePdf
                );

                var pdf_id = _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.resourceType,
                    text_line,
                    element,
                    pdf_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.pdfTransformations.pdf_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.pdf_display_text_array[pdf_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.pdfTransformations.pdf_css_attributes
                );
            }
        }

        var image_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.image_regex);
        if (image_match !== null) {
            for (index = 0; index < image_match.length; index++) {
                element = image_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.IMAGE;
                _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.image_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.image_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.image_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.IMAGE.handleImage
                );

                var image_id = _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.resourceType,
                    text_line,
                    element,
                    image_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.imageTransformations.image_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.image_display_text_array[image_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageTransformations.image_css_attributes
                );
            }
        }

        var enter_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.enterTransformations.enter_regex);
        if (enter_match !== null) {
            for (index = 0; index < enter_match.length; index++) {
                element = enter_match[index];

                _CUSTOM_MARKUP_OBJECT.Transformation.enterTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.ENTER;

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.enterTransformations.resourceType,
                    text_line,
                    element,
                    -1,
                    null,
                    null,
                    _CUSTOM_MARKUP_OBJECT.Transformation.enterTransformations.enter_css_attributes
                );
            }
        }

        var imageUrl_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.imageUrl_regex);
        if (imageUrl_match !== null) {
            for (index = 0; index < imageUrl_match.length; index++) {
                element = imageUrl_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.IMAGE_URL;
                _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.imageUrl_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.imageUrl_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.imageUrl_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.URL.handleUrl
                );

                var imageUrl_id = _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.resourceType,
                    text_line,
                    element,
                    imageUrl_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.imageUrlTransformations.imageUrl_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.imageUrl_display_text_array[imageUrl_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageUrlTransformations.imageUrl_css_attributes
                );
            }
        }

        var imageImage_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.imageImageTransformations.imageImage_regex);
        if (imageImage_match !== null) {
            for (index = 0; index < imageImage_match.length; index++) {
                element = imageImage_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.imageImageTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.IMAGE_IMAGE;

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageImageTransformations.resourceType,
                    text_line,
                    element,
                    -1,
                    null,
                    matchValue.value,
                    _CUSTOM_MARKUP_OBJECT.Transformation.imageImageTransformations.imageImage_css_attributes
                );
            }
        }

        var singleLine_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.singleLineTransformations.singleLine_regex);
        if (singleLine_match !== null) {
            for (index = 0; index < singleLine_match.length; index++) {
                element = singleLine_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.singleLineTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.SINGLE_LINE;

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.singleLineTransformations.resourceType,
                    text_line,
                    element,
                    -1,
                    null,
                    matchValue.value,
                    _CUSTOM_MARKUP_OBJECT.Transformation.singleLineTransformations.singleLine_css_attributes
                );
            }
        }

        var multiLine_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.multiLineTransformations.multiLine_regex);
        if (multiLine_match !== null) {
            for (index = 0; index < multiLine_match.length; index++) {
                element = multiLine_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.multiLineTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.MULTI_LINE;

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.multiLineTransformations.resourceType,
                    text_line,
                    element,
                    -1,
                    null,
                    matchValue.value,
                    _CUSTOM_MARKUP_OBJECT.Transformation.multiLineTransformations.multiLine_css_attributes
                );
            }
        }

        var space_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.spaceTransformations.space_regex);
        if (space_match !== null) {
            for (index = 0; index < space_match.length; index++) {
                element = space_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.spaceTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.SPACE;

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.spaceTransformations.resourceType,
                    text_line,
                    element,
                    -1,
                    null,
                    matchValue.value,
                    _CUSTOM_MARKUP_OBJECT.Transformation.spaceTransformations.space_css_attributes
                );
            }
        }

        var zip_match = text_line.match(_CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.zip_regex);
        if (zip_match !== null) {
            for (index = 0; index < zip_match.length; index++) {
                element = zip_match[index];

                matchValue = getMatchValue_I_2L(element);

                _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.resourceType = _CUSTOM_MARKUP_OBJECT.ResourceType.ZIP;
                _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.zip_value_array.push(matchValue.value);
                _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.zip_display_text_array.push(matchValue.displayText);

                _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.zip_store_onclick_method(
                    _CUSTOM_MARKUP_OBJECT.ActionHandler.ZIP.handleZip
                );

                var zip_id = _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.getNextId();

                text_line = convert_Placeholder_into_Real_Tags_I_2L(
                    _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.resourceType,
                    text_line,
                    element,
                    zip_id,
                    // access via public API only
                    "customMarkupAPI.GET_MARKUP_API.Transformation.zipTransformations.zip_invoke_onclick_method",
                    _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.zip_display_text_array[zip_id],
                    _CUSTOM_MARKUP_OBJECT.Transformation.zipTransformations.zip_css_attributes
                );
            }
        }

        // return HTML5-capable line of code
        return text_line;



        /**
         * Local helper functions
        */
        function getMatchValue_I_2L(match) {
            var result = match.substring(match.indexOf(": ") + 1, match.indexOf("]"));
            result = result.split(';');

            return {
                value: result[0].trim(),
                displayText: result[1].trim()
            };
        }

        function convert_Placeholder_into_Real_Tags_I_2L(
            resourceType,
            text_line,
            match_to_be_replaced,
            displayText_id,
            onclick_method,
            displayText,
            css_attributes_array
        ) {
            if (
                resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.URL ||
                resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.CLIP ||
                resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.DOC ||
                resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.PDF ||
                resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.IMAGE ||
                resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.ZIP
            ) {
                var index;
                var divTag;

                // create HTML "a" tag
                var aTag = "<a ";

                for (index = 0; index < css_attributes_array.length; index += 2) {
                    aTag += css_attributes_array[index] + "=" + "\"" + css_attributes_array[index + 1] + "\"" + " ";
                }

                // add onclick event
                aTag += "onclick=" + "\"" + onclick_method + "(" + displayText_id + ")" + "\"";

                // add display text and close HTML "a" tag
                aTag += ">";
                aTag += displayText;
                aTag += "</a>";


                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, aTag);
            } else if (resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.ENTER) {
                // create HTML "br" tag
                var brTag = "<br ";

                for (index = 0; index < css_attributes_array.length; index += 2) {
                    brTag += css_attributes_array[index] + "=" + "\"" + css_attributes_array[index + 1] + "\"" + " ";
                }

                // close HTML "a" tag
                brTag += " />";


                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, brTag);
            } else if (resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.IMAGE_URL) {
                // create HTML "a" tag
                aTag = "<a ";

                for (index = 0; index < css_attributes_array.length; index += 2) {
                    aTag += css_attributes_array[index] + "=" + "\"" + css_attributes_array[index + 1] + "\"" + " ";
                }

                // add onclick event
                aTag += "onclick=" + "\"" + onclick_method + "(" + displayText_id + ")" + "\"";

                // add display text (path to image in this case) and close HTML "a" tag
                aTag += ">";

                // add img tag
                aTag += "<img src=\"" + displayText + "\"" + "></img>";

                aTag += "</a>";


                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, aTag);
            } else if (resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.IMAGE_IMAGE) {
                // create HTML "div" tag
                divTag = "<div ";

                for (index = 0; index < css_attributes_array.length; index += 2) {
                    divTag += css_attributes_array[index] + "=" + "\"" + css_attributes_array[index + 1] + "\"" + " ";
                }

                // close opening "div" tag
                divTag += ">";

                // add img tag
                divTag += "<img src=\"" + displayText + "\"" + "></img>";

                divTag += "</div>";


                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, divTag);
            } else if (resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.SINGLE_LINE) {
                // create HTML "span" tag
                var spanTag = "<span ";

                for (index = 0; index < css_attributes_array.length; index += 2) {
                    spanTag += css_attributes_array[index] + "=" + "\"" + css_attributes_array[index + 1] + "\"" + " ";
                }

                // add display text and close HTML "span" tag
                spanTag += ">";
                spanTag += displayText;
                spanTag += "</span>";


                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, spanTag);
            } else if (resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.MULTI_LINE) {
                // create HTML "div" tag
                divTag = "<div ";

                for (index = 0; index < css_attributes_array.length; index += 2) {
                    divTag += css_attributes_array[index] + "=" + "\"" + css_attributes_array[index + 1] + "\"" + " ";
                }

                // add display text and close HTML "div" tag
                divTag += ">";
                divTag += displayText;
                divTag += "</div>";


                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, divTag);
            } else if (resourceType === _CUSTOM_MARKUP_OBJECT.ResourceType.SPACE) {
                // define HTML "space" code
                var spaceHTMLCode = "&nbsp;";
                // define HTML "space" string
                var spaceString = "";


                for (index = 0; index < parseInt(displayText); index += 1) {
                    spaceString += spaceHTMLCode;
                }

                // do actual placeholder replacement
                text_line = text_line.replace(match_to_be_replaced, spaceString);
            } else {
                throw Error("Unsupported type of resource: [" + resourceType + "] !");
            }

            return text_line;
        }
    }

    /* ~ private functions */



    /* Public API */

    self.GET_MARKUP_API = _CUSTOM_MARKUP_OBJECT;

    /** ~ Public API */



    // Expose module API to the outside world
    window.customMarkupAPI = window.customMarkupAPI || self;
})(window);