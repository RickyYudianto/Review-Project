import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import PerformanceReview from './performance-review.model';
import Reviewee from './reviewee.model';

export default class PendingFeedback {
  @Expose()
  @Type(() => PerformanceReview)
  public performanceReview: PerformanceReview = new PerformanceReview();
  @Expose()
  @Type(() => Reviewee)
  public user: Reviewee = new Reviewee();
  @Expose() public score: number = 0;
  @Expose() public feedback: string = '';
}
