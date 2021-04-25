import { Router } from 'express';
import PerformanceFeedbackController from '../controllers/performance-feedbacks';
import { verifyToken } from '../helpers';

const router = Router();
const controller = new PerformanceFeedbackController();

router.get('/:performanceReviewId', verifyToken, controller.getAllEmployeeFeedback);
router.get('/:performanceReviewId/:employeeId', verifyToken, controller.getEmployeePerformanceFeedbackByUserId);

export default router;
