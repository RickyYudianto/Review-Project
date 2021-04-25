import Icon from '@material-ui/core/Icon';
import format from 'date-fns/format';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import UserAvatar from '../../../components/Avatar/UserAvatar';
import { DefaultButton } from '../../../components/Button';
import FeedbackDialog from '../../../components/Dialog/FeedbackDialog';
import { ListLoading } from '../../../components/Loading/ListLoading';
import CustomTable from '../../../components/Table';
import { SettingConstant } from '../../../constants/setting.constant';
import { fromJsonToArrayOfObject } from '../../../helpers/class-transformer.helper';
import PendingFeedback from '../../../models/pending-feedback.model';
import { selectUser } from '../../../selectors/auth.selector';
import {
  selectLoading,
  selectPage,
  selectPendingFeedbacks,
  selectSize,
  selectTotalData,
} from '../../../selectors/pending-feedback.selector';
import {
  getAllPendingFeedback,
  updateFeedback,
} from '../../../services/performance-feedback.service';
import {
  actions as pendingFeedbackActions,
  reducer as pendingFeedbackReducer,
  sliceKey as pendingFeedbackSliceKey,
} from '../../../slices/pending-feedback.slice';

export function FeedbackListPage() {
  useInjectReducer({
    key: pendingFeedbackSliceKey,
    reducer: pendingFeedbackReducer,
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const user = useSelector(selectUser);
  const pendingFeedbacks = useSelector(selectPendingFeedbacks);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const totalData = useSelector(selectTotalData);
  const loading = useSelector(selectLoading);

  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState(new PendingFeedback());

  const onOpenFeedbackDialog = useCallback(() => {
    setOpenFeedbackDialog(true);
  }, []);

  const onCloseFeedbackDialog = useCallback(() => {
    setOpenFeedbackDialog(false);
  }, []);

  const fetchList = useCallback(() => {
    dispatch(pendingFeedbackActions.setLoading(true));
    const reviewerId = user && user.id ? user.id.toString() : '';
    getAllPendingFeedback(reviewerId, {
      page,
      size,
    })
      .then((result: any) => {
        dispatch(pendingFeedbackActions.setLoading(false));
        const pendingFeedbacks: PendingFeedback[] = fromJsonToArrayOfObject(
          PendingFeedback,
          result.pendingFeedbacks,
        );
        dispatch(pendingFeedbackActions.setList(pendingFeedbacks));
        dispatch(pendingFeedbackActions.setTotalData(result.totalData));
      })
      .catch(() => dispatch(pendingFeedbackActions.setLoading(false)));
  }, [dispatch, page, size, user]);

  const onHandleChangePage = page => {
    dispatch(pendingFeedbackActions.setPage(page));
  };

  const onHandleChangeSize = size => {
    dispatch(pendingFeedbackActions.setSize(size));
  };

  const onSubmit = useCallback(
    (user, selectedValue) => {
      updateFeedback(user?.id, selectedValue)
        .then(() => {
          enqueueSnackbar(
            t(translations.MESSAGE.WRITE_FEEDBACK_SUCCESS, {
              period: `${format(
                new Date(selectedValue.performanceReview.periodStart),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )} ~ ${format(
                new Date(selectedValue.performanceReview.periodEnd),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )}`,
              employee: selectedValue.user.name,
            }),
            {
              variant: 'success',
            },
          );
          onCloseFeedbackDialog();
          if (page === 1) {
            fetchList();
          } else {
            dispatch(pendingFeedbackActions.setPage(1));
          }
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.WRITE_FEEDBACK_FAILED, {
              period: `${format(
                new Date(selectedValue.performanceReview.periodStart),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )} ~ ${format(
                new Date(selectedValue.performanceReview.periodEnd),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )}`,
              employee: selectedValue.user.name,
            }),
            {
              variant: 'error',
            },
          ),
        );
    },
    [dispatch, enqueueSnackbar, fetchList, onCloseFeedbackDialog, page, t],
  );

  useEffect(() => {
    fetchList();
  }, [fetchList, page, size]);

  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.FEEDBACK_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.FEEDBACK_PAGE)}
        />
      </Helmet>
      <FeedbackDialog
        formValue={selectedValue}
        open={openFeedbackDialog}
        handleClose={onCloseFeedbackDialog}
        handleConfirm={() => onSubmit(user, selectedValue)}
        onChangeFormValue={value =>
          setSelectedValue({
            ...selectedValue,
            ...value,
          })
        }
      />
      {pendingFeedbacks.length <= 0 && loading ? (
        <ListLoading renderActionSection={false} />
      ) : (
        <div>
          <CustomTable
            tableHead={[
              {
                display: t(translations.LABEL.REVIEW_PERIOD),
                width: '250px',
              },
              {
                display: t(translations.LABEL.FEEDBACK_PERIOD),
                width: '250px',
              },
              {
                display: t(translations.LABEL.NAME),
              },
              {
                display: t(translations.LABEL.EMAIL_ADDRESS),
              },
              {
                display: t(translations.LABEL.ACTION),
                width: '150px',
              },
            ]}
            tableData={pendingFeedbacks.map(pendingFeedback => {
              return [
                `${format(
                  new Date(pendingFeedback.performanceReview.periodStart),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )} ~ ${format(
                  new Date(pendingFeedback.performanceReview.periodEnd),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )}`,
                `${format(
                  new Date(pendingFeedback.performanceReview.feedbackStart),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )} ~ ${format(
                  new Date(pendingFeedback.performanceReview.feedbackEnd),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )}`,
                <UserAvatar name={pendingFeedback.user.name} />,
                pendingFeedback.user.email,
                <DefaultButton
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setSelectedValue(pendingFeedback);
                    onOpenFeedbackDialog();
                  }}
                >
                  <Icon style={{ marginRight: '6px' }}>drafts</Icon>
                  {t(translations.LABEL.WRITE)}
                </DefaultButton>,
              ];
            })}
            totalData={totalData}
            page={page}
            size={size}
            handleChangePage={page => onHandleChangePage(page)}
            handleChangeSize={size => onHandleChangeSize(size)}
          />
        </div>
      )}
    </>
  );
}
