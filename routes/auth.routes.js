import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/signup', authController.signUp);

export default authRoutes;