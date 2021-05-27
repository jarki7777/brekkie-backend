import { Router } from 'express';
import { inventoryController } from '../controllers/inventory.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const inventoryRoutes = Router();

inventoryRoutes.get('/', inventoryController.show);

export default inventoryRoutes;