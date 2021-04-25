import { Router } from 'express';
import PerformanceFeedbackController from '../controllers/performance-feedbacks';
import { verifyToken } from '../helpers';

const router = Router();
const controller = new PerformanceFeedbackController();

router.get('/:performanceReviewId', verifyToken, controller.getAllEmployeeFeedback);
router.get('/pending/:reviewerId', verifyToken, controller.getPendingFeedbackList);
router.get('/:performanceReviewId/:employeeId', verifyToken, controller.getEmployeePerformanceFeedbackByUserId);
router.put('/', verifyToken, controller.updateFeedback);

export default router;
