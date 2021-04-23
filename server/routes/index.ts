import { Router } from 'express';
import { Express } from 'express-serve-static-core';
import users from './users';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the API'});
});

router.get('*', (req, res) => {
  res.json({err: 'not found'})
});

const route = (app: Express) => {
  app.use('/users', users);
  app.use('/', router);
};

export default route;