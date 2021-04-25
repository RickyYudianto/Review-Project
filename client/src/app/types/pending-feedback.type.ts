import PendingFeedback from '../models/pending-feedback.model';

export interface PendingFeedbackState {
  pendingFeedbacks: PendingFeedback[];
  totalData: number;
  page: number;
  size: number;
  loading: boolean;
}

export type ContainerState = PendingFeedbackState;
