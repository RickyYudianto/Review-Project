import IconButton from '@material-ui/core/IconButton';
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Navbar from '../../../components/Navbar';

import '../../../../locales/i18n';
import User from '../../../models/user.model';

const user = {
  ...new User(),
  name: 'ricky',
};
const handleDrawerOpen = jest.fn();
const handleLogout = jest.fn();
let mount;

configure({ adapter: new Adapter() });
describe('<Navbar />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('open drawer and desktop version', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <Navbar
          openDrawer
          isMobile={false}
          user={user}
          title="page title"
          handleDrawerOpen={handleDrawerOpen}
          handleLogout={handleLogout}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should call handleDrawerOpen when menu icon clicked', () => {
      const component = mount(
        <Navbar
          openDrawer
          isMobile={false}
          user={user}
          title="page title"
          handleDrawerOpen={handleDrawerOpen}
          handleLogout={handleLogout}
        />,
      );
      component.find(IconButton).at(0).props().onClick();
      expect(handleDrawerOpen).toBeCalled();
    });
    it('should call handleDrawerOpen when logout icon clicked', () => {
      const component = mount(
        <Navbar
          openDrawer
          isMobile={false}
          user={user}
          title="page title"
          handleDrawerOpen={handleDrawerOpen}
          handleLogout={handleLogout}
        />,
      );
      component.find(IconButton).at(1).props().onClick();
      expect(handleLogout).toBeCalled();
    });
  });

  describe('open drawer and mobile version', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <Navbar
          openDrawer
          isMobile
          user={user}
          title="page title"
          handleDrawerOpen={handleDrawerOpen}
          handleLogout={handleLogout}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });

  describe('close drawer and desktop version', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <Navbar
          openDrawer
          isMobile={false}
          user={user}
          title="page title"
          handleDrawerOpen={handleDrawerOpen}
          handleLogout={handleLogout}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });

  describe('close drawer and mobile version', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <Navbar
          openDrawer
          isMobile
          user={user}
          title="page title"
          handleDrawerOpen={handleDrawerOpen}
          handleLogout={handleLogout}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
});
