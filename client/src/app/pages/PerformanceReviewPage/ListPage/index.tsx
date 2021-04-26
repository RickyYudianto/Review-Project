import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import format from 'date-fns/format';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import { DefaultButton } from '../../../components/Button';
import ConfirmationDialog from '../../../components/Dialog/ConfirmationDialog';
import ListLoading from '../../../components/Loading/ListLoading';
import CustomTable from '../../../components/Table';
import { PathConstant } from '../../../constants/path.constant';
import { SettingConstant } from '../../../constants/setting.constant';
import { fromJsonToArrayOfObject } from '../../../helpers/class-transformer.helper';
import PerformanceReview from '../../../models/performance-review.model';
import {
  selectLoading,
  selectPage,
  selectPerformanceReviews,
  selectSelected,
  selectSize,
  selectTotalData,
} from '../../../selectors/performance-review.selector';
import {
  deletePerformanceReview,
  getAllPerformanceReview,
} from '../../../services/performance-review.service';
import {
  actions as performanceReviewActions,
  reducer as performanceReviewReducer,
  sliceKey as performanceReviewSliceKey,
} from '../../../slices/performance-review.slice';

export function PerformanceReviewListPage() {
  useInjectReducer({
    key: performanceReviewSliceKey,
    reducer: performanceReviewReducer,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const performanceReviews = useSelector(selectPerformanceReviews);
  const selected = useSelector(selectSelected);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const totalData = useSelector(selectTotalData);
  const loading = useSelector(selectLoading);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const onOpenConfirmationDialog = useCallback(() => {
    setOpenConfirmationDialog(true);
  }, []);

  const onCloseConfirmationDialog = useCallback(() => {
    setOpenConfirmationDialog(false);
  }, []);

  const fetchList = useCallback(() => {
    dispatch(performanceReviewActions.setLoading(true));
    getAllPerformanceReview({
      page,
      size,
    })
      .then((result: any) => {
        dispatch(performanceReviewActions.setLoading(false));
        const performanceReviews: PerformanceReview[] = fromJsonToArrayOfObject(
          PerformanceReview,
          result.performanceReviews,
        );
        dispatch(performanceReviewActions.setList(performanceReviews));
        dispatch(performanceReviewActions.setTotalData(result.totalData));
      })
      .catch(() => dispatch(performanceReviewActions.setLoading(false)));
  }, [dispatch, page, size]);

  const onDelete = useCallback(
    ids => {
      deletePerformanceReview(ids)
        .then(() => {
          enqueueSnackbar(
            t(translations.MESSAGE.DELETE_PERFORMANCE_REVIEW_SUCCESS, {
              total: ids.length,
            }),
            {
              variant: 'success',
            },
          );
          onCloseConfirmationDialog();
          dispatch(performanceReviewActions.selectAll(ids));
          if (page === 1) {
            fetchList();
          } else {
            dispatch(performanceReviewActions.setPage(1));
          }
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.DELETE_PERFORMANCE_REVIEW_FAILED, {
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
    dispatch(performanceReviewActions.setPage(page));
  };

  const onHandleChangeSize = size => {
    dispatch(performanceReviewActions.setSize(size));
  };

  const onHandleCheck = id => {
    dispatch(performanceReviewActions.setSelected(id));
  };

  const onHandleCheckAll = ids => {
    dispatch(performanceReviewActions.selectAll(ids));
  };

  useEffect(() => {
    fetchList();
  }, [fetchList, page, size]);

  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.PERFORMANCE_REVIEW_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.PERFORMANCE_REVIEW_PAGE)}
        />
      </Helmet>
      <ConfirmationDialog
        contentText={t(
          translations.MESSAGE.DELETE_PERFORMANCE_REVIEW_CONFIRMATION,
          {
            total: selected.length,
          },
        )}
        open={openConfirmationDialog}
        handleClose={onCloseConfirmationDialog}
        handleConfirm={() => onDelete(selected)}
      />
      {performanceReviews.length <= 0 && loading ? (
        <ListLoading renderActionSection />
      ) : (
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
                  `${PathConstant.HOME}${PathConstant.PERFORMANCE_REVIEW}${PathConstant.ADD}`,
                )
              }
            >
              <Icon>add</Icon>
              {t(translations.LABEL.ADD)}
            </DefaultButton>
          </Box>
          <CustomTable
            tableHead={[
              {
                display: (
                  <Checkbox
                    color="primary"
                    checked={
                      performanceReviews.length > 0 &&
                      performanceReviews.filter(performanceReview =>
                        selected.find(id => performanceReview.id === id),
                      ).length === performanceReviews.length
                    }
                    onChange={() =>
                      onHandleCheckAll(
                        performanceReviews.map(
                          performanceReview => performanceReview.id,
                        ),
                      )
                    }
                  />
                ),
                width: '75px',
              },
              {
                display: t(translations.LABEL.VIEW),
                width: '75px',
              },
              {
                display: t(translations.LABEL.EDIT),
                width: '75px',
              },
              {
                display: t(translations.LABEL.REVIEW_PERIOD),
              },
              {
                display: t(translations.LABEL.FEEDBACK_PERIOD),
              },
            ]}
            tableData={performanceReviews.map(performanceReview => {
              return [
                <Checkbox
                  color="primary"
                  checked={
                    selected.findIndex(id => id === performanceReview.id) > -1
                  }
                  onChange={() => onHandleCheck(performanceReview.id)}
                />,
                <IconButton
                  onClick={() =>
                    history.push(
                      `${PathConstant.HOME}${PathConstant.PERFORMANCE_REVIEW}/${performanceReview.id}${PathConstant.VIEW}`,
                    )
                  }
                >
                  <Icon>visibility_on</Icon>
                </IconButton>,
                <IconButton
                  onClick={() =>
                    history.push(
                      `${PathConstant.HOME}${PathConstant.PERFORMANCE_REVIEW}/${performanceReview.id}${PathConstant.EDIT}`,
                    )
                  }
                >
                  <Icon>edit</Icon>
                </IconButton>,
                `${format(
                  new Date(performanceReview.periodStart),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )} ~ ${format(
                  new Date(performanceReview.periodEnd),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )}`,
                `${format(
                  new Date(performanceReview.feedbackStart),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )} ~ ${format(
                  new Date(performanceReview.feedbackEnd),
                  SettingConstant.SIMPLE_DATE_FORMAT,
                )}`,
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
