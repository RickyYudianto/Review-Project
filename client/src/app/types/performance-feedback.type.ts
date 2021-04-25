import PerformanceReview from '../models/performance-review.model';
import UserPerformanceFeedback from '../models/user-performance-feedback.model';

export interface PerformanceFeedbackState {
  performanceReview: PerformanceReview;
  userPerformanceFeedbacks: UserPerformanceFeedback[];
  totalData: number;
  page: number;
  size: number;
  loading: boolean;
}

export type ContainerState = PerformanceFeedbackState;
