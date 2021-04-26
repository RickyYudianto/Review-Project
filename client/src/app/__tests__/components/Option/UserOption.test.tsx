import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import UserOption from '../../../components/Option/UserOption';

const option = {
  name: 'option',
};
let mount;

configure({ adapter: new Adapter() });
describe('<UserOption />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render checked and match the snapshot', () => {
    const component = mount(<UserOption option={option} checked />);
    expect(component.html()).toMatchSnapshot();
  });

  it('should render unchecked and match the snapshot', () => {
    const component = mount(<UserOption option={option} checked={false} />);
    expect(component.html()).toMatchSnapshot();
  });
});
