import { Router } from 'express';
import { recipeController } from '../controllers/recipe.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const recipeRoutes = Router();

recipeRoutes.post('/', checkJwt, checkMod, recipeController.new);
recipeRoutes.get('/index', checkJwt, recipeController.index);
recipeRoutes.get('/find', checkJwt, recipeController.find);
recipeRoutes.get('/find_with_ingredient', checkJwt, recipeController.findWithIngredients);

export default recipeRoutes;