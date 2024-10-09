document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener valores del formulario
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Obtener usuarios existentes o inicializar un array vacío si no existen
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el correo ya está registrado
    let emailExists = users.some(user => user.email === email);
    if (emailExists) {
        document.getElementById('successMessage').innerText = 'El correo ya está registrado';
        return;
    }

    // Crear un nuevo usuario y agregarlo a la lista de usuarios
    let newUser = { name: name, email: email, password: password, role: 'viewer' }; // Rol por defecto: visualizador
    users.push(newUser);

    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Mostrar mensaje de éxito
    document.getElementById('successMessage').innerText = 'Registro exitoso';

    // Resetear el formulario
    document.getElementById('registerForm').reset();
});
