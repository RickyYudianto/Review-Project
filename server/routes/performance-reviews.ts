import { Router } from 'express';
import PerformanceReviewController from '../controllers/performance-reviews';
import { verifyToken } from '../helpers';

const router = Router();
const controller = new PerformanceReviewController();

router.get('/', verifyToken, controller.getAllPerformanceReview);
router.get('/:id', verifyToken, controller.getPerformanceReviewById);
router.post('/', verifyToken, controller.createPerformanceReview);
router.put('/', verifyToken, controller.updatePerformanceReview);
router.delete('/', verifyToken, controller.deletePerformanceReview);

export default router;
