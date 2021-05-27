import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { checkJwt } from '../middleware/checkJwt.js';
import { checkAdmin, checkMod } from '../middleware/checkRole.js';

const userRoutes = Router();

userRoutes.get('/index', checkJwt, checkMod, userController.index);
userRoutes.get('/find/:id', checkJwt, checkMod, userController.show);
userRoutes.patch('/find/:id', checkJwt, checkMod, userController.update);
userRoutes.delete('/find/:id', checkJwt, checkAdmin, userController.delete);

export default userRoutes;