import { lazyLoad } from 'utils/loadable';

export const FeedbackListPage = lazyLoad(
  () => import('./index'),
  module => module.FeedbackListPage,
);
