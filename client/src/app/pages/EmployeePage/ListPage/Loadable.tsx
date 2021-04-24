import { lazyLoad } from 'utils/loadable';

export const EmployeeListPage = lazyLoad(
  () => import('./index'),
  module => module.EmployeeListPage,
);
