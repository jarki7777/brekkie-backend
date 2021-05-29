import { Router } from 'express';
import { authController } from '../controllers/auths.controller.js';

const authRoutes = Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/signup', authController.signUp);

export default authRoutes;