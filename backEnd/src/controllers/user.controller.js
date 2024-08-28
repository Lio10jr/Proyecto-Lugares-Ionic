const { Client } = require('pg');
const connectionData = require('../database/connection');

require("dotenv").config;
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const  saltRounds  =  10 ; 

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Email y password son obligatorios'
        });
    }

    const client = new Client(connectionData);
    try {
        client.connect();
        const queryText = 'SELECT * FROM Usuarios WHERE email = $1';
        const result = await client.query(queryText, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Email o password incorrectos'
            });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Email o password incorrectos'
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email, rol_id: user.rol_id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({
            statusCode: 200,
            message: 'Login exitoso',
            user: { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id },
            token: token
        });

    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({
            statusCode: 500,
            message: 'Error al iniciar sesión',
            error: err
        });
    } finally {
        client.end();
    }
}

async function registro(req, res) {
    const { nombre, email, password, rol_id } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ 
            statusCode: 400, 
            message: 'Todos los campos son obligatorios' 
        });
    }

    const client = new Client(connectionData);

    try {
        client.connect();
        
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const queryText = 'INSERT INTO Usuarios(nombre, email, password, rol_id) VALUES($1, $2, $3, $4) RETURNING *';
        var queryValues = []
        if (rol_id) {
            queryValues = [nombre, email, hash, rol_id];
        } else {
            queryValues = [nombre, email, hash, 2];
        }        

        const result = await client.query(queryText, queryValues);
        const newUser = result.rows[0];

        const token = jwt.sign({ id: newUser.id, email: newUser.email, rol_id: newUser.rol_id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ 
            statusCode: 201, 
            message: 'Usuario registrado exitosamente', 
            user: newUser, 
            token: token 
        });

    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ 
            statusCode: 500, 
            message: 'Error al registrar el usuario', 
            error: err 
        });
    } finally {
        client.end();
    }
}

module.exports = {
    login,
    registro
}