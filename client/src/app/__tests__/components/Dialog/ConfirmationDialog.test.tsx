import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DefaultButton } from '../../../components/Button';
import ConfirmationDialog from '../../../components/Dialog/ConfirmationDialog';

import '../../../../locales/i18n';

const handleConfirm = jest.fn();
const handleClose = jest.fn();
let mount;

configure({ adapter: new Adapter() });
describe('<ConfirmationDialog />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('open dialog', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <ConfirmationDialog
          contentText="test"
          open
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should call handleConfirm function when yes button clicked', () => {
      const component = mount(
        <ConfirmationDialog
          contentText="test"
          open
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      component.find(DefaultButton).at(1).props().onClick();
      expect(handleConfirm).toBeCalled();
    });
    it('should call handleClose function when no button clicked', () => {
      const component = mount(
        <ConfirmationDialog
          contentText="test"
          open
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      component.find(DefaultButton).at(0).props().onClick();
      expect(handleClose).toBeCalled();
    });
  });

  describe('close dialog', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <ConfirmationDialog
          contentText="test"
          open={false}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
});
