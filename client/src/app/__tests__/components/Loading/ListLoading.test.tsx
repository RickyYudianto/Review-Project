import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ListLoading from '../../../components/Loading/ListLoading';

let mount;

configure({ adapter: new Adapter() });
describe('<ListLoading />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render with renderActionSection and match the snapshot', () => {
    const component = mount(<ListLoading renderActionSection />);
    expect(component.html()).toMatchSnapshot();
  });

  it('should render without renderActionSection and match the snapshot', () => {
    const component = mount(<ListLoading renderActionSection={false} />);
    expect(component.html()).toMatchSnapshot();
  });
});
