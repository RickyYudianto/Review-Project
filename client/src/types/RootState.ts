import { AuthState } from '../app/types/auth.type';
import { PerformanceFeedbackState } from '../app/types/performance-feedback.type';
import { PerformanceReviewState } from '../app/types/performance-review.type';
import { UserState } from '../app/types/user.type';

export interface RootState {
  authState: AuthState;
  performanceFeedbackState: PerformanceFeedbackState;
  performanceReviewState: PerformanceReviewState;
  userState: UserState;
}
