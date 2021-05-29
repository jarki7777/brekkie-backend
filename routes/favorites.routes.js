import { Router } from 'express';
import { favoritesController } from '../controllers/favorites.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';

const favoritesRoutes = Router();

favoritesRoutes.post('/:id', checkJwt, favoritesController.new);
favoritesRoutes.get('/', checkJwt, favoritesController.show);

export default favoritesRoutes;