import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DefaultButton, FullWidthButton } from '../../../components/Button';

let mount;

configure({ adapter: new Adapter() });
describe('<DefaultButton />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<DefaultButton />);
    expect(component.html()).toMatchSnapshot();
  });
});

describe('<FullWidthButton />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<FullWidthButton />);
    expect(component.html()).toMatchSnapshot();
  });
});
