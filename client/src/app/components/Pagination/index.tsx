import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useMemo } from 'react';

const paginationStyle = makeStyles((theme: Theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}));

interface PaginationIProps {
  page: number;
  size: number;
  totalData: number;
  handleChangePage: (page) => void;
  handleChangeSize: (size) => void;
}

export function CustomPagination(props: PaginationIProps) {
  const { page, size, totalData, handleChangePage, handleChangeSize } = props;
  const classes = paginationStyle();

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
