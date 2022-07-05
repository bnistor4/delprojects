$(document).ready(function() {
    var $listaProgetti;

    readTextFile("/delprojects/modelli/modelli.json", function(text) {
        var listaProgettiTemp = JSON.parse(text);
        $listaProgetti = listaProgettiTemp;
    });

    console.log($listaProgetti);

    setTimeout(function() {
        loadajax($listaProgetti);
    }, 1000);
});

function loadajax(lista) {
    lista.forEach(element => {
        progetti = element.progetti;
        console.log(progetti);
        progetti.forEach(elementProgetto => {
            $('.content-wrapper').append('<div class="actual-model">' + "<div class='class-name'>" + element.classe + " &#x1F31F;</div>");
            $(".actual-model:last-of-type").append("<model-viewer camera-controls src='/delprojects/modelli/" + element.classe + "/" + elementProgetto + "' alt='" + element.classe + "'></model-viewer></div>");
        });
    });

}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
