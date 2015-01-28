/*jslint browser: true*/
/*global $, jQuery*/
(function ($) {
    $(document);
}(jQuery));

$(document).ready(function () {
    $(".chosen-select").chosen({
        no_results_text: "Language not supported",
    });
});

$('#colorSelector').ColorPicker({flat: true});

//$('#colorSelector').ColorPicker({
//    color: '#0000ff',
//    onShow: function (colpkr) {
//        $(colpkr).fadeIn(500);
//        return false;
//    },
//    onHide: function (colpkr) {
//        $(colpkr).fadeOut(500);
//        return false;
//    },
//    onChange: function (hsb, hex, rgb) {
//        $('#colorSelector div').css('backgroundColor', '#' + hex);
//    }
//});
