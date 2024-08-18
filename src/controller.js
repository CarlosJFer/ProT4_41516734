import { pool } from './database.js';

class ConsultaController {
    // Toma los datos de la base "libros"
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los libros. Verifique los datos ingresados.' });
        }
    }

    // Muestra los datos de la base "libros" y muestra el ID con el que se guarda el libro
    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(
                `INSERT INTO libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,
                [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]
            );
            res.json({ "El libro fue cargado con el ID": result.insertId });
        } catch (error) {
            res.status(400).json({ error: 'Error al agregar el libro. Verifique los datos enviados.' });
        }
    }

    // Actualiza los libros
    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(
                `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?`,
                [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN, libro.id]
            );
            if (result.changedRows === 0) {
                res.status(404).json({ error: 'Error al actualizar el libro. Verifique los datos enviados.' });
            } else {
                res.json({ "Los libros actualizados son": result.changedRows });
            }
        } catch (error) {
            res.status(400).json({ error: '' });
        }
    }

    // Elimina un libro de la base según su ISBN
    async delete(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(
                `DELETE FROM libros WHERE ISBN = ?`,
                [libro.ISBN]
            );
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'No se encontró ningún libro con el ISBN proporcionado. Verifique los datos enviados.' });
            } else {
                res.json({ "Libros eliminados según ISBN son": result.affectedRows });
            }
        } catch (error) {
            res.status(400).json({ error: '' });
        }
    }
}

export const consulta = new ConsultaController();


