// src/utils/BridgeGuard.js

// ✅ Validate BTC address (supports legacy + segwit)
export function validateBTCAddress(address) {
  const btcRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  return btcRegex.test(address);
}

// 🛡️ Basic throttle to prevent spam-clicks
export function throttle(fn, delay = 2000) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else {
      console.warn("⏱ Bridge throttled. Try again later.");
    }
  };
}
