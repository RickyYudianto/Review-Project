import { Router } from 'express';
import UserController from '../controllers/users';
import sequelize from '../models';
import User from '../models/user';
import UserType from "../models/userType";

const router  = Router();
const controller = new UserController();

router.get('/', controller.getAllUser);

export default router;
