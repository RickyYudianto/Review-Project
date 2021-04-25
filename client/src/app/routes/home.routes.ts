import EventIcon from '@material-ui/icons/Event';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PeopleIcon from '@material-ui/icons/People';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';
import { PathConstant } from '../constants/path.constant';
import { UserTypeEnum } from '../models/user-type.enum';
import { EmployeeDetailPage } from '../pages/EmployeePage/DetailPage/Loadable';
import { EmployeeListPage } from '../pages/EmployeePage/ListPage/Loadable';
import { PerformanceReviewDetailPage } from '../pages/PerformanceReviewPage/DetailPage/Loadable';
import { PerformanceReviewListPage } from '../pages/PerformanceReviewPage/ListPage/Loadable';
import { PerformanceReviewViewPage } from '../pages/PerformanceReviewPage/ViewPage/Loadable';

const homeRoutes = [
  {
    path: PathConstant.EMPLOYEE,
    name: 'Employee',
    icon: PeopleIcon,
    component: EmployeeListPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ADMIN,
    subRoute: [
      {
        path: PathConstant.ADD,
        name: 'Add',
        component: EmployeeDetailPage,
      },
      {
        path: `/:id${PathConstant.EDIT}`,
        name: 'Edit',
        component: EmployeeDetailPage,
      },
    ],
  },
  {
    path: PathConstant.PERFORMANCE_REVIEW,
    name: 'Performance Review',
    icon: EventIcon,
    component: PerformanceReviewListPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ADMIN,
    subRoute: [
      {
        path: PathConstant.ADD,
        name: 'Add',
        component: PerformanceReviewDetailPage,
      },
      {
        path: `/:id${PathConstant.EDIT}`,
        name: 'Edit',
        component: PerformanceReviewDetailPage,
      },
      {
        path: `/:id${PathConstant.VIEW}`,
        name: 'View',
        component: PerformanceReviewViewPage,
      },
    ],
  },
  {
    path: PathConstant.FEEDBACK,
    name: 'Feedback',
    icon: FeedbackIcon,
    component: NotFoundPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ALL,
  },
];

export default homeRoutes;
