import { lazyLoad } from 'utils/loadable';

export const PerformanceReviewListPage = lazyLoad(
  () => import('./index'),
  module => module.PerformanceReviewListPage,
);
