import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';

export const getAllEmployeePerformanceFeedback = (
  performanceReviewId: string,
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
