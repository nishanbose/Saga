/* global hljs, $, console */
/* jshint browser: true */

/*********
 * FEED  *
 *********/

if($("#main").hasClass("archive")){
    $.getScript("/assets/js/helper/masonry.pkgd.min.js", function() {
        $.getScript("/assets/js/helper/imagesloaded.pkgd.min.js", function() {
            $("#main").imagesLoaded(function(){
                $('.feed').masonry({
                    columnWidth: '.post:not(.featured)',
                    itemSelector: '.post',
                    gutter: 20
                });
                $('.post').each(function(){
                    $(this).css("opacity", "1.0");
                });
            });
        });
    });
}

/*******************
 * HIGHLIGHT CODE  *
 *******************/
if($("code").length != 0){
    $.getScript("/assets/js/helper/highlight.min.js", function() { 
        hljs.initHighlightingOnLoad();
    });
}

/**********************
 * RESPONSIVE VIDEOS  *
 **********************/

$.getScript("/assets/js/helper/jquery.fitvids.js", function() { 
    $("#main").fitVids();
});

/************
 * GALLERY  *
 ************/

if($('p img:not(:only-child)').closest('p').length != 0){ // If there is a gallery present.
    $.getScript("/assets/js/helper/imagesloaded.pkgd.min.js", function() { 
        $('p img:not(:only-child)').closest('p').addClass('gallery');
        $(".gallery").imagesLoaded(gallery);
        $(window).resize(gallery);
    });
}

function gallery(){
    $.getScript("/assets/js/helper/gallery.min.js", function() { // Load in script for gallery
        var size = 0;
        if ($(window).height() > $(window).width()){
            size = $(window).height();
        } else {
            size = $(window).width();
        }
        if (size < 210 ){
            size = 210;
        }
        $('.gallery').removeWhitespace().collagePlus(
            {
                'targetHeight':size/5
            }
        );
    });
}

/**********************
 * FULL WIDTH IMAGES  *
 **********************/
if($("#main").hasClass("content")){
    $.getScript("/assets/js/helper/imagesloaded.pkgd.min.js", function() { 
        function fullImage(){
            $('img[src$="#full"]:only-child').each(function() {
                $(this).addClass("full-loaded");
                $(this).closest("p").css("min-height",$(this).height());
                $(this).closest("p").addClass("full-image-container");
            });
        }
        $("#main").imagesLoaded(fullImage);
        $(window).resize(fullImage);
    });
}

/******************
 * STICKY FOOTER  *
 ******************/

$(window).load(function(){
    $("#main").css("min-height",$("body").height() - $("#header").height() - $("#footer").height() );
});
$(window).resize(function(){
    $("#main").css("min-height",$("body").height() - $("#header").height() - $("#footer").height() );
});