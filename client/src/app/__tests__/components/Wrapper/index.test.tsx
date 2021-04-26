import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  ActionWrapper,
  ErrorWrapper,
  FormControlWrapper,
  LoginWrapper,
  PaperWrapper,
} from '../../../components/Wrapper';

let mount;

configure({ adapter: new Adapter() });
describe('<ActionWrapper />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<ActionWrapper />);
    expect(component.html()).toMatchSnapshot();
  });
});

describe('<ErrorWrapper />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<ErrorWrapper />);
    expect(component.html()).toMatchSnapshot();
  });
});

describe('<FormControlWrapper />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<FormControlWrapper />);
    expect(component.html()).toMatchSnapshot();
  });
});

describe('<LoginWrapper />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<LoginWrapper />);
    expect(component.html()).toMatchSnapshot();
  });
});

describe('<PaperWrapper />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(<PaperWrapper />);
    expect(component.html()).toMatchSnapshot();
  });
});
