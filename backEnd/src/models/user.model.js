class User {
    constructor(id, nombre, email, password, role) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

module.exports = User;