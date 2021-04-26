import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useMemo } from 'react';

const style = createStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}));

interface IProps {
  classes: any;
  page: number;
  size: number;
  totalData: number;
  handleChangePage: (page) => void;
  handleChangeSize: (size) => void;
}

function CustomPagination(props: IProps) {
  const {
    classes,
    page,
    size,
    totalData,
    handleChangePage,
    handleChangeSize,
  } = props;

  const totalMaxPage = useMemo(() => {
    const itemDivide = Math.floor(totalData / size);

    if (totalData > size) {
      return totalData % size === 0 ? itemDivide : itemDivide + 1;
    } else {
      return 1;
    }
  }, [totalData, size]);

  return (
    <Box className={classes.pagination}>
      <Select value={size} onChange={e => handleChangeSize(e.target.value)}>
        {[1, 5, 10, 25, 50, 100].map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <Pagination
        variant="outlined"
        shape="rounded"
        page={page}
        count={totalMaxPage}
        boundaryCount={2}
        onChange={(event, page) => handleChangePage(page)}
      />
    </Box>
  );
}

export default withStyles(style)(CustomPagination);
