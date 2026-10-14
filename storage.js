const STORAGE_KEY = "habits";

function loadHabits() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { loadHabits, saveHabits, STORAGE_KEY };
}
