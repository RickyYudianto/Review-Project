import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import UserAvatar from '../../../components/Avatar/UserAvatar';

let mount;

configure({ adapter: new Adapter() });
describe('<UserAvatar />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render with name length is greater than two and match the snapshot', () => {
    const component = mount(<UserAvatar name="ricky" />);
    expect(component.html()).toMatchSnapshot();
  });
  it('should render with name length is equal two and match the snapshot', () => {
    const component = mount(<UserAvatar name="ri" />);
    expect(component.html()).toMatchSnapshot();
  });
  it('should render with name is empty string and match the snapshot', () => {
    const component = mount(<UserAvatar name="u" />);
    expect(component.html()).toMatchSnapshot();
  });
});
