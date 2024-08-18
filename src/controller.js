import {pool} from './database.js';

class ConsultaController{

    async getAll(req, res) {        
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
}

export const consulta = new ConsultaController();