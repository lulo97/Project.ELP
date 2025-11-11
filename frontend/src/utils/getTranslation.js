import { global_translation } from "../languages/global_translation";

export function getTranslation(key = "", translation = {}) {
  let _translation = translation;

  if (!key) {
    throw new Error("Key is empty!");
  }

  const language = localStorage.getItem("language") || "vi";

  if (!_translation.hasOwnProperty(key) && !global_translation.hasOwnProperty(key)) {
    console.error(`Key "${key}" does not exist in translation!`);
    return key;
  }

  const translated_object = _translation[key] ||  global_translation[key];
  
  const translated = translated_object[language];

  if (!translated) {
    console.warn(`Missing translation for "${key}" in language "${language}"`);
    return key;
  }

  return translated;
}
