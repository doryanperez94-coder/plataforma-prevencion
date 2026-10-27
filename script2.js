let selectedUserRole = 'estudiante';

function selectRole(role) {
    selectedUserRole = role;
    const modal = document.getElementById('roleModal');
    const badgeTitle = document.getElementById('badgeRoleTitle');

    if (role === 'padre') {
        badgeTitle.textContent = 'Padres';
    } else {
        badgeTitle.textContent = 'Alumnos';
    }

    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');
    const loginForm = document.querySelector('#loginForm');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('userRole', selectedUserRole);
            window.location.href = 'formulario.html';
        });
    }
});