class Comentario {
    constructor(id, comentario, lugar, usuario, fecha = new Date()) {
        this.id = id;
        this.comentario = comentario;
        this.lugar = lugar;
        this.usuario = usuario;
    }
}

module.exports = Comentario;