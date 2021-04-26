import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import PerformanceReviewViewLoading from '../../../components/Loading/PerformanceReviewViewLoading';

let mount;

configure({ adapter: new Adapter() });
describe('<PerformanceReviewViewLoading />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<PerformanceReviewViewLoading />);
    expect(component.html()).toMatchSnapshot();
  });
});
