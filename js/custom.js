$(document).ready(function () {
  let listaProgetti;

  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "/modelli/modelli.json", true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4 && xobj.status === 200) {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  loadJSON(function (response) {
    listaProgetti = JSON.parse(response);
    console.log(listaProgetti);
    loadajax(listaProgetti);
  });
});

function loadajax(lista) {
  lista.forEach((element) => {
    const progetti = element.progetti;
    progetti.forEach((elementProgetto) => {
      $(".content-wrapper").append(
        '<div class="actual-model">' +
          "<div class='class-name " +
          element.classe +
          "'>" +
          element.classe +
          " ⭐</div>"
      );
      $(".actual-model:last-of-type").append(
        "<model-viewer camera-controls src='/modelli/" +
          element.classe +
          "/" +
          elementProgetto +
          "' alt='" +
          element.classe +
          "'></model-viewer></div>"
      );
    });
  });
}

function creaMenu(data) {
  const selectMenu = document.getElementById("menu-filtro");

  // Aggiunge le opzioni del menu basate sui dati
  data.forEach((modello) => {
    const option = document.createElement("option");
    option.value = modello.classe;
    option.text = modello.classe;
    selectMenu.add(option);
  });
}

function mostraClasse(classeSelezionata) {
  const oggetti = document.querySelectorAll(".actual-model");

  oggetti.forEach((oggetto) => {
    const nomeClasse = oggetto.querySelector(".class-name").textContent;
    if (nomeClasse.includes(classeSelezionata)) {
      oggetto.style.display = "block";
    } else {
      oggetto.style.display = "none";
    }
  });
}

fetch("/modelli/modelli.json")
  .then((response) => response.json())
  .then((data) => {
    creaMenu(data);
    const selectMenu = document.getElementById("menu-filtro");
    selectMenu.addEventListener("change", () => {
      const classeSelezionata = selectMenu.value;
      mostraClasse(classeSelezionata);
    });
  })
  .catch((error) => console.error(error));
