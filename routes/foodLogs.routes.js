import { Router } from 'express';
import { foodLogsController } from '../controllers/foodLogsController.js';
import { checkJwt } from '../middleware/checkJwt.js';

const foodLogRoutes = Router();

foodLogRoutes.post('/:id', checkJwt, foodLogsController.add);
foodLogRoutes.get('/find/', checkJwt, foodLogsController.showByDay);
foodLogRoutes.get('/', checkJwt, foodLogsController.index);
foodLogRoutes.patch('/:id/:day', checkJwt, foodLogsController.addServing);

export default foodLogRoutes;