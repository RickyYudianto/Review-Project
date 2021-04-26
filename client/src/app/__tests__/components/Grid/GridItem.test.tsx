import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import GridItem from '../../../components/Grid/GridItem';

let mount;

configure({ adapter: new Adapter() });
describe('<GridItem />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(
      <GridItem>
        <div />
      </GridItem>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
