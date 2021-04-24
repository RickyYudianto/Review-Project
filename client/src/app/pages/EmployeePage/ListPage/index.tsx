import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import CustomAvatarGroup from '../../../components/Avatar/AvatarGroup';
import { DefaultButton } from '../../../components/Button';
import ConfirmationDialog from '../../../components/Dialog/ConfirmationDialog';
import CustomTable from '../../../components/Table';
import { PathConstant } from '../../../constants/path.constant';
import { fromJsonToArrayOfObject } from '../../../helpers/class-transformer.helper';
import User from '../../../models/user.model';
import {
  selectPage,
  selectSelected,
  selectSize,
  selectTotalData,
  selectUsers,
} from '../../../selectors/user.selector';
import { deleteUser, getAllUser } from '../../../services/user.service';
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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { t } = useTranslation();

  const users = useSelector(selectUsers);
  const selected = useSelector(selectSelected);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const totalData = useSelector(selectTotalData);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const onOpenConfirmationDialog = useCallback(() => {
    setOpenConfirmationDialog(true);
  }, []);

  const onCloseConfirmationDialog = useCallback(() => {
    setOpenConfirmationDialog(false);
  }, []);

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

  const onDelete = useCallback(
    ids => {
      deleteUser(ids)
        .then(() => {
          enqueueSnackbar(
            t(translations.MESSAGE.DELETE_EMPLOYEE_SUCCESS, {
              total: ids.length,
            }),
            {
              variant: 'success',
            },
          );
          onCloseConfirmationDialog();
          dispatch(userActions.selectAll(ids));
          if (page === 1) {
            fetchList();
          } else {
            dispatch(userActions.setPage(1));
          }
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.DELETE_EMPLOYEE_FAILED, {
              total: ids.length,
            }),
            {
              variant: 'error',
            },
          ),
        );
    },
    [dispatch, enqueueSnackbar, fetchList, onCloseConfirmationDialog, page, t],
  );

  const onHandleChangePage = page => {
    dispatch(userActions.setPage(page));
  };

  const onHandleChangeSize = size => {
    dispatch(userActions.setSize(size));
  };

  const onHandleCheck = id => {
    dispatch(userActions.setSelected(id));
  };

  const onHandleCheckAll = ids => {
    dispatch(userActions.selectAll(ids));
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
      <ConfirmationDialog
        contentText={t(translations.MESSAGE.DELETE_EMPLOYEE_CONFIRMATION, {
          total: selected.length,
        })}
        open={openConfirmationDialog}
        handleClose={onCloseConfirmationDialog}
        handleConfirm={() => onDelete(selected)}
      />
      <div>
        <Box display="flex" justifyContent="space-between">
          <DefaultButton
            color="secondary"
            variant="contained"
            onClick={onOpenConfirmationDialog}
            disabled={selected.length === 0}
          >
            <Icon>delete</Icon>
            {t(translations.LABEL.DELETE)}
          </DefaultButton>
          <DefaultButton
            color="primary"
            variant="contained"
            onClick={() =>
              history.push(
                `${PathConstant.HOME}${PathConstant.EMPLOYEE}${PathConstant.ADD}`,
              )
            }
          >
            <Icon>add</Icon>
            {t(translations.LABEL.ADD)}
          </DefaultButton>
        </Box>
        <CustomTable
          tableHead={[
            <Checkbox
              color="primary"
              checked={
                users.filter(user => selected.find(id => user.id === id))
                  .length === users.length
              }
              onChange={() => onHandleCheckAll(users.map(user => user.id))}
            />,
            t(translations.LABEL.EDIT),
            t(translations.LABEL.NAME),
            t(translations.LABEL.EMAIL_ADDRESS),
            t(translations.LABEL.ACTIVE),
            t(translations.LABEL.TYPE),
            t(translations.LABEL.REVIEWERS),
            t(translations.LABEL.REVIEWEES),
          ]}
          tableData={users.map(user => {
            return [
              <Checkbox
                color="primary"
                checked={selected.findIndex(id => id === user.id) > -1}
                onChange={() => onHandleCheck(user.id)}
              />,
              <IconButton
                onClick={() =>
                  history.push(
                    `${PathConstant.HOME}${PathConstant.EMPLOYEE}/${user.id}${PathConstant.EDIT}`,
                  )
                }
              >
                <Icon>edit</Icon>
              </IconButton>,
              user.name,
              user.email,
              user.isActive ? (
                <Icon className={classes.checkIcon}>check</Icon>
              ) : (
                <Icon className={classes.clearIcon}>clear</Icon>
              ),
              user.userType?.name,
              <CustomAvatarGroup arr={user.reviewers} />,
              <CustomAvatarGroup arr={user.reviewees} />,
            ];
          })}
          totalData={totalData}
          page={page}
          size={size}
          handleChangePage={page => onHandleChangePage(page)}
          handleChangeSize={size => onHandleChangeSize(size)}
        />
      </div>
    </>
  );
}
