import { Router } from 'express';
import { shoppingListController } from '../controllers/shoppingList.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';

const shoppingListRoutes = Router();

shoppingListRoutes.get('/', checkJwt, shoppingListController.show);
shoppingListRoutes.post('/', checkJwt, shoppingListController.add);
shoppingListRoutes.patch('/', checkJwt, shoppingListController.remove);
shoppingListRoutes.put('/', checkJwt, shoppingListController.empty);

export default shoppingListRoutes;