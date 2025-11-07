export function getTranslation(key = "", translation = {}) {
  if (!translation || Object.keys(translation).length === 0) {
    throw new Error("Translation is empty!");
  }

  if (!key) {
    throw new Error("Key is empty!");
  }

  const language = localStorage.getItem("language") || "vi";

  if (!translation.hasOwnProperty(key)) {
    console.error(`Key "${key}" does not exist in translation!`);
    return key;
  }

  const translated = translation[key][language];

  if (!translated) {
    console.warn(`Missing translation for "${key}" in language "${language}"`);
    return translation[key].en || key;
  }

  return translated;
}
