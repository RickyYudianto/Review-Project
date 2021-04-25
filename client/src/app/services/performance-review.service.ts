import * as apiHelper from '../../utils/fetch/api';
import { EndpointConstant } from '../constants/endpoint.constant';
import PerformanceReview from '../models/performance-review.model';

export const getAllPerformanceReview = (
  getParam: { page: number | null; size: number | null } = {
    page: null,
    size: null,
  },
) =>
  apiHelper.getRequest({
    url: EndpointConstant.PERFORMANCE_REVIEWS,
    params: getParam,
  });

export const getPerformanceReviewById = id =>
  apiHelper.getRequest({
    url: `${EndpointConstant.PERFORMANCE_REVIEWS}/${id}`,
  });

export const createPerformanceReview = (performanceReview: PerformanceReview) =>
  apiHelper.postRequest({
    url: EndpointConstant.PERFORMANCE_REVIEWS,
    params: performanceReview,
  });

export const updatePerformanceReview = (performanceReview: PerformanceReview) =>
  apiHelper.putRequest({
    url: EndpointConstant.PERFORMANCE_REVIEWS,
    params: performanceReview,
  });

export const deletePerformanceReview = (id: number[]) =>
  apiHelper.deleteRequest({
    url: EndpointConstant.PERFORMANCE_REVIEWS,
    params: { id },
  });
