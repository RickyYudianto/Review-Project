import { Router } from 'express';
import UserController from '../controllers/users';
import { verifyToken } from '../helpers';

const router = Router();
const controller = new UserController();

router.get('/', verifyToken, controller.getAllUser);

export default router;
