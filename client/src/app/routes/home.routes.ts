import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Note from '@material-ui/icons/Note';
import People from '@material-ui/icons/People';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';
import { PathConstant } from '../constants/path.constant';
import { UserTypeEnum } from '../models/user-type.enum';
import { EmployeeListPage } from '../pages/EmployeePage/ListPage/Loadable';

const homeRoutes = [
  {
    path: PathConstant.EMPLOYEE,
    name: 'Employee',
    icon: People,
    component: EmployeeListPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ADMIN,
  },
  {
    path: PathConstant.ASSIGN_EMPLOYEE_REVIEW,
    name: 'Assign Employee Review',
    icon: AssignmentInd,
    component: NotFoundPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ADMIN,
  },
  {
    path: PathConstant.REVIEW,
    name: 'Review',
    icon: Note,
    component: NotFoundPage,
    base: PathConstant.HOME,
    type: UserTypeEnum.ALL,
  },
];

export default homeRoutes;
