const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// 1. Fetch and render all tasks on load
async function fetchTasks() {
    try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        
        taskList.innerHTML = '';
        if (data.data && data.data.length > 0) {
            data.data.forEach(task => renderTask(task));
        } else {
            taskList.innerHTML = '<li style="justify-content: center; color: #888;">No tasks found!</li>';
        }
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
}

// 2. Render a single task item in the DOM
function renderTask(task) {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.classList.add('task-title');
    span.textContent = task.title;
    span.onclick = () => toggleTask(task._id, !task.completed);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(task._id);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// 3. Add a new task (POST)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });

        if (res.ok) {
            taskInput.value = '';
            fetchTasks();
        }
    } catch (err) {
        console.error('Error adding task:', err);
    }
});

// 4. Toggle completion status (PATCH)
async function toggleTask(id, completed) {
    try {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });

        if (res.ok) fetchTasks();
    } catch (err) {
        console.error('Error updating task:', err);
    }
}

// 5. Delete a task (DELETE)
async function deleteTask(id) {
    try {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) fetchTasks();
    } catch (err) {
        console.error('Error deleting task:', err);
    }
}

// Initial fetch
fetchTasks();
