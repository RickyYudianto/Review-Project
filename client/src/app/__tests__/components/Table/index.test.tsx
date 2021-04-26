import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import CustomTable from '../../../components/Table';

import '../../../../locales/i18n';

const tableHead = [
  {
    width: '100px',
    display: 'col 1',
  },
  {
    width: '100px',
    display: 'col 2',
  },
];
const tableData = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const handleChangePage = jest.fn();
const handleChangeSize = jest.fn();
let mount;

configure({ adapter: new Adapter() });
describe('<CustomTable />', () => {
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('with data', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <CustomTable
          page={1}
          size={10}
          totalData={100}
          handleChangePage={handleChangePage}
          handleChangeSize={handleChangeSize}
          tableHead={tableHead}
          tableData={tableData}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });

  describe('without data', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <CustomTable
          page={1}
          size={10}
          totalData={0}
          handleChangePage={handleChangePage}
          handleChangeSize={handleChangeSize}
          tableHead={tableHead}
          tableData={[]}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });

  describe('without head', () => {
    it('should render and match the snapshot', () => {
      const component = mount(
        <CustomTable
          page={1}
          size={10}
          totalData={100}
          handleChangePage={handleChangePage}
          handleChangeSize={handleChangeSize}
          tableHead={[]}
          tableData={tableData}
        />,
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
});
