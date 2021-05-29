import { Router } from 'express';
import { foodLogsController } from '../controllers/foodLogsController.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin } from '../middleware/checkRole.js';

const foodLogRoutes = Router();

foodLogRoutes.post('/:id', checkJwt, foodLogsController.add);

export default foodLogRoutes;