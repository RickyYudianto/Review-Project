import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import PerformanceFeedback from './performance-feedback.model';
import PerformanceReview from './performance-review.model';

export default class UserPerformanceFeedback {
  @Expose() public id: number | null = null;
  @Expose() public email: string = '';
  @Expose() public name: string = '';
  @Expose()
  @Type(() => PerformanceReview)
  public performanceReview: PerformanceReview = new PerformanceReview();
  @Expose()
  @Type(() => PerformanceFeedback)
  public performanceFeedbacks: PerformanceFeedback[] = [];
}
