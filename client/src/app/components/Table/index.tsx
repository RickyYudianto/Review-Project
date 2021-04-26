import Box from '@material-ui/core/Box';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';
import CustomPagination from '../Pagination';

const style = createStyles(theme => ({
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
  classes: any;
  tableHead: any[];
  tableData: any[][];
  totalData: number;
  page: number;
  size: number;
  handleChangePage: (page) => void;
  handleChangeSize: (event) => void;
}

function CustomTable(props: IProps) {
  const {
    classes,
    tableHead,
    tableData,
    totalData,
    page,
    size,
    handleChangePage,
    handleChangeSize,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={classes.tableResponsive}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader>
          {tableHead.length > 0 ? (
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

export default withStyles(style)(CustomTable);
