import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import PerformanceFeedbackCard from '../../../components/Card/PerformanceFeedbackCard';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { PerformanceReviewViewLoading } from '../../../components/Loading/PerformanceReviewViewLoading';
import { CustomPagination } from '../../../components/Pagination';
import { PathConstant } from '../../../constants/path.constant';
import { SettingConstant } from '../../../constants/setting.constant';
import {
  fromJsonToArrayOfObject,
  fromJsonToObj,
} from '../../../helpers/class-transformer.helper';
import PerformanceReview from '../../../models/performance-review.model';
import UserPerformanceFeedback from '../../../models/user-performance-feedback.model';
import {
  selectLoading,
  selectPage,
  selectPerformanceReview,
  selectSize,
  selectTotalData,
  selectUserPerformanceFeedbacks,
} from '../../../selectors/performance-feedback.selector';
import { getAllEmployeePerformanceFeedback } from '../../../services/performance-feedback.service';
import {
  actions as performanceFeedbackActions,
  reducer as performanceFeedbackReducer,
  sliceKey as performanceFeedbackSliceKey,
} from '../../../slices/performance-feedback.slice';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    flexWrap: 'wrap',
    flexFlow: 'row wrap',
  },
}));

export function PerformanceReviewViewPage() {
  useInjectReducer({
    key: performanceFeedbackSliceKey,
    reducer: performanceFeedbackReducer,
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const params: { id: string } = useParams();
  const { t } = useTranslation();

  const userPerformanceFeedbacks = useSelector(selectUserPerformanceFeedbacks);
  const performanceReview = useSelector(selectPerformanceReview);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const totalData = useSelector(selectTotalData);
  const loading = useSelector(selectLoading);

  const fetchList = useCallback(() => {
    dispatch(performanceFeedbackActions.setLoading(true));
    getAllEmployeePerformanceFeedback(params.id, {
      page,
      size,
    })
      .then((result: any) => {
        dispatch(performanceFeedbackActions.setLoading(false));
        const userPerformanceFeedbacks: UserPerformanceFeedback[] = fromJsonToArrayOfObject(
          UserPerformanceFeedback,
          result.performanceFeedbacks,
        );
        const performanceReview: PerformanceReview = fromJsonToObj(
          PerformanceReview,
          result.performanceReview,
        );
        dispatch(performanceFeedbackActions.setList(userPerformanceFeedbacks));
        dispatch(
          performanceFeedbackActions.setPerformanceReview(performanceReview),
        );
        dispatch(performanceFeedbackActions.setTotalData(result.totalData));
      })
      .catch(() => dispatch(performanceFeedbackActions.setLoading(false)));
  }, [dispatch, page, params.id, size]);

  const onHandleChangePage = page => {
    dispatch(performanceFeedbackActions.setPage(page));
  };

  const onHandleChangeSize = size => {
    dispatch(performanceFeedbackActions.setSize(size));
  };

  useEffect(() => {
    fetchList();
  }, [fetchList, page, size]);

  useEffect(() => {
    return () => {
      dispatch(performanceFeedbackActions.resetState());
    };
  }, [dispatch]);

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
        <GridItem xs={12}>
          <Box style={{ marginBottom: '24px' }}>
            <NavLink
              to={`${PathConstant.HOME}${PathConstant.PERFORMANCE_REVIEW}`}
            >
              {t(translations.LABEL.BACK_TO_LIST_PAGE)}
            </NavLink>
          </Box>
        </GridItem>
        {userPerformanceFeedbacks.length <= 0 && loading ? (
          <GridItem xs={12}>
            <PerformanceReviewViewLoading />
          </GridItem>
        ) : (
          <>
            {performanceReview?.id ? (
              <GridItem xs={12}>
                <Box style={{ marginBottom: '24px' }}>
                  <Typography variant="h5" gutterBottom>
                    {format(
                      new Date(performanceReview.periodStart),
                      SettingConstant.SIMPLE_DATE_FORMAT,
                    )}{' '}
                    ~{' '}
                    {format(
                      new Date(performanceReview.periodEnd),
                      SettingConstant.SIMPLE_DATE_FORMAT,
                    )}
                  </Typography>
                </Box>
              </GridItem>
            ) : null}
            <GridItem xs={12}>
              <div className={classes.wrapper}>
                {userPerformanceFeedbacks.map(
                  (userPerformanceFeedback, idx) => (
                    <PerformanceFeedbackCard
                      key={idx}
                      userPerformanceFeedback={userPerformanceFeedback}
                    />
                  ),
                )}
              </div>
              <div>
                {userPerformanceFeedbacks.length > 0 ? (
                  <CustomPagination
                    page={page}
                    size={size}
                    totalData={totalData}
                    handleChangePage={page => onHandleChangePage(page)}
                    handleChangeSize={size => onHandleChangeSize(size)}
                  />
                ) : null}
              </div>
            </GridItem>
          </>
        )}
      </GridContainer>
    </>
  );
}
