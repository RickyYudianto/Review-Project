import { lazyLoad } from 'utils/loadable';

export const RootPage = lazyLoad(
  () => import('./index'),
  module => module.RootPage,
);
