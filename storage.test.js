const test = require("node:test");
const assert = require("node:assert/strict");

// In-memory mock for localStorage in Node test environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key)
      ? this.store[key]
      : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new MockLocalStorage();

const { loadHabits, saveHabits, STORAGE_KEY } = require("./storage.js");

test.beforeEach(() => {
  global.localStorage.clear();
});

test("nothing saved yet returns an empty list", () => {
  assert.deepEqual(loadHabits(), []);
});

test("saved data comes back unchanged", () => {
  const habits = [
    { id: 101, name: "Read 20 pages", done: ["2026-10-14"] },
    { id: 102, name: "Morning meditation", done: [] },
  ];
  saveHabits(habits);
  assert.deepEqual(loadHabits(), habits);
});

test("broken JSON in storage returns an empty list", () => {
  global.localStorage.setItem(STORAGE_KEY, "{ broken json ... ]");
  assert.deepEqual(loadHabits(), []);
});

test("null in storage returns an empty list", () => {
  global.localStorage.setItem(STORAGE_KEY, "null");
  assert.deepEqual(loadHabits(), []);
});
