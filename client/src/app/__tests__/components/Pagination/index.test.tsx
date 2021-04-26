import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import { createMount } from '@material-ui/core/test-utils';
import Pagination from '@material-ui/lab/Pagination';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import CustomPagination from '../../../components/Pagination';

import '../../../../locales/i18n';

const handleChangePage = jest.fn();
const handleChangeSize = jest.fn();
let mount;

configure({ adapter: new Adapter() });
describe('<CustomPagination />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render and match the snapshot', () => {
    const component = mount(
      <CustomPagination
        page={1}
        size={10}
        totalData={100}
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('should call handleChangeSize when size changed', () => {
    const component = mount(
      <CustomPagination
        page={1}
        size={10}
        totalData={3}
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />,
    );
    component
      .find(Select)
      .props()
      .onChange({ target: { value: 25 } });
    expect(handleChangeSize).toBeCalled();
  });

  it('should call handleChangePage when page changed', () => {
    const component = mount(
      <CustomPagination
        page={1}
        size={10}
        totalData={97}
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />,
    );
    component.find(Pagination).props().onChange(2);
    expect(handleChangePage).toBeCalled();
  });
});
