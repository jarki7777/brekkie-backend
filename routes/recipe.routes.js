import { Router } from 'express';
import { recipeController } from '../controllers/recipe.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const recipeRoutes = Router();

recipeRoutes.post('/', checkJwt, checkMod, recipeController.new);
recipeRoutes.get('/index', checkJwt, recipeController.index);
recipeRoutes.get('/find', checkJwt, recipeController.find);
recipeRoutes.get('/find_by_inventory', checkJwt, recipeController.findWithUserIngredients);
recipeRoutes.patch('/find/:id', checkJwt, checkMod, recipeController.update);
recipeRoutes.delete('/find/:id', checkJwt, checkAdmin, recipeController.delete);
recipeRoutes.patch('/one_star/:id', checkJwt, recipeController.voteOneStar);
recipeRoutes.patch('/two_star/:id', checkJwt, recipeController.voteTwoStar);
recipeRoutes.patch('/three_star/:id', checkJwt, recipeController.voteThreeStar);
recipeRoutes.patch('/four_star/:id', checkJwt, recipeController.voteFourStar);
recipeRoutes.patch('/five_star/:id', checkJwt, recipeController.voteFiveStar);

export default recipeRoutes;