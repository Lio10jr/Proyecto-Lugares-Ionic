class Lugar {
    constructor(id, nombre, url_imagen, creadoPor, comentarios = []) {
        this.id = id;
        this.nombre = nombre;
        this.url_imagen = url_imagen;
        this.creadoPor = creadoPor;
        this.comentarios = comentarios;
    }
}

module.exports = Lugar;