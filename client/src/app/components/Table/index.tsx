import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';
import { CustomPagination } from '../Pagination';

const useStyle = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '150px',
  },
  table: {
    marginBottom: '0',
    width: '100%',
    minWidth: '800px',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    color: theme.palette.primary.main,
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
}));

interface IProps {
  tableHead: any[];
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
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <div className={classes.tableResponsive}>
      <TableContainer className={classes.container}>
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
                      width={prop.width}
                    >
                      {prop.display}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((prop: any, key: any) => {
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
              })
            ) : (
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  colSpan={tableHead?.length}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <h4>{t(translations.LABEL.NO_DATA_AVAILABLE)}</h4>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        page={page}
        size={size}
        totalData={totalData}
        handleChangePage={handleChangePage}
        handleChangeSize={handleChangeSize}
      />
    </div>
  );
}
