// Registro de usuarios
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = { name, email, password, role: 'viewer' }; // Por defecto, se asigna el rol de visualizador
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('successMessage').innerText = 'Registro exitoso';
    document.getElementById('registerForm').reset();
});

// Iniciar sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let emailLogin = document.getElementById('emailLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === emailLogin && u.password === passwordLogin);

    if (user) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.href = user.role === 'admin' ? 'admin.html' : 'viewer.html';
    } else {
        document.getElementById('loginMessage').innerText = 'Credenciales incorrectas';
    }
});

// Gestión de usuarios (solo para administrador)
if (window.location.pathname.includes('admin.html')) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userList = document.getElementById('userList');

    users.forEach((user, index) => {
        let userItem = document.createElement('div');
        userItem.innerHTML = `
            <p>${user.name} (${user.role}) 
                <button class="btn btn-sm btn-warning" onclick="setAdmin(${index})">Hacer Administrador</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Eliminar</button>
            </p>`;
        userList.appendChild(userItem);
    });
}

function setAdmin(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users[index].role = 'admin';
    localStorage.setItem('users', JSON.stringify(users));
    window.location.reload();
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.reload();
}
