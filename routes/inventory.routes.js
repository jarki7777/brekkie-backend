import { Router } from 'express';
import { inventoryController } from '../controllers/inventory.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const inventoryRoutes = Router();

inventoryRoutes.get('/', checkJwt, inventoryController.show);
inventoryRoutes.post('/', checkJwt, inventoryController.add);
inventoryRoutes.patch('/', checkJwt, inventoryController.remove);

export default inventoryRoutes;