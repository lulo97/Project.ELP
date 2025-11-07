import { global_translation } from "../languages/global_translation";

export function getTranslation(key = "", translation = {}) {
  let _translation = translation;

  if (!_translation || Object.keys(_translation).length == 0)
    _translation = global_translation;

  if (!key) {
    throw new Error("Key is empty!");
  }

  const language = localStorage.getItem("language") || "vi";

  if (!_translation.hasOwnProperty(key)) {
    console.error(`Key "${key}" does not exist in translation!`);
    return key;
  }

  const translated = _translation[key][language];

  if (!translated) {
    console.warn(`Missing translation for "${key}" in language "${language}"`);
    return _translation[key].en || key;
  }

  return translated;
}
