import * as apiHelper from '../../../utils/fetch/api';
import { EndpointConstant } from '../../constants/endpoint.constant';
import PerformanceReview from '../../models/performance-review.model';
import {
  createPerformanceReview,
  deletePerformanceReview,
  getAllPerformanceReview,
  getPerformanceReviewById,
  updatePerformanceReview,
} from '../../services/performance-review.service';

describe('performance-review.service.ts', () => {
  it('should call get all performance review api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const param = { page: 1, size: 100 };
    getAllPerformanceReview(param);
    expect(getRequest).toBeCalledWith({
      url: EndpointConstant.PERFORMANCE_REVIEWS,
      params: param,
    });

    getAllPerformanceReview();
    expect(getRequest).toBeCalledWith({
      url: EndpointConstant.PERFORMANCE_REVIEWS,
      params: { page: null, size: null },
    });
  });

  it('should call get performance review by id api with get method', () => {
    const getRequest = jest.spyOn(apiHelper, 'getRequest');
    const id = 1;
    getPerformanceReviewById(id);
    expect(getRequest).toBeCalledWith({
      url: `${EndpointConstant.PERFORMANCE_REVIEWS}/${id}`,
    });
  });

  it('should call create user api with post method', () => {
    const postRequest = jest.spyOn(apiHelper, 'postRequest');
    const performanceReview = new PerformanceReview();
    createPerformanceReview(performanceReview);
    expect(postRequest).toBeCalledWith({
      url: EndpointConstant.PERFORMANCE_REVIEWS,
      params: performanceReview,
    });
  });

  it('should call update performance review api with put method', () => {
    const putRequest = jest.spyOn(apiHelper, 'putRequest');
    const performanceReview = new PerformanceReview();
    updatePerformanceReview(performanceReview);
    expect(putRequest).toBeCalledWith({
      url: EndpointConstant.PERFORMANCE_REVIEWS,
      params: performanceReview,
    });
  });

  it('should call delete performance review api with delete method', () => {
    const deleteRequest = jest.spyOn(apiHelper, 'deleteRequest');
    const id = [1, 2, 3];
    deletePerformanceReview(id);
    expect(deleteRequest).toBeCalledWith({
      url: EndpointConstant.PERFORMANCE_REVIEWS,
      params: { id },
    });
  });
});
