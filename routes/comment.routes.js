import { Router } from 'express';
import { commentsController } from '../controllers/comments.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin } from '../middleware/checkRole.js';

const commentRoutes = Router();

commentRoutes.post('/:id', checkJwt, commentsController.new);
commentRoutes.get('/:id', checkJwt, commentsController.showByRecipe);
commentRoutes.delete('/:id', checkJwt, checkAdmin, commentsController.delete);

export default commentRoutes;