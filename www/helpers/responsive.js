

// DIMESIONES


var htmlancho;
var htmlalto;
var bodyancho;
var bodyalto;
var id;
$(window).resize(function() {
    clearTimeout(id);
    id = setTimeout(CambioVentana(), 500);
});

function CambioVentana() {
    htmlancho = $('html').width();
    htmlalto = $('html').height();
    bodyancho = $('body').width();
    bodyalto = $('body').height();
    if ($('body').hasClass('alto') && bodyancho > htmlancho) {
        $('body').removeClass('alto').addClass('ancho');
    }
    if ($('body').hasClass('ancho') && bodyalto > htmlalto) {
        $('body').removeClass('ancho').addClass('alto');
    }
}
$(document).ready(function() {
    var slide = 0;
    var botonActivo = '';

    htmlancho = $('html').width();
    htmlalto = $('html').height();
    bodyancho = $('body').width();
    bodyalto = $('body').height();
    if ($('body').hasClass('alto') && bodyancho > htmlancho) {
        $('body').removeClass('alto').addClass('ancho');
    }
    if ($('body').hasClass('ancho') && bodyalto > htmlalto) {
        $('body').removeClass('ancho').addClass('alto');
    }
});



