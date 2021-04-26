import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { NotFoundPage } from '../../../components/NotFoundPage';

let mount;

configure({ adapter: new Adapter() });
describe('<NotFoundPage />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(
      <HelmetProvider context={{}}>
        <NotFoundPage />
      </HelmetProvider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
