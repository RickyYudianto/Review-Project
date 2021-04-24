import { Router } from 'express';
import AuthController from '../controllers/auth';
import { verifyToken } from '../helpers';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.post('/logout', verifyToken, controller.logout);
router.get('/me', verifyToken, controller.verifyMe);
router.get('/token', controller.token);

export default router;
