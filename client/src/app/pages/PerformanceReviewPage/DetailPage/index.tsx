import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { DatePicker } from '@material-ui/pickers';
import endOfDay from 'date-fns/endOfDay';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import { DefaultButton } from '../../../components/Button';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Label } from '../../../components/Label';
import { ActionWrapper, FormControlWrapper } from '../../../components/Wrapper';
import { PathConstant } from '../../../constants/path.constant';
import { SettingConstant } from '../../../constants/setting.constant';
import { fromJsonToObj } from '../../../helpers/class-transformer.helper';
import PerformanceReview from '../../../models/performance-review.model';
import {
  selectFormValue,
  selectPerformanceReviews,
} from '../../../selectors/performance-review.selector';
import {
  createPerformanceReview,
  getPerformanceReviewById,
  updatePerformanceReview,
} from '../../../services/performance-review.service';
import {
  actions as performanceReviewActions,
  reducer as performanceReviewReducer,
  sliceKey as performanceReviewSliceKey,
} from '../../../slices/performance-review.slice';

export function PerformanceReviewDetailPage() {
  useInjectReducer({
    key: performanceReviewSliceKey,
    reducer: performanceReviewReducer,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const params: { id: string } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const performanceReviews = useSelector(selectPerformanceReviews);
  const formValue = useSelector(selectFormValue);

  const fetchPerformanceReviewData = useCallback(() => {
    const findPerformanceReview = performanceReviews.find(
      performanceReview => performanceReview.id === parseInt(params.id, 10),
    );
    if (findPerformanceReview) {
      dispatch(performanceReviewActions.setFormValue(findPerformanceReview));
    } else {
      getPerformanceReviewById(params.id).then(result => {
        const performanceReview = fromJsonToObj(PerformanceReview, result);
        dispatch(performanceReviewActions.setFormValue(performanceReview));
      });
    }
  }, [dispatch, params.id, performanceReviews]);

  const onChangeFormValue = useCallback(
    value => {
      dispatch(
        performanceReviewActions.setFormValue({ ...formValue, ...value }),
      );
    },
    [dispatch, formValue],
  );

  const onResetFormValue = useCallback(() => {
    dispatch(performanceReviewActions.setInitialFormValue());
  }, [dispatch]);

  const onBack = useCallback(() => {
    history.push(`${PathConstant.HOME}${PathConstant.PERFORMANCE_REVIEW}`);
  }, [history]);

  const onAddPerformanceReview = useCallback(
    performanceReview => {
      createPerformanceReview(performanceReview)
        .then(result => {
          onResetFormValue();
          enqueueSnackbar(
            t(translations.MESSAGE.ADD_PERFORMANCE_REVIEW_SUCCESS, {
              period: `${format(
                new Date(performanceReview.periodStart),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )} ~ ${format(
                new Date(performanceReview.periodEnd),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )}`,
            }),
            {
              variant: 'success',
            },
          );
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.ADD_PERFORMANCE_REVIEW_FAILED, {
              period: `${format(
                new Date(performanceReview.periodStart),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )} ~ ${format(
                new Date(performanceReview.periodEnd),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )}`,
            }),
            {
              variant: 'error',
            },
          ),
        );
    },
    [enqueueSnackbar, onResetFormValue, t],
  );

  const onUpdatePerformanceReview = useCallback(
    performanceReview => {
      updatePerformanceReview(performanceReview)
        .then(() => {
          enqueueSnackbar(
            t(translations.MESSAGE.EDIT_PERFORMANCE_REVIEW_SUCCESS, {
              period: `${format(
                new Date(performanceReview.periodStart),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )} ~ ${format(
                new Date(performanceReview.periodEnd),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )}`,
            }),
            {
              variant: 'success',
            },
          );
          onBack();
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.EDIT_PERFORMANCE_REVIEW_FAILED, {
              period: `${format(
                new Date(performanceReview.periodStart),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )} ~ ${format(
                new Date(performanceReview.periodEnd),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )}`,
            }),
            {
              variant: 'error',
            },
          ),
        );
    },
    [enqueueSnackbar, onBack, t],
  );

  const onSubmit = useCallback(() => {
    if (params.id) {
      onUpdatePerformanceReview(formValue);
    } else {
      onAddPerformanceReview(formValue);
    }
  }, [formValue, onAddPerformanceReview, onUpdatePerformanceReview, params.id]);

  useEffect(() => {
    if (params.id) {
      fetchPerformanceReviewData();
    } else {
      onResetFormValue();
    }
  }, [fetchPerformanceReviewData, onResetFormValue, params.id]);

  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.PERFORMANCE_REVIEW_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.PERFORMANCE_REVIEW_PAGE)}
        />
      </Helmet>
      <GridContainer>
        <GridItem xs={12} md={6}>
          <GridItem xs={12}>
            <Box style={{ marginBottom: '24px' }}>
              <NavLink
                to={`${PathConstant.HOME}${PathConstant.PERFORMANCE_REVIEW}`}
              >
                {t(translations.LABEL.BACK_TO_LIST_PAGE)}
              </NavLink>
            </Box>
          </GridItem>
          {!params.id ? (
            <GridItem xs={12}>
              <Alert severity="info">
                {t(translations.MESSAGE.INFO_CREATE_PERFORMANCE_REVIEW)}
              </Alert>
            </GridItem>
          ) : null}
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.PERIOD_START)}</Label>
              <DatePicker
                openTo="year"
                views={['year', 'month']}
                format={SettingConstant.SIMPLE_DATE_FORMAT}
                value={formValue.periodStart}
                onChange={value => {
                  onChangeFormValue({
                    periodStart: value
                      ? startOfDay(startOfMonth(value))
                      : startOfDay(startOfMonth(new Date())),
                  });
                }}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.PERIOD_END)}</Label>
              <DatePicker
                openTo="year"
                views={['year', 'month']}
                format={SettingConstant.SIMPLE_DATE_FORMAT}
                value={formValue.periodEnd}
                onChange={value => {
                  onChangeFormValue({
                    periodEnd: value
                      ? endOfDay(endOfMonth(value))
                      : endOfDay(endOfMonth(new Date())),
                  });
                }}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.FEEDBACK_START)}</Label>
              <DatePicker
                disableToolbar
                format={SettingConstant.SIMPLE_DATE_FORMAT}
                value={formValue.feedbackStart}
                onChange={value => {
                  onChangeFormValue({
                    feedbackStart: value
                      ? startOfDay(value)
                      : startOfDay(new Date()),
                  });
                }}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.FEEDBACK_END)}</Label>
              <DatePicker
                disableToolbar
                format={SettingConstant.SIMPLE_DATE_FORMAT}
                value={formValue.feedbackEnd}
                onChange={value => {
                  onChangeFormValue({
                    feedbackEnd: value ? endOfDay(value) : endOfDay(new Date()),
                  });
                }}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <ActionWrapper>
              <DefaultButton variant="contained" onClick={onBack}>
                {t(translations.LABEL.CANCEL)}
              </DefaultButton>
              <DefaultButton
                color="primary"
                variant="contained"
                onClick={onSubmit}
              >
                {t(translations.LABEL.SAVE)}
              </DefaultButton>
            </ActionWrapper>
          </GridItem>
        </GridItem>
      </GridContainer>
    </>
  );
}
