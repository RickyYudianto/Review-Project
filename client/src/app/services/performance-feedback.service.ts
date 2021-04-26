import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';
import PendingFeedback from '../models/pending-feedback.model';

export const getAllEmployeePerformanceFeedback = (
  performanceReviewId: number,
  getParam: {
    page: number | null;
    size: number | null;
  } = {
    page: null,
    size: null,
  },
) =>
  apiHelper.getRequest({
    url: `${EndpointConstant.PERFORMANCE_FEEDBACKS}/${performanceReviewId}`,
    params: getParam,
  });

export const getEmployeePerformanceFeedbackById = (
  performanceReviewId: number,
  employeeId: number,
) =>
  apiHelper.getRequest({
    url: `${EndpointConstant.PERFORMANCE_REVIEWS}/${performanceReviewId}/${employeeId}`,
  });

export const getAllPendingFeedback = (
  reviewerId: number,
  getParam: {
    page: number | null;
    size: number | null;
  } = {
    page: null,
    size: null,
  },
) =>
  apiHelper.getRequest({
    url: `${EndpointConstant.PERFORMANCE_FEEDBACKS}${EndpointConstant.PENDING}/${reviewerId}`,
    params: getParam,
  });

export const updateFeedback = (
  reviewerId,
  pendingFeedback: PendingFeedback,
) => {
  const params = {
    performanceReviewId: pendingFeedback.performanceReview.id,
    userId: pendingFeedback.user.id,
    reviewerId,
    score: pendingFeedback.score,
    feedback: pendingFeedback.feedback,
  };

  return apiHelper.putRequest({
    url: EndpointConstant.PERFORMANCE_FEEDBACKS,
    params,
  });
};
