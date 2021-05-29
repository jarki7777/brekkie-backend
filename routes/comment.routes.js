import { Router } from 'express';
import { commentsController } from '../controllers/comments.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const commentRoutes = Router();

commentRoutes.post('/:id', checkJwt, commentsController.new);
commentRoutes.get('/:id', checkJwt, checkMod, commentsController.showByRecipe);

export default commentRoutes;