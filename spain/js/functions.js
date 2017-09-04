ymaps.ready(init);
var myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [40.387689, -3.557382],
        zoom: 9
    });
}

$(function () {
    $('select').vDrop({ allowMultiple: false });

    $('#detail-slider').bxSlider({
        buildPager: function (slideIndex) {
            return '<img src="'+$('#detail-slider').find('li').eq(slideIndex).find('img').attr('src')+'">';
        }
    });

    $('#header-slider').bxSlider({
        pager: false
    });
});