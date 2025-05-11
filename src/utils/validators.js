// utils/validator.js

import fallbackValidators from "./fallbackValidators.json";

export function loadValidators() {
  try {
    const config = require("../config/validators.json");
    if (Array.isArray(config.validators)) {
      return config.validators;
    }
  } catch (err) {
    console.warn("⚠️ Could not load validators.json, using fallback.");
  }
  return fallbackValidators.validators;
}
