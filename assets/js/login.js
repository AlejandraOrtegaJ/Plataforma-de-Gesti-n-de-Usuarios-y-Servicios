document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado

    // Obtener valores del formulario de inicio de sesión
    let emailLogin = document.getElementById('emailLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;

    // Obtener usuarios almacenados en localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar si existe un usuario con el correo y contraseña ingresados
    let user = users.find(u => u.email === emailLogin && u.password === passwordLogin);

    if (user) {
        // Guardar al usuario en sessionStorage para futuras páginas
        sessionStorage.setItem('loggedUser', JSON.stringify(user));

        // Redirigir según el rol del usuario
        if (user.role === 'admin') {
            window.location.href = 'admin.html'; // Redirigir al dashboard de administrador
        } else {
            window.location.href = 'viewer.html'; // Redirigir al dashboard de visualizador
        }
    } else {
        // Mostrar mensaje de error si las credenciales no coinciden
        document.getElementById('loginMessage').innerText = 'Credenciales incorrectas';
    }
});
