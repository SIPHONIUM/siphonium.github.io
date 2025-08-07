(function () {
  const baseURL = "https://siphonium.github.io/";
  const supportedLangs = ["fr", "en", "es", "de", "it", "jp", "pt", "ar", "ru", "zh"];

  if ('caches' in window) {
    caches.keys().then(function (names) {
      for (let name of names) caches.delete(name);
    });
  }

  const urlPath = window.location.pathname;
  const currentLang = urlPath.split("/")[1];

  if (!supportedLangs.includes(currentLang)) {
    let savedLang = localStorage.getItem("preferredLang");
    let userLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    let langCode = savedLang || userLang.split("-")[0];
    let redirectLang = supportedLangs.includes(langCode) ? langCode : "en";
    const preloadURL = `${baseURL}${redirectLang}/`;

    fetch(preloadURL, { cache: "reload" }).finally(() => {
      window.location.replace(preloadURL);
    });
  }

  window.changeLang = function (lang) {
    if (!supportedLangs.includes(lang)) lang = "en";
    localStorage.setItem("preferredLang", lang);
    const targetURL = `${baseURL}${lang}/`;

    fetch(targetURL, { cache: "reload" }).finally(() => {
      window.location.replace(targetURL);
    });
  };

  window.copyIP = function() {
    navigator.clipboard.writeText("nexus.rocknite.fr:26105")
      .then(() => alert("Adresse proxy copiée !"))
      .catch(() => alert("Échec de la copie dans le presse-papier"));
  };
})();
