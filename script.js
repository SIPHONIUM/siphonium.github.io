(function () {
  const baseURL = "https://siphonium.github.io/";
  const supportedLangs = ["fr", "en", "es", "de", "it", "jp", "pt", "ar", "ru", "zh"];


  if ('caches' in window) {
    caches.keys().then(names => {
      for (let name of names) caches.delete(name);
    });
  }

  const urlPath = window.location.pathname;
  const currentLang = urlPath.split("/")[1];

  if (!supportedLangs.includes(currentLang)) {
    const userLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    const langCode = userLang.split("-")[0];
    const redirectLang = supportedLangs.includes(langCode) ? langCode : "en";
    const preloadURL = `${baseURL}${redirectLang}/`;

    fetch(preloadURL, { cache: "reload" }).finally(() => {
      window.location.replace(preloadURL);
    });
  }

  window.changeLang = function (lang) {
    if (!supportedLangs.includes(lang)) lang = "en";
    const targetURL = `${baseURL}${lang}/`;

    fetch(targetURL, { cache: "reload" }).finally(() => {
      window.location.replace(targetURL);
    });
  };

  window.copyIP = function () {
    navigator.clipboard.writeText("nexus.rocknite.fr:26105")
      .then(() => alert("Adresse proxy copiée !"))
      .catch(() => alert("Échec de la copie dans le presse-papier"));
  };

  window.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const version = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const head = document.querySelector("head");

    const oldLink = document.querySelector('link[rel="stylesheet"][href^="style.css"]');
    if (oldLink) oldLink.remove();

    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = `style.css?v=${version}`; 
    head.appendChild(cssLink);
  });
})();
