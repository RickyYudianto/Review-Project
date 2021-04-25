import { lazyLoad } from 'utils/loadable';

export const PerformanceReviewDetailPage = lazyLoad(
  () => import('./index'),
  module => module.PerformanceReviewDetailPage,
);
