import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { P } from '../../../components/NotFoundPage/P';

let mount;

configure({ adapter: new Adapter() });
describe('<P />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<P />);
    expect(component.html()).toMatchSnapshot();
  });
});
