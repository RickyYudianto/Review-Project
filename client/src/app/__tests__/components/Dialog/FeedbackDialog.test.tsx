import Input from '@material-ui/core/Input';
import RadioGroup from '@material-ui/core/RadioGroup';
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DefaultButton } from '../../../components/Button';
import FeedbackDialog from '../../../components/Dialog/FeedbackDialog';
import PendingFeedback from '../../../models/pending-feedback.model';
import PerformanceReview from '../../../models/performance-review.model';
import Reviewee from '../../../models/reviewee.model';

import '../../../../locales/i18n';

const data = {
  ...new PendingFeedback(),
  performanceReview: {
    ...new PerformanceReview(),
    id: 1,
  },
  user: {
    ...new Reviewee(),
    id: 1,
    name: 'reviewee',
    email: 'reviewee@gmail.com',
  },
};
const handleConfirm = jest.fn();
const handleClose = jest.fn();
const onChangeFormValue = jest.fn();
let mount;

configure({ adapter: new Adapter() });
describe('<FeedbackDialog />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('open dialog', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <FeedbackDialog
          formValue={data}
          open
          onChangeFormValue={onChangeFormValue}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should call handleClose when cancel button clicked', () => {
      const component = mount(
        <FeedbackDialog
          formValue={data}
          open
          onChangeFormValue={onChangeFormValue}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      component.find(DefaultButton).at(0).props().onClick();
      expect(handleClose).toBeCalled();
    });
    it('should call handleConfirm when send button clicked', () => {
      const component = mount(
        <FeedbackDialog
          formValue={data}
          open
          onChangeFormValue={onChangeFormValue}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      component.find(DefaultButton).at(1).props().onClick();
      expect(handleConfirm).toBeCalled();
    });
    it('should call onChangeFormValue when form value changed', () => {
      const component = mount(
        <FeedbackDialog
          formValue={data}
          open
          onChangeFormValue={onChangeFormValue}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      component
        .find(RadioGroup)
        .props()
        .onChange({ target: { value: 0 } });
      expect(onChangeFormValue).toBeCalled();
      component
        .find(Input)
        .props()
        .onChange({
          target: {
            value: 'feedback',
          },
        });
      expect(onChangeFormValue).toBeCalled();
    });
  });

  describe('close dialog', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <FeedbackDialog
          formValue={data}
          open={false}
          onChangeFormValue={onChangeFormValue}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
});
