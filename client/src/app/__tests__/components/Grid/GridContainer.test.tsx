import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import GridContainer from '../../../components/Grid/GridContainer';

let mount;

configure({ adapter: new Adapter() });
describe('<GridContainer />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(
      <GridContainer>
        <div />
      </GridContainer>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
