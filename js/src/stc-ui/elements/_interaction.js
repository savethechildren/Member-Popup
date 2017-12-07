
var stc = stc || {};
(function(inter, $){
    /**
     * Displays an animated loader while an asynchronous actions takes place.
     * 
     * @param {string} [element=body] The html ELEMENT TO DISPLAY THE LOADER IN.
     *   Defaults to body.
     */
    inter.showLoader = function(element) {
        var element = element || $('body');
        var loaderHtml = '<div class="stc-loader">' +
                              '<div class="stc-loader-inner">' +
                                  '<i class="fa fstc fstc-circle fa-spin fa-4x"></i>' +
                                  '<span class="sr-only">Loading...</span>' +
                              '</div>' +
                         '</div>';
        $(element).append($(loaderHtml).hide().fadeIn("fast"));
    };
    
    inter.hideLoader = function(element) {
        var element = element || $('body');
        $(element).find('div.stc-loader').fadeOut("fast", function(e) { $(this).remove(); });
    }; 

    
}(stc.inter = stc.inter || {}, jQuery));
