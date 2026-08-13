const barRech = document.getElementById("bar-rech");
const meteoDetailsElem = document.getElementById("meteo-details");
const villeNom = document.getElementById("villeNom");
const villeDate = document.getElementById("villeDate");
const meteoCondIcon = document.getElementById("meteo-cond-icon");
const descriptionMeteo = document.getElementById("description-meteo");
const valTemperature = document.getElementById("deg-val");
const valHumidite = document.getElementById("humidite-val");
const valvent = document.getElementById("vent-val");
const recherche = document.getElementById("recherche");
const previsions = document.getElementById("previsions");
const keyApi = "746ff7a3bc734ff295deb6fe2ca3711c";
const villeRec1 = document.getElementById("ville-recente-1");
const villeRec2 = document.getElementById("ville-recente-2");
const villeRec3 = document.getElementById("ville-recente-3");
const villeRec4 = document.getElementById("ville-recente-4");
const villeRec5 = document.getElementById("ville-recente-5");
function afficherDate() {
  const date = new Date();
  villeDate.textContent = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function afficherMeteo(data) {
  const nomVille = data.name;
  const pays = data.sys.country;
  const tempC = Math.round(data.main.temp);
  const humidite = data.main.humidity;
  const ventKmH = (data.wind.speed * 3.6).toFixed(1);
  const description = data.weather[0].description;
  const condition = data.weather[0].main;

  villeNom.innerHTML = `<h2>${nomVille}, ${pays}</h2>`;
  descriptionMeteo.textContent = description;
  valTemperature.textContent = tempC;
  valHumidite.textContent = humidite;
  valvent.textContent = ventKmH;

  const icones = {
    Clear: "img/clear-day.svg",
    Clouds: "img/nuage.svg",
    Rain: "img/pluie.svg",
    Snow: "img/neige.svg",
  };

  meteoCondIcon.src = icones[condition] || "img/journee-degage.svg";
  meteoCondIcon.alt = description;
}

function afficherPrevisions(data) {
  const liste = data.list;
  const previsionsParJour = {};

  for (let i = 0; i < liste.length; i++) {
    const element = liste[i];
    const dateComplete = element.dt_txt;
    const date = dateComplete.split(" ")[0];

    if (!previsionsParJour[date]) {
      previsionsParJour[date] = element;
    }
  }

  const jours = Object.values(previsionsParJour).slice(0, 5);
  previsions.innerHTML = "";

  for (let i = 0; i < jours.length; i++) {
    const jour = jours[i];
    const date = new Date(jour.dt * 1000);
    const nomJour = date.toLocaleDateString("fr-FR", { weekday: "short" });
    const temperature = Math.round(jour.main.temp);
    const description = jour.weather[0].description;
    const icone = jour.weather[0].icon;

    const carte = document.createElement("div");
    carte.className = "carte-prevision";
    carte.innerHTML = `
      <p>${nomJour}</p>
      <img src="https://openweathermap.org/img/wn/${icone}.png" alt="${description}" />
      <p>${temperature}°C</p>
      <p>${description}</p>
    `;

    previsions.appendChild(carte);
  }
}

function convertirVillePourApi(ville) {
  const nom = String(ville).trim();

  if (!nom) {
    return "Pointe-Noire,CG";
  }

  if (nom.toLowerCase() === "pointe noire") {
    return "Pointe-Noire,CG";
  }

  return nom;
}

async function villeMeteo(ville = "Pointe Noire") {
  const villeCible = convertirVillePourApi(ville);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(villeCible)}&appid=${keyApi}&units=metric&lang=fr`;

  try {
    const reponse = await fetch(url);

    if (!reponse.ok) {
      throw new Error("Ville introuvable");
    }

    const data = await reponse.json();
    afficherMeteo(data);
    afficherDate();
  } catch (erreur) {
    descriptionMeteo.textContent = "Ville introuvable";
    valTemperature.textContent = "0";
    valHumidite.textContent = "0";
    valvent.textContent = "0";
    console.error(erreur);
  }
}

async function previsionsMeteo(ville = "Pointe Noire") {
  const villeCible = convertirVillePourApi(ville);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(villeCible)}&appid=${keyApi}&units=metric&lang=fr`;

  try {
    const reponse = await fetch(url);

    if (!reponse.ok) {
      throw new Error("Prévisions introuvables");
    }

    const data = await reponse.json();
    afficherPrevisions(data);
  } catch (erreur) {
    console.log("Erreur prévisions :", erreur);
    previsions.innerHTML = "<p>Prévisions indisponibles.</p>";
  }
}

barRech.addEventListener("submit", (event) => {
  event.preventDefault();
  const villeSaisie = recherche.value.trim();

  if (villeSaisie) {
    villeMeteo(villeSaisie);
    previsionsMeteo(villeSaisie);
  }
});

villeRec1.addEventListener("click", () => {
  villeMeteo(villeRec1.textContent.trim());
  previsionsMeteo(villeRec1.textContent.trim());
});

villeRec2.addEventListener("click", () => {
  villeMeteo(villeRec2.textContent.trim());
  previsionsMeteo(villeRec2.textContent.trim());
});
villeRec3.addEventListener("click", () => {
  villeMeteo(villeRec3.textContent.trim());
  previsionsMeteo(villeRec3.textContent.trim());
});
villeRec4.addEventListener("click", () => {
  villeMeteo(villeRec4.textContent.trim());
  previsionsMeteo(villeRec4.textContent.trim());
});
villeRec5.addEventListener("click", () => {
  villeMeteo(villeRec5.textContent.trim());
  previsionsMeteo(villeRec5.textContent.trim());
});

villeMeteo("Pointe Noire");
previsionsMeteo("Pointe Noire");
