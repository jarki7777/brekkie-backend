import { Router } from 'express';
import { commentsController } from '../controllers/comments.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const commentRoutes = Router();

commentRoutes.post('/', commentsController.new);

export default commentRoutes;