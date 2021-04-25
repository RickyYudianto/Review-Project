import { Router } from 'express';
import { Express } from 'express-serve-static-core';
import auth from './auth';
import performanceFeedbacks from './performance-feedbacks';
import performanceReviews from './performance-reviews';
import users from './users';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

router.get('*', (req, res) => {
  res.json({ err: 'not found' })
});

const route = (app: Express) => {
  app.use('/auth', auth);
  app.use('/performanceFeedbacks', performanceFeedbacks);
  app.use('/performanceReviews', performanceReviews);
  app.use('/users', users);
  app.use('/', router);
};

export default route;