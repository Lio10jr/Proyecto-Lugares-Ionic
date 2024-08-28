const { Client } = require('pg');
const connectionData = require('../database/connection');

const addComment = async (req, res) => {
    const { lugar_id, comentario } = req.body;

    if (!lugar_id || !comentario) {
        return res.status(400).json({ error: 'Lugar y comentario son obligatorios' });
    }
    const client = new Client(connectionData);
    try {
        client.connect();
        const queryText = 'INSERT INTO Comentarios(usuario_id, lugar_id, comentario) VALUES($1, $2, $3) RETURNING *';
        const queryValues = [req.usuario.id, lugar_id, comentario];

        const result = await client.query(queryText, queryValues);

        const newComment = result.rows[0];

        res.status(201).json({ message: 'Comentario agregado exitosamente', comment: newComment });
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al agregar el comentario' });
    } finally {
        await client.end();
    }
};

const getAllComments = async (req, res) => {
    const client = new Client(connectionData);
    try {
        client.connect();
        const result = await client.query(`SELECT c.*, u.nombre as usuario_nombre
            FROM Comentarios c
            JOIN Usuarios u ON c.usuario_id = u.id`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al obtener los comentario' });
    } finally {
        await client.end();
    }
};

const getCommentById = async (req, res) => {
    const { id } = req.params;
    const client = new Client(connectionData);
    try {
        await client.connect();
        const query = `
            SELECT c.*, u.nombre as usuario_nombre
            FROM Comentarios c
            JOIN Usuarios u ON c.usuario_id = u.id
            WHERE c.lugar_id = $1
        `;
        const result = await client.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al obtener el comentario' });
    } finally {
        await client.end();
    }
};

module.exports = {
    addComment,
    getAllComments,
    getCommentById
};
