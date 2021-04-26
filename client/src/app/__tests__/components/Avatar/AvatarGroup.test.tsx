import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import AvatarGroup from '../../../components/Avatar/AvatarGroup';

let mount;

configure({ adapter: new Adapter() });
describe('<AvatarGroup />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render with data and match the snapshot', () => {
    const data = [
      {
        id: 1,
        name: 'employee1',
        email: 'employee1@gmail.com',
      },
      {
        id: 2,
        name: 'employee2',
        email: 'employee2@gmail.com',
      },
    ];
    const component = mount(<AvatarGroup arr={data} />);
    expect(component.html()).toMatchSnapshot();
  });
  it('should render without data and match the snapshot', () => {
    const component = mount(<AvatarGroup arr={[]} />);
    expect(component.html()).toMatchSnapshot();
  });
});
