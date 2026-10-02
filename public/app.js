const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authToggleBtn = document.getElementById('auth-toggle-btn');
const authUsername = document.getElementById('auth-username');
const authPassword = document.getElementById('auth-password');
const userDisplay = document.getElementById('user-display');
const logoutBtn = document.getElementById('logout-btn');

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let isLogin = true;

// Toggle Login / Signup view
authToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? 'Login' : 'Sign Up';
    authSubmitBtn.textContent = isLogin ? 'Login' : 'Sign Up';
    authToggleBtn.textContent = isLogin ? 'Sign up here' : 'Login here';
});

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('jwt_token');
    const username = localStorage.getItem('username');

    if (token && username) {
        authContainer.style.display = 'none';
        appContainer.style.display = 'block';
        userDisplay.textContent = username;
        fetchTasks();
    } else {
        authContainer.style.display = 'block';
        appContainer.style.display = 'none';
    }
}

// Handle Auth (Login / Signup)
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = authUsername.value.trim();
    const password = authPassword.value.trim();
    const endpoint = isLogin ? '/api/users/login' : '/api/users/signup';

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('username', username);
            authUsername.value = '';
            authPassword.value = '';
            checkAuth();
        } else {
            alert(data.message || 'Authentication failed');
        }
    } catch (err) {
        console.error('Auth error:', err);
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    checkAuth();
});

// Helper for Authorization Headers
function getAuthHeaders() {
    const token = localStorage.getItem('jwt_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Fetch user tasks
async function fetchTasks() {
    try {
        const res = await fetch('/api/tasks', {
            headers: getAuthHeaders()
        });
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

// Render task in DOM
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

// Add new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: getAuthHeaders(),
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

// Toggle task status
async function toggleTask(id, completed) {
    try {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ completed })
        });

        if (res.ok) fetchTasks();
    } catch (err) {
        console.error('Error updating task:', err);
    }
}

// Delete task
async function deleteTask(id) {
    try {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (res.ok) fetchTasks();
    } catch (err) {
        console.error('Error deleting task:', err);
    }
}

// Initial Auth Check
checkAuth();