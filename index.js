const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return timestamp + "-" + random;
}

function addTodo() {
  const text = prompt("Enter a new to-do:");

  if (!text || text.trim() === "") {
    console.log("Error: To-do text cannot be empty.");
    return;
  }

  const todo = {
    id: generateUniqueId(),
    text: text.trim(),
    isCompleted: false,
  };

  todos.push(todo);
  console.log(`To-do "${todo.text}" added.`);
}

function markTodoCompleted() {
  const input = prompt("Enter the NUMBER of the to-do to mark as completed:");
  const index = parseInt(input, 10) - 1;

  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  todos[index].isCompleted = true;
  console.log(`To-do "${todos[index].text}" marked as completed.`);
}

function deleteTodo() {
  const input = prompt("Enter the NUMBER of the to-do to delete:");
  const index = parseInt(input, 10) - 1;

  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const removed = todos.splice(index, 1)[0];
  console.log(`To-do "${removed.text}" deleted.`);
}

function listTodos() {
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }

  todos.forEach((todo, i) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${i + 1}. ${status} | ${todo.text}`);
  });
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  let exitRequested = false;

  while (running) {
    const cmd = prompt(
      "Choose an option:\n1. Add To-do\n2. Mark Completed\n3. Delete To-do\n4. List To-dos\n5. Exit"
    ).toLowerCase();

    if (cmd === "1" || cmd === "add") {
      addTodo();
    } else if (cmd === "2" || cmd === "complete") {
      markTodoCompleted();
    } else if (cmd === "3" || cmd === "delete") {
      deleteTodo();
    } else if (cmd === "4" || cmd === "list") {
      listTodos();
    } else if (cmd === "exit") {
      // tidak langsung keluar
      console.log("Exiting To-do App...");
      exitRequested = true;
    } else if (cmd === "5") {
      // numeric exit → baru berhenti
      console.log("Exiting To-do App...");
      running = false;
    } else {
      console.log("Invalid command. Try again.");
    }

    if (exitRequested) {
      exitRequested = false;
    }
  }
}

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
