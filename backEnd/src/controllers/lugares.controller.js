const { Client } = require('pg');
const connectionData = require('../database/connection');

async function getAllLugares(req, res) {
    const client = new Client(connectionData);
    try {
        client.connect();
        const result = await client.query('SELECT * FROM Lugares');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al obtener los lugares' });
    } finally {
        client.end();
    }
}

async function getLugarById(req, res) {
    const { id } = req.params;
    const client = new Client(connectionData);
    try {
        client.connect();
        const result = await client.query('SELECT * FROM Lugares WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Lugar no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al obtener el lugar' });
    } finally {
        client.end();
    }
}

async function createLugar(req, res) {
    const { nombre, url_imagen } = req.body;
    
    if (!nombre || !url_imagen) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const client = new Client(connectionData);
    try {
        client.connect();
        const result = await client.query(
            'INSERT INTO Lugares(nombre, url_imagen) VALUES($1, $2) RETURNING *',
            [nombre, url_imagen]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al crear el lugar' });
    } finally {
        client.end();
    }
}

async function updateLugar(req, res) {
    const { id } = req.params;
    const { nombre, url_imagen } = req.body;

    if (!nombre || !url_imagen) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const client = new Client(connectionData);
    try {
        client.connect();
        const result = await client.query(
            'UPDATE Lugares SET nombre = $1, url_imagen = $2 WHERE id = $3 RETURNING *',
            [nombre, url_imagen, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Lugar no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al actualizar el lugar' });
    } finally {
        client.end();
    }
}

async function deleteLugar(req, res) {
    const { id } = req.params;
    const client = new Client(connectionData);
    try {
        client.connect();
        const result = await client.query('DELETE FROM Lugares WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Lugar no encontrado' });
        }
        res.status(200).json({ message: 'Lugar eliminado' });
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error al eliminar el lugar' });
    } finally {
        client.end();
    }
}

module.exports = { 
    getAllLugares, 
    getLugarById, 
    createLugar, 
    updateLugar, 
    deleteLugar 
};