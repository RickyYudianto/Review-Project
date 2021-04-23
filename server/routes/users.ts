import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();
const controller = new UserController();

router.get('/', controller.getAllUser);

export default router;
