import EventIcon from '@material-ui/icons/Event';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PeopleIcon from '@material-ui/icons/People';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';
import { PathConstant } from '../constants/path.constant';
import { UserTypeEnum } from '../models/user-type.enum';
import { EmployeeDetailPage } from '../pages/EmployeePage/DetailPage/Loadable';
import { EmployeeListPage } from '../pages/EmployeePage/ListPage/Loadable';

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
    component: NotFoundPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ADMIN,
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
