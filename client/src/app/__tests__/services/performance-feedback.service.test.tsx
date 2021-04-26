import * as apiHelper from '../../../utils/fetch/api';
import { EndpointConstant } from '../../constants/endpoint.constant';
import PendingFeedback from '../../models/pending-feedback.model';
import PerformanceReview from '../../models/performance-review.model';
import Reviewee from '../../models/reviewee.model';
import {
  getAllEmployeePerformanceFeedback,
  getAllPendingFeedback,
  getEmployeePerformanceFeedbackById,
  updateFeedback,
} from '../../services/performance-feedback.service';

describe('performance-feedback.service.ts', () => {
  it('should call get all employee performance feedback api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const performanceReviewId = 1;
    const param = { page: 1, size: 100 };
    getAllEmployeePerformanceFeedback(performanceReviewId, param);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.PERFORMANCE_FEEDBACKS}/${performanceReviewId}`,
      params: param,
    });

    getAllEmployeePerformanceFeedback(performanceReviewId);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.PERFORMANCE_FEEDBACKS}/${performanceReviewId}`,
      params: { page: null, size: null },
    });
  });

  it('should call get employee performance feedback by id api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const employeeId = 1;
    const performanceReviewId = 1;
    getEmployeePerformanceFeedbackById(performanceReviewId, employeeId);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.PERFORMANCE_REVIEWS}/${performanceReviewId}/${employeeId}`,
    });
  });

  it('should call get all pending feedback api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const reviewerId = 1;
    const param = { page: 1, size: 100 };
    getAllPendingFeedback(reviewerId, param);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.PERFORMANCE_FEEDBACKS}${EndpointConstant.PENDING}/${reviewerId}`,
      params: param,
    });

    getAllPendingFeedback(reviewerId);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.PERFORMANCE_FEEDBACKS}${EndpointConstant.PENDING}/${reviewerId}`,
      params: { page: null, size: null },
    });
  });

  it('should call update feedback api with put method', () => {
    const putRequest = jest.spyOn(apiHelper, 'putRequest');
    const reviewerId = 1;
    const pendingFeedback = {
      ...new PendingFeedback(),
      performanceReview: {
        ...new PerformanceReview(),
        id: 2,
      },
      user: {
        ...new Reviewee(),
        id: 3,
      },
      score: 4,
      feedback: 'test',
    };
    updateFeedback(reviewerId, pendingFeedback);

    const params = {
      performanceReviewId: pendingFeedback.performanceReview.id,
      userId: pendingFeedback.user.id,
      reviewerId,
      score: pendingFeedback.score,
      feedback: pendingFeedback.feedback,
    };
    expect(putRequest).toBeCalledWith({
      url: EndpointConstant.PERFORMANCE_FEEDBACKS,
      params,
    });
  });
});
