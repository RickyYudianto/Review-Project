import { lazyLoad } from 'utils/loadable';

export const PerformanceReviewViewPage = lazyLoad(
  () => import('./index'),
  module => module.PerformanceReviewViewPage,
);
