import IconButton from '@material-ui/core/IconButton';
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import routes from '../../../routes/home.routes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/home/employee',
  }),
}));

const handleDrawerClose = jest.fn();
let mount;

configure({ adapter: new Adapter() });
describe('<Sidebar />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('open sidebar', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <MemoryRouter>
          <Sidebar open routes={routes} handleDrawerClose={handleDrawerClose} />
        </MemoryRouter>,
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should call handleDrawerClose when chevron icon clicked', () => {
      const component = mount(
        <MemoryRouter>
          <Sidebar open routes={routes} handleDrawerClose={handleDrawerClose} />
        </MemoryRouter>,
      );
      component.find(IconButton).props().onClick();
      expect(handleDrawerClose).toBeCalled();
    });
  });

  describe('close sidebar', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <MemoryRouter>
          <Sidebar
            open={false}
            routes={routes}
            handleDrawerClose={handleDrawerClose}
          />
        </MemoryRouter>,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
});
