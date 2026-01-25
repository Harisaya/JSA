function createLEDBalls() {
    const container = document.body;
    for (let i = 0; i < 3; i++) {
        const ball = document.createElement('div');
        ball.className = 'led-ball';
        ball.style.animationDelay = `${i * 2.5}s`;
        container.appendChild(ball);
        
        setTimeout(() => {
            ball.remove();
        }, 500 + (i * 2500));
    }
    
    setInterval(() => {
        createLEDBalls();
    }, 7500);
}

// Show/Hide Loading
function showLoading(show) {
    const spinner = document.getElementById('loading');
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Debounce Utility
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
