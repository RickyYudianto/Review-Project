import { lazyLoad } from 'utils/loadable';

export const EmployeeDetailPage = lazyLoad(
  () => import('./index'),
  module => module.EmployeeDetailPage,
);
