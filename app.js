let habits = loadHabits();

function today() {
  return new Date().toISOString().slice(0, 10);
}

function addHabit(name) {
  habits.push({ id: Date.now(), name: name.trim(), done: [] });
  saveHabits(habits);
  render();
}

function markDone(id) {
  const habit = habits.find((h) => h.id === id);
  habit.done.push(today());
  saveHabits(habits);
  render();
}

function render() {
  const list = document.getElementById("habits");
  list.innerHTML = "";
  habits.forEach((habit) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${habit.name} (done ${habit.done.length} times)`;
    const button = document.createElement("button");
    button.textContent = "Done today";
    button.addEventListener("click", () => markDone(habit.id));
    li.append(label, button);
    list.appendChild(li);
  });
}

document.getElementById("add-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("name");
  addHabit(input.value);
  input.value = "";
});

render();
