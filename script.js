(function () {
  const baseURL = "https://siphonium.github.io/";
  const supportedLangs = ["fr", "en", "es", "de", "it", "jp", "pt", "ar", "ru", "zh"];

  if ('caches' in window) {
    caches.keys().then(function (names) {
      for (let name of names) caches.delete(name);
    });
  }

  let userLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  let langCode = userLang.split("-")[0];
  let redirectLang = supportedLangs.includes(langCode) ? langCode : "en";

  const preloadURL = `${baseURL}${redirectLang}/`;
  fetch(preloadURL, { cache: "reload" }).finally(() => {
    window.location.replace(preloadURL);
  });
})();
