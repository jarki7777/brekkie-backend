import { Router } from 'express';
import { inventoryController } from '../controllers/inventories.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';

const inventoryRoutes = Router();

inventoryRoutes.get('/', checkJwt, inventoryController.show);
inventoryRoutes.post('/', checkJwt, inventoryController.add);
inventoryRoutes.patch('/', checkJwt, inventoryController.remove);
inventoryRoutes.put('/', checkJwt, inventoryController.empty);

export default inventoryRoutes;