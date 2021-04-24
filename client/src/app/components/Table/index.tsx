import { MenuItem, Select, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import React, { useMemo } from 'react';

const tableStyle = makeStyles((theme: Theme) => ({
  table: {
    marginBottom: '0',
    width: '100%',
    minWidth: '600px',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    fontSize: '1em',
    left: 'unset',
    top: '-1px',
    fontWeight: 'bold',
  },
  tableCell: {
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  tablePagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}));

interface IProps {
  tableHead: string[];
  tableData: any[][];
  totalData: number;
  page: number;
  size: number;
  handleChangePage: (page) => void;
  handleChangeSize: (event) => void;
}

export default function CustomTable(props: IProps) {
  const {
    tableHead,
    tableData,
    totalData,
    page,
    size,
    handleChangePage,
    handleChangeSize,
  } = props;
  const classes = tableStyle();

  const totalMaxPage = useMemo(() => {
    const itemDivide = Math.floor(totalData / size);

    if (totalData > size) {
      return totalData % size === 0 ? itemDivide : itemDivide + 1;
    } else {
      return 1;
    }
  }, [totalData, size]);

  return (
    <div className={classes.tableResponsive}>
      <TableContainer>
        <Table className={classes.table} stickyHeader>
          {tableHead !== undefined ? (
            <TableHead>
              <TableRow>
                {tableHead.map((prop: any, key: any) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop: any, key: any) => {
              return (
                <TableRow key={key}>
                  {prop.map((p: any, k: any) => {
                    return (
                      <TableCell className={classes.tableCell} key={k}>
                        {p}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        paginationClass={classes.tablePagination}
        page={page}
        size={size}
        totalMaxPage={totalMaxPage}
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />
    </div>
  );
}

interface PaginationIProps {
  paginationClass: any;
  page: number;
  size: number;
  totalMaxPage: number;
  handleChangePage: (page) => void;
  handleChangeSize: (size) => void;
}

function TablePagination(props: PaginationIProps) {
  const {
    paginationClass,
    page,
    size,
    totalMaxPage,
    handleChangePage,
    handleChangeSize,
  } = props;
  return (
    <Box className={paginationClass}>
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
