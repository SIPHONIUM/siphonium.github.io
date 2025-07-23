(function () {
  const baseURL = "https://siphonium.github.io/";

  const supportedLangs = ["fr", "en", "es", "de", "it", "jp", "pt", "ar", "ru", "zh"];
  
  let userLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  let langCode = userLang.split("-")[0]; 

  if (supportedLangs.includes(langCode)) {
    window.location.replace(`${baseURL}${langCode}/`);
  } else {
    window.location.replace(`${baseURL}en/`); 
  }
})();
