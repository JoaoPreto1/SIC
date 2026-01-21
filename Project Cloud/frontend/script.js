// Check authentication state
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const authLink = document.getElementById('authLink');

    if (token && authLink) {
        authLink.textContent = 'Logout';
        authLink.href = '#';
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            window.location.href = 'index.html';
        });
    }
});
