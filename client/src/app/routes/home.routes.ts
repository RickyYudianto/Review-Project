import Note from '@material-ui/icons/Note';
import People from '@material-ui/icons/People';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';
import { PathConstant } from '../constants/path.constant';

const homeRoutes = [
  {
    path: PathConstant.EMPLOYEE,
    name: 'Employee',
    icon: People,
    component: NotFoundPage,
    base: PathConstant.HOME,
  },
  {
    path: PathConstant.REVIEW,
    name: 'Review',
    icon: Note,
    component: NotFoundPage,
    base: PathConstant.HOME,
  },
];

export default homeRoutes;
