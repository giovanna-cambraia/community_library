import { Router } from 'express';
import userController from '../controller/user.controller.js';

const router = Router();

router.post('/users', userController.createUserController)

export default router