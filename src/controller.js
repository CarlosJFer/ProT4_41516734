import {pool} from './database.js';

class ConsultaController{
// Toma los datos de la base "libros"
    async getAll(req, res) {        
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
// Muestra los datos de la base "libros" y muestra el ID con el que se guarda el libro
    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(
            `INSERT INTO libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,
            [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]
        );
        res.json({"Id insertado": result.insertId});
    }
// Elimina un libro de la base segun su ISBN
    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(
            `DELETE FROM libros WHERE ISBN=(?)`,
            [libro.ISBN]
        );
        res.json({"Libros eliminados segun ISBN": result.affectedRows});
    }
}

export const consulta = new ConsultaController();
