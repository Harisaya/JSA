// Authentication using localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (localStorage.getItem('authToken')) {
        window.location.href = '../index.html';
    }
});

// Register function
function registerUser(username, password) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.username === username)) {
        alert('Tên đăng nhập đã tồn tại!');
        return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Login function
function loginUser(username, password) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('authToken', 'loggedin');
        localStorage.setItem('userId', username);
        localStorage.setItem('userData', JSON.stringify(user));
        return true;
    }
    return false;
}

// Logout function
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    window.location.href = '../index.html';
}

// Handle login form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (loginUser(username, password)) {
            alert('Đăng nhập thành công!');
            window.location.href = '../index.html';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
}

// Handle register form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }
        if (registerUser(username, password)) {
            alert('Đăng ký thành công! Hãy đăng nhập.');
            window.location.href = 'login.html';
        }
    });
}