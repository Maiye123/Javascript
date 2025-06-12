// script.js

// State management
let todos = [];
let currentFilter = "all";
let editingId = null;

// DOM elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompleted");
const totalTasksSpan = document.getElementById("totalTasks");
const completedTasksSpan = document.getElementById("completedTasks");

// Initialize app
function init() {
  loadTodosFromStorage();
  bindEvents();
  renderTodos();
  updateStats();
}

// Event listeners
function bindEvents() {
  addBtn.addEventListener("click", handleAddTodo);
  todoInput.addEventListener("keypress", handleInputKeypress);
  clearCompletedBtn.addEventListener("click", handleClearCompleted);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", handleFilterChange);
  });
}

// Todo creation
function createTodo(text) {
  return {
    id: Date.now() + Math.random(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

// Add todo functionality
function handleAddTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    showError("Please enter a task");
    return;
  }

  if (text.length > 100) {
    showError("Task is too long (max 100 characters)");
    return;
  }

  const newTodo = createTodo(text);
  todos.unshift(newTodo);

  todoInput.value = "";
  saveTodosToStorage();
  renderTodos();
  updateStats();

  // Show success feedback
  showSuccess("Task added successfully!");
}

function handleInputKeypress(e) {
  if (e.key === "Enter") {
    handleAddTodo();
  }
}

// Todo rendering
function renderTodos() {
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    renderEmptyState();
    return;
  }

  const todosHTML = filteredTodos.map((todo) => createTodoHTML(todo)).join("");

  todoList.innerHTML = todosHTML;
  bindTodoEvents();
}

function createTodoHTML(todo) {
  const isEditing = editingId === todo.id;
  const completedClass = todo.completed ? "completed" : "";
  const checkedClass = todo.completed ? "checked" : "";

  return `
        <li class="todo-item ${completedClass}" data-id="${todo.id}">
            <div class="todo-checkbox ${checkedClass}" onclick="toggleTodo(${
    todo.id
  })"></div>
            <span class="todo-text ${isEditing ? "editing" : ""}">${escapeHTML(
    todo.text
  )}</span>
            <input type="text" class="todo-edit-input ${
              isEditing ? "editing" : ""
            }" 
                   value="${escapeHTML(todo.text)}" maxlength="100">
            <div class="todo-actions">
                ${
                  isEditing
                    ? `<button class="todo-btn save-btn" onclick="saveTodoEdit(${todo.id})">Save</button>
                     <button class="todo-btn cancel-btn" onclick="cancelTodoEdit()">Cancel</button>`
                    : `<button class="todo-btn edit-btn" onclick="startTodoEdit(${todo.id})">Edit</button>
                     <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>`
                }
            </div>
        </li>
    `;
}

function renderEmptyState() {
  const emptyMessages = {
    all: {
      title: "No tasks yet!",
      message:
        "Add a new task above to get started with your productivity journey.",
    },
    active: {
      title: "No active tasks!",
      message:
        "Great job! You've completed all your tasks or haven't added any yet.",
    },
    completed: {
      title: "No completed tasks!",
      message: "Complete some tasks to see them here.",
    },
  };

  const message = emptyMessages[currentFilter];

  todoList.innerHTML = `
        <div class="empty-state">
            <h3>${message.title}</h3>
            <p>${message.message}</p>
        </div>
    `;
}

// Todo actions
function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodosToStorage();
  renderTodos();
  updateStats();
}

function deleteTodo(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    todos = todos.filter((todo) => todo.id !== id);

    if (editingId === id) {
      editingId = null;
    }

    saveTodosToStorage();
    renderTodos();
    updateStats();
    showSuccess("Task deleted successfully!");
  }
}

function startTodoEdit(id) {
  if (editingId !== null) {
    cancelTodoEdit();
  }

  editingId = id;
  renderTodos();

  // Focus on the edit input
  const editInput = document.querySelector(
    `[data-id="${id}"] .todo-edit-input`
  );
  if (editInput) {
    editInput.focus();
    editInput.select();
  }
}

function saveTodoEdit(id) {
  const editInput = document.querySelector(
    `[data-id="${id}"] .todo-edit-input`
  );
  const newText = editInput.value.trim();

  if (newText === "") {
    showError("Task cannot be empty");
    return;
  }

  if (newText.length > 100) {
    showError("Task is too long (max 100 characters)");
    return;
  }

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );

  editingId = null;
  saveTodosToStorage();
  renderTodos();
  showSuccess("Task updated successfully!");
}

function cancelTodoEdit() {
  editingId = null;
  renderTodos();
}

// Event binding for dynamically created elements
function bindTodoEvents() {
  // Handle edit input keypress
  const editInputs = document.querySelectorAll(".todo-edit-input.editing");
  editInputs.forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const todoItem = e.target.closest(".todo-item");
        const id = parseInt(todoItem.dataset.id);
        saveTodoEdit(id);
      } else if (e.key === "Escape") {
        cancelTodoEdit();
      }
    });
  });
}

// Filtering
function handleFilterChange(e) {
  const filter = e.target.dataset.filter;

  // Update active filter button
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");

  currentFilter = filter;
  renderTodos();
}

function getFilteredTodos() {
  switch (currentFilter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

// Clear completed todos
function handleClearCompleted() {
  const completedCount = todos.filter((todo) => todo.completed).length;

  if (completedCount === 0) {
    showError("No completed tasks to clear");
    return;
  }

  if (
    confirm(
      `Are you sure you want to delete ${completedCount} completed task${
        completedCount > 1 ? "s" : ""
      }?`
    )
  ) {
    todos = todos.filter((todo) => !todo.completed);

    if (editingId !== null) {
      const editingTodo = todos.find((todo) => todo.id === editingId);
      if (!editingTodo) {
        editingId = null;
      }
    }

    saveTodosToStorage();
    renderTodos();
    updateStats();
    showSuccess(
      `${completedCount} completed task${
        completedCount > 1 ? "s" : ""
      } cleared!`
    );
  }
}

// Statistics
function updateStats() {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;

  totalTasksSpan.textContent = `${totalTasks} task${
    totalTasks !== 1 ? "s" : ""
  }`;
  completedTasksSpan.textContent = `${completedTasks} completed`;

  // Update clear completed button state
  clearCompletedBtn.disabled = completedTasks === 0;
}

// Local storage functions
function saveTodosToStorage() {
  try {
    const todoData = {
      todos: todos,
      currentFilter: currentFilter,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem("todoApp", JSON.stringify(todoData));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    showError("Failed to save tasks");
  }
}

function loadTodosFromStorage() {
  try {
    const savedData = localStorage.getItem("todoApp");
    if (savedData) {
      const todoData = JSON.parse(savedData);
      todos = todoData.todos || [];
      currentFilter = todoData.currentFilter || "all";

      // Update active filter button
      filterBtns.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === currentFilter);
      });
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    todos = [];
    currentFilter = "all";
    showError("Failed to load saved tasks");
  }
}

// Utility functions
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showSuccess(message) {
  showNotification(message, "success");
}

function showError(message) {
  showNotification(message, "error");
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    zIndex: "1000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Global functions for inline event handlers
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.startTodoEdit = startTodoEdit;
window.saveTodoEdit = saveTodoEdit;
window.cancelTodoEdit = cancelTodoEdit;

// Initialize the application
document.addEventListener("DOMContentLoaded", init);
