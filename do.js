const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create notification element
const notification = document.createElement('div');
notification.className = 'notification';
document.body.appendChild(notification);

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('checked');
        }
        listContainer.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    listContainer.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showNotification(message, type = 'error') {
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#ff4444' : '#28a745';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button onclick="editTask(this)" class="edit-btn"><i class="fas fa-edit"></i></button>
            <button onclick="deleteTask(this)" class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    // Add click event to toggle checked state
    li.querySelector('.task-text').onclick = function() {
        li.classList.toggle("checked");
        saveTasks();
        filterTasks();
    };
    
    return li;
}

function addTask() {
    if (inputBox.value.trim() === '') {
        showNotification("Please enter a task");
        return;
    }
    
    let li = createTaskElement(inputBox.value);
    listContainer.appendChild(li);
    inputBox.value = "";
    showNotification("Task added successfully!", "success");
    saveTasks();
    filterTasks();
}

function editTask(button) {
    const li = button.closest('li');
    const taskText = li.querySelector('.task-text');
    const currentText = taskText.textContent;
    
    // Create edit input
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = currentText;
    
    // Replace text with input
    taskText.replaceWith(editInput);
    editInput.focus();
    
    // Create save button
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.onclick = () => saveEdit(li, editInput, saveButton);
    
    // Replace edit button with save button
    button.replaceWith(saveButton);
}

function saveEdit(li, editInput, saveButton) {
    const newText = editInput.value.trim();
    if (newText === '') {
        showNotification("Task cannot be empty");
        return;
    }
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = newText;
    taskText.onclick = function() {
        li.classList.toggle("checked");
        saveTasks();
        filterTasks();
    };
    
    editInput.replaceWith(taskText);
    
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = () => editTask(editButton);
    saveButton.replaceWith(editButton);
    
    showNotification("Task updated successfully!", "success");
    saveTasks();
}

function deleteTask(button) {
    const li = button.closest('li');
    li.remove();
    showNotification("Task deleted successfully!", "success");
    saveTasks();
    filterTasks();
}

function clearAllTasks() {
    if (listContainer.children.length === 0) {
        showNotification("No tasks to clear");
        return;
    }
    
    if (confirm("Are you sure you want to clear all tasks?")) {
        listContainer.innerHTML = '';
        showNotification("All tasks cleared successfully!", "success");
        saveTasks();
    }
}

function filterTasks() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const tasks = listContainer.getElementsByTagName('li');
    
    for (let task of tasks) {
        switch(activeFilter) {
            case 'active':
                task.style.display = task.classList.contains('checked') ? 'none' : 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('checked') ? 'flex' : 'none';
                break;
            default: // 'all'
                task.style.display = 'flex';
        }
    }
}

// Add event listeners
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        filterTasks();
    });
});

// Load tasks when page loads
loadTasks();