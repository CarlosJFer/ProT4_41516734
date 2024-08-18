import { Router } from 'express';
import { consulta } from './controller.js';

export const router = Router()

router.get('/consulta', consulta.getAll);
router.post('/consulta', consulta.add);
router.delete('/consulta',consulta.delete);
router.put('/consulta', consulta.update);