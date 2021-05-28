import { Router } from 'express';
import { recipeController } from '../controllers/recipe.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const recipeRoutes = Router();

recipeRoutes.post('/', recipeController.new);
recipeRoutes.get('/index', recipeController.index);

export default recipeRoutes;