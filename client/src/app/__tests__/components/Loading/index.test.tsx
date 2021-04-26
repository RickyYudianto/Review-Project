import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ButtonCircularProgress } from '../../../components/Loading';

let mount;

configure({ adapter: new Adapter() });
describe('<ButtonCircularProgress />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<ButtonCircularProgress />);
    expect(component.html()).toMatchSnapshot();
  });
});
