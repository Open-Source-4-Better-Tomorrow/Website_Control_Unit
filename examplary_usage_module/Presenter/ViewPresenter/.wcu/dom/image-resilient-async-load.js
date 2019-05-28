/*
 * Image Resilient Async Load Library
 *
 * 
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 * 
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function(window) {

    /* private variables */
    
    var _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY = {
        Loader : {
            // Loader-wide global object that holds already-indexed images in DOM
            _global_broken_images_in_DOM : [],

            // settings
            _internals_ : {
                // define standard id attribute
                id_attr : "id",
                // define custom data-image-id attribute
                dataImageId_atrr : "data-image-id",
                
                // interval, after which to try to reload the broken resource
                scheduledReloadTimeout : 2000,
                indexedImagesMaxId : 0,

                lastNewImageIndexed_Callback : function(array_of_indexed_images) {
                    _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._global_broken_images_in_DOM.push.apply(
                                                                                                                    _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._global_broken_images_in_DOM,
                                                                                                                    array_of_indexed_images
                                                                                                                    );
                }
            },

            loadAsync : function(checkAutomaticallyForNewImages) {
                return indexImagesUsedInDOM_and_ManageResilientLoadProcess_I_1L(checkAutomaticallyForNewImages);



                /**
                 * Local helper functions
                */
                function indexImagesUsedInDOM_and_ManageResilientLoadProcess_I_1L(checkAutomaticallyForNewImages) {
                    // array holding all images used in DOM
                    var broken_images_in_DOM = [];

                    // index classic IMG images
                    indexImagesDefinedWith_IMG_Tag_I_2L();

                    // index images used as backgrounds
                    indexImagesDefinedWith_CSS_BackgroundImage_Property_I_2L();

                    //notify that all new images were indexed
                    notifyThatAllNewImagesWereIndexed_I_2L();

                    // run self-managing broken image load process
                    triggerBrokenImagesResilientLoad_I_2L();

                    // check if schedule automatic changes detection
                    if(checkAutomaticallyForNewImages)
                        scheduleAutomaticChangesDetection_I_2L();                    


                    
                    /**
                     * Local helper functions
                    */
                    function indexImagesDefinedWith_IMG_Tag_I_2L() {
                        // get all new classic images found in DOM
                        var all_new_classic_images_in_DOM = getOnlyNewClassicImagesInDOM_I_3L();

                        // iterate over all images
                        for(var i = 0; i < all_new_classic_images_in_DOM.length; i++) {
                            // get current image
                            var img = all_new_classic_images_in_DOM[i];
                            
                            // position image object internally within 'all_new_classic_images_in_DOM' global array
                            img = extend_HTML_Tag_with_additional_attributes_I_2L(i + _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.indexedImagesMaxId, img);

                            //check if it is a broken one 
                            var isBroken = isImageBroken_I_3L(img);
                            
                            // index the image only if it is broken, so that we can attempt to reload it 
                            if(isBroken) {
                                // serialize HTML node core props
                                var html_custom_node = {
                                    tagName : img.localName,
                                    id : img.id,
                                    className : img.className,
                                    src : img.src
                                };
                                
                                /**
                                 * Index this image as a broken one.
                                 * At this line of code we don't know whether there are any new background images in internal and/or external stylesheets,
                                 * therefore last parameter of the following method is set to false.
                                */
                                createCustomImageObject_I_2L(true, html_custom_node, null, isBroken, false);
                            }
                        }

                        // set the current max id of indexed classic images
                        _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.indexedImagesMaxId += all_new_classic_images_in_DOM.length;



                        /**
                         * Local helper functions
                        */
                        function getOnlyNewClassicImagesInDOM_I_3L() {
                            // only new (not already indexed) classic images since last indexation time
                            var all_new_classic_images = [];

                            // all images found in DOM
                            var all_found_classic_images = document.images;
                            
                            var classic_image;
                            // filter out only new images
                            for(var i = 0, length = all_found_classic_images.length; i < length; i++) {
                                // get current classic image
                                classic_image = all_found_classic_images[i];
                                
                                // check the attribute
                                if(!classic_image.hasAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.dataImageId_atrr))
                                    all_new_classic_images.push(classic_image);
                            }

                            // return all new classic images found in DOM
                            return all_new_classic_images;
                        }

                        function isImageBroken_I_3L(img) {
                            /**
                            They do have two very useful properties: naturalWidth and naturalHeight.
                            These give the true size of the image. If it failed to load, either of these should be zero.
                            */
                            if(typeof img.naturalWidth != "undefined" && typeof img.naturalHeight != "undefined" && img.naturalWidth == 0 && img.naturalHeight == 0) {
                                return true;
                            }

                            /**
                            However, during the onload event, IE correctly identifies any images that weren't downloaded as not complete.
                            Others should too. Gecko-based browsers act like NS4 in that they report this incorrectly.
                            */
                            if(img.complete) {
                                return false;
                            }

                            // no other way of checking: assume it's ok.
                            return false;
                        }
                    }

                    function indexImagesDefinedWith_CSS_BackgroundImage_Property_I_2L() {
                        // array of tags to skip
                        var reserved_html_node_array = ["HTML", "HEAD", "META", "SCRIPT", "BR", "IMG"];

                        // access all DOM's tags
                        var tags = document.getElementsByTagName('*');
                        var privilagedTags = [];
                        var matchedTags = [];
                        var html_node;

                        // filter only privilaged DOM nodes
                        for (var i = 0, length_all = tags.length; i < length_all; i++) {
                            // get current node
                            html_node = tags[i];
                            
                            // check if not reserved node. If so, skip it.
                            if(reserved_html_node_array.indexOf(html_node.nodeName) < 0) {
                                privilagedTags.push(html_node);
                            }
                        }

                        // reset temp variable
                        html_node = null;


                        // iterate over all valid DOM nodes
                        for(var j = 0, length_valid = privilagedTags.length; j < length_valid; j++) {
                            // get current node
                            html_node = privilagedTags[j];

                            var backgroundImage;
                            // check if style is associated with this node...
                            if (html_node.currentStyle) {
                                // compute background image
                                backgroundImage = html_node.currentStyle['backgroundImage'];
                                // if in this style is defined background image...
                                if(backgroundImage !== 'none') {
                                    selectMatchedTag_I_3L(false, html_node, backgroundImage);
                                }
                            }
                            // otherwise check computed style associated with this node
                            else if (window.getComputedStyle) {
                                // compute background image
                                backgroundImage = document.defaultView.getComputedStyle(html_node, null).getPropertyValue('background-image');
                                // if in this style is defined background image...
                                if(backgroundImage !== 'none') {
                                    selectMatchedTag_I_3L(false, html_node, backgroundImage);
                                }
                            }
                        }

                        // reset temp variable
                        html_node = null;


                        // iterate over all matched DOM nodes
                        for(var k = 0, length_matched = matchedTags.length; k < length_matched; k++) {
                            // get current node
                            html_node = matchedTags[k];

                            // convert to image tag to handle load/error process
                            convertToImage_I_3L(html_node.isClassicIMG, html_node.html_node, html_node.backgroundImage);
                        }



                        /**
                         * Local helper functions
                        */
                        function selectMatchedTag_I_3L(isClassicIMG, html_node, backgroundImage) {
                            // only new (not already indexed) HTML nodes with background images since last indexation time
                            if(!html_node.hasAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.dataImageId_atrr)) {
                                // create custom tag object
                                var matchedTagMetadata = {
                                    isClassicIMG : isClassicIMG,
                                    html_node : html_node,
                                    backgroundImage : backgroundImage
                                };

                                // store into array of tags to be analyzed
                                matchedTags.push(matchedTagMetadata);

                                // add custom image-id attribute to this node to mark it as indexed
                                html_node = extend_HTML_Tag_with_additional_attributes_I_2L(
                                                                                            _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.indexedImagesMaxId + matchedTags.length - 1,
                                                                                            html_node
                                                                                           );
                            }
                        }

                        function convertToImage_I_3L(isClassicIMG, html_node, backgroundImageUrl) {
                            // serialize HTML node core props
                            var html_custom_node = {
                                tagName : html_node.localName,
                                id : html_node.id,
                                className : html_node.className
                            };

                            // convert to valid url
                            backgroundImageUrl = backgroundImageUrl.replace("url(", "").replace(")", "").replace("\\", "").replace("\"", "").replace("\\", "").replace("\"", "");

                            // index this image as a broken one
                            createCustomImageObject_I_2L(isClassicIMG, html_custom_node, backgroundImageUrl, true);
                        }
                    }

                    function notifyThatAllNewImagesWereIndexed_I_2L() {
                        _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.lastNewImageIndexed_Callback(broken_images_in_DOM);                            
                    }

                    function triggerBrokenImagesResilientLoad_I_2L() {
                        // iterate over all broken nodes and trigger load process of each of them
                        for(var i = 0; i < broken_images_in_DOM.length; i++) {
                            // trigger load process of current broken image
                            triggerBrokenImageWorker_I_3L(i, broken_images_in_DOM[i]);
                        }



                        /**
                         * Local helper functions
                        */
                        function triggerBrokenImageWorker_I_3L(brokenImageIndex, customBrokenImageObject) {
                            // creat image tag
                            var brokenImageWorker = document.createElement("img");
                            brokenImageWorker.setAttribute("data-custom-worker-id", brokenImageIndex);
                            brokenImageWorker.setAttribute("data-custom-broken-image-object", JSON.stringify(customBrokenImageObject));

                            // define onload handler
                            brokenImageWorker.onload = function() {
                                // reference function execution context
                                var self = this;
                                
                                // recreate custom broken image object
                                var cbio = JSON.parse(self.dataset.customBrokenImageObject);

                                if(cbio.isClassicIMG) {
                                    // set the source of this classic image (IMG)
                                    document.getElementById(cbio.classicIMG.id).src = cbio.classicIMG.src;
                                }
                                else {
                                    // get id of the node if defined
                                    var id = cbio.HTML_node.id;
                                    // get CSS class of the node if defined
                                    var cssClass = cbio.HTML_node.className;
                                    
                                    // access node by id...
                                    if(id) {
                                        // and set its background image
                                        document.getElementById(id).style.backgroundImage = 'url(' + self.src + ')';
                                    }
                                    // ...otherwise access node by CSS class
                                    else if(cssClass) {
                                        // get all nodes with defined CSS class value equal to 'cssClass'
                                        var all_tags = document.getElementsByClassName(cssClass);
                                        // iterate over all such nodes
                                        for(var i = 0; i < all_tags.length; i++) {
                                            // and set each node's background image
                                            all_tags[i].style.backgroundImage = 'url(' + self.src + ')';
                                        }
                                    }
                                }
                            };

                            // define onerror handler
                            brokenImageWorker.onerror = function() {
                                // reference function execution context
                                var self = this;

                                // schedule reload process of this broken image
                                setTimeout(function() {
                                    triggerBrokenImageWorker_I_3L(self.dataset.customWorkerId, JSON.parse(self.dataset.customBrokenImageObject));
                                }, _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.scheduledReloadTimeout);
                            };

                            // determine image source
                            var src;
                            if(customBrokenImageObject.isClassicIMG) {
                                src = customBrokenImageObject.classicIMG.src;
                            }
                            else {
                                src = customBrokenImageObject.CSS_BackgroundImage_Property;
                            }
                            
                            // trigger loading of this image. Only now the image is started being loaded !!!
                            brokenImageWorker.src = src;
                        }
                    }

                    function scheduleAutomaticChangesDetection_I_2L() {
                        setInterval(
                            _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader.loadAsync,
                            _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.scheduledReloadTimeout
                        );
                    }                    

                    function createCustomImageObject_I_2L(isClassicImageObject, representation_of_image, CSS_Property, isBroken) {
                        // define custom image object
                        var customImageObject = {
                            isClassicIMG : null,
                            classicIMG : null,

                            HTML_node_custom_id : null,
                            HTML_node : null,
                            CSS_BackgroundImage_Property : null,

                            isBroken : null
                        };
                        
                        // if it is classic image...
                        if(isClassicImageObject) {
                            // mark it as classic image
                            customImageObject.isClassicIMG = true;
                            // store the image itself
                            customImageObject.classicIMG = representation_of_image;

                            // determine the image status
                            customImageObject.isBroken = isBroken;
                        }
                        // ...otherwise we deal with background image property of some tag
                        else {
                            // set the custom id of this HTML node for later detection purposes
                            customImageObject.HTML_node_custom_id = _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.indexedImagesMaxId++;

                            // store the node from DOM holding this CSS's background image property
                            customImageObject.HTML_node = representation_of_image;
                            
                            // store the image url
                            customImageObject.CSS_BackgroundImage_Property = CSS_Property;

                            // determine the image status
                            customImageObject.isBroken = isBroken;                            
                        }

                        // push custom image object into array
                        broken_images_in_DOM.push(customImageObject);
                    }

                    function extend_HTML_Tag_with_additional_attributes_I_2L(htmlTagIndex, htmlTag) {
                        // check existance of this attribute in this image
                        var hasCustomAttribute_dataImageId = htmlTag.hasAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.dataImageId_atrr);
                        
                        // if present, set id of the image to that value of the custom attribute provided that id has no value. This is to ensure proper inner workings of the algorithm
                        if(hasCustomAttribute_dataImageId) {
                            img_id_value = htmlTag.getAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.id_attr);
                            if(!img_id_value)
                                htmlTag.setAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.id_attr, htmlTag.getAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.dataImageId_atrr));
                        }
                        // otherwise generate id and set it
                        else {
                            // set custom attribute value
                            htmlTag.setAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.dataImageId_atrr, htmlTagIndex);

                            // set standard attribute value
                            img_id_value = htmlTag.getAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.id_attr);
                            if(!img_id_value)
                                htmlTag.setAttribute(_CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY.Loader._internals_.id_attr, htmlTagIndex);
                        }

                        // return HTML tag extended with additional attributes
                        return htmlTag; 
                    }
                }
            }
        }
    };

    /* ~ private variables */



    /* Public API */

    self.GET_IRAL_OBJECT = _CUSTOM_IMAGE_RESILIENT_ASYNC_LOAD_OBJECT_FACTORY;

    /* ~ Public API */


    
    /* Expose module API to the outside world */
    window.iral = window.iral || self;
    
    
})(window);