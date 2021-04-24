import makeStyles from '@material-ui/core/styles/makeStyles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import CustomTable from '../../../components/Table';
import { fromJsonToArrayOfObject } from '../../../helpers/class-transformer.helper';
import User from '../../../models/user.model';
import {
  selectPage,
  selectSize,
  selectTotalData,
  selectUsers,
} from '../../../selectors/user.selector';
import { getAllUser } from '../../../services/user.service';
import {
  actions as userActions,
  reducer as userReducer,
  sliceKey as userSliceKey,
} from '../../../slices/user.slice';

const useStyles = makeStyles(theme => ({
  checkIcon: {
    color: '#5cb85c',
  },
  clearIcon: {
    color: '#df4759',
  },
}));

export function EmployeeListPage() {
  useInjectReducer({ key: userSliceKey, reducer: userReducer });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  const users = useSelector(selectUsers);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const totalData = useSelector(selectTotalData);

  const fetchList = useCallback(() => {
    getAllUser({
      page,
      size,
    }).then((result: any) => {
      const users: User[] = fromJsonToArrayOfObject(User, result.users);
      dispatch(userActions.setList(users));
      dispatch(userActions.setTotalData(result.totalData));
    });
  }, [dispatch, page, size]);

  const onHandleChangePage = page => {
    dispatch(userActions.setPage(page));
  };

  const onHandleChangeSize = size => {
    dispatch(userActions.setSize(size));
  };

  useEffect(() => {
    fetchList();
  }, [fetchList, page, size]);

  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.EMPLOYEE_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.EMPLOYEE_PAGE)}
        />
      </Helmet>
      <CustomTable
        tableHead={[
          t(translations.LABEL.NAME),
          t(translations.LABEL.EMAIL_ADDRESS),
          t(translations.LABEL.ACTIVE),
          t(translations.LABEL.TYPE),
        ]}
        tableData={users.map(user => {
          return [
            user.name,
            user.email,
            user.isActive ? (
              <CheckIcon className={classes.checkIcon} />
            ) : (
              <ClearIcon className={classes.clearIcon} />
            ),
            user.userType.name,
          ];
        })}
        totalData={totalData}
        page={page}
        size={size}
        handleChangePage={page => onHandleChangePage(page)}
        handleChangeSize={size => onHandleChangeSize(size)}
      />
    </>
  );
}
