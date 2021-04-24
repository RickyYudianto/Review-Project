import { Router } from 'express';
import UserController from '../controllers/users';
import { verifyToken } from '../helpers';

const router = Router();
const controller = new UserController();

router.get('/', verifyToken, controller.getAllUser);
router.get('/:id', verifyToken, controller.getUserById);
router.post('/', verifyToken, controller.createUser);
router.put('/', verifyToken, controller.updateUser);
router.delete('/', verifyToken, controller.deleteUser);

export default router;
