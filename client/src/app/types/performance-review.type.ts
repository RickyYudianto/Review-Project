import PerformanceReview from '../models/performance-review.model';

export interface PerformanceReviewState {
  performanceReviews: PerformanceReview[];
  formValue: PerformanceReview;
  selected: number[];
  totalData: number;
  page: number;
  size: number;
  loading: boolean;
}

export type ContainerState = PerformanceReviewState;
