import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo } from 'react';
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
import UserOption from '../../../components/Option/UserOption';
import { ActionWrapper, FormControlWrapper } from '../../../components/Wrapper';
import { PathConstant } from '../../../constants/path.constant';
import {
  fromJsonToArrayOfObject,
  fromJsonToObj,
} from '../../../helpers/class-transformer.helper';
import Reviewee from '../../../models/reviewee.model';
import Reviewer from '../../../models/reviewer.model';
import { UserTypeEnum } from '../../../models/user-type.enum';
import User from '../../../models/user.model';
import {
  selectAllUsers,
  selectFormValue,
  selectUsers,
} from '../../../selectors/user.selector';
import {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
} from '../../../services/user.service';
import {
  actions as userActions,
  reducer as userReducer,
  sliceKey as userSliceKey,
} from '../../../slices/user.slice';

export function EmployeeDetailPage() {
  useInjectReducer({ key: userSliceKey, reducer: userReducer });
  const dispatch = useDispatch();
  const history = useHistory();
  const params: { id: string } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const users = useSelector(selectUsers);
  const allUsers = useSelector(selectAllUsers);
  const formValue = useSelector(selectFormValue);

  const userOptions = useMemo(() => {
    return allUsers.map(user => {
      return {
        id: user.id,
        name: user.name,
      };
    });
  }, [allUsers]);

  const reviewerOptions = useMemo(() => {
    const reviewers = fromJsonToArrayOfObject(Reviewer, userOptions);
    return reviewers.filter(reviewer => reviewer.id !== formValue.id);
  }, [formValue.id, userOptions]);

  const revieweeOptions = useMemo(() => {
    const reviewees = fromJsonToArrayOfObject(Reviewee, userOptions);
    return reviewees.filter(reviewee => reviewee.id !== formValue.id);
  }, [formValue.id, userOptions]);

  const findUniqueValue = useCallback(value => {
    const lookup = value.reduce((a: any, e: any) => {
      a[e.id] = ++a[e.id] || 0;
      return a;
    }, {});

    return value.filter((e: any) => !lookup[e.id]);
  }, []);

  const fetchAllUser = useCallback(() => {
    getAllUser().then((result: any) => {
      const users: User[] = fromJsonToArrayOfObject(User, result.users);
      dispatch(userActions.setAllUserList(users));
    });
  }, [dispatch]);

  const fetchUserData = useCallback(() => {
    const findUser = users.find(user => user.id === parseInt(params.id, 10));
    if (findUser) {
      dispatch(userActions.setFormValue(findUser));
    } else {
      getUserById(params.id).then(result => {
        const user = fromJsonToObj(User, result);
        dispatch(userActions.setFormValue(user));
      });
    }
  }, [dispatch, params.id, users]);

  const onChangeFormValue = useCallback(
    value => {
      dispatch(userActions.setFormValue({ ...formValue, ...value }));
    },
    [dispatch, formValue],
  );

  const onResetFormValue = useCallback(() => {
    dispatch(userActions.setInitialFormValue());
  }, [dispatch]);

  const onBack = useCallback(() => {
    history.push(`${PathConstant.HOME}${PathConstant.EMPLOYEE}`);
  }, [history]);

  const onAddUser = useCallback(
    user => {
      createUser(user)
        .then(result => {
          onResetFormValue();
          enqueueSnackbar(
            t(translations.MESSAGE.ADD_EMPLOYEE_SUCCESS, {
              employee: user.name,
            }),
            {
              variant: 'success',
            },
          );
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.ADD_EMPLOYEE_FAILED, {
              employee: user.name,
            }),
            {
              variant: 'error',
            },
          ),
        );
    },
    [enqueueSnackbar, onResetFormValue, t],
  );

  const onUpdateUser = useCallback(
    user => {
      updateUser(user)
        .then(() => {
          enqueueSnackbar(
            t(translations.MESSAGE.EDIT_EMPLOYEE_SUCCESS, {
              employee: user.name,
            }),
            {
              variant: 'success',
            },
          );
          onBack();
        })
        .catch(() =>
          enqueueSnackbar(
            t(translations.MESSAGE.EDIT_EMPLOYEE_FAILED, {
              employee: user.name,
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
      onUpdateUser(formValue);
    } else {
      onAddUser(formValue);
    }
  }, [formValue, onAddUser, onUpdateUser, params.id]);

  useEffect(() => {
    fetchAllUser();
    if (params.id) {
      fetchUserData();
    } else {
      onResetFormValue();
    }
  }, [fetchAllUser, fetchUserData, onResetFormValue, params.id]);

  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.EMPLOYEE_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.EMPLOYEE_PAGE)}
        />
      </Helmet>
      <GridContainer>
        <GridItem xs={6}>
          <GridItem xs={12}>
            <Box style={{ marginBottom: '24px' }}>
              <NavLink to={`${PathConstant.HOME}${PathConstant.EMPLOYEE}`}>
                {t(translations.LABEL.BACK_TO_LIST_PAGE)}
              </NavLink>
            </Box>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.NAME)}</Label>
              <Input
                value={formValue.name}
                onChange={e => {
                  onChangeFormValue({ name: e.target.value });
                }}
                id="name"
                placeholder={t(translations.PLACEHOLDER.TYPE_EMPLOYEE_NAME)}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.EMAIL_ADDRESS)}</Label>
              <Input
                value={formValue.email}
                onChange={e => {
                  onChangeFormValue({ email: e.target.value });
                }}
                id="email"
                placeholder={t(
                  translations.PLACEHOLDER.TYPE_EMPLOYEE_EMAIL_ADDRESS,
                )}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.STATUS)}</Label>
              <RadioGroup
                name="status"
                value={formValue.isActive}
                style={{ flexDirection: 'row' }}
                onChange={e =>
                  onChangeFormValue({
                    isActive: e.target.value === 'true',
                  })
                }
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="primary" />}
                  label={t(translations.LABEL.ACTIVE)}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="primary" />}
                  label={t(translations.LABEL.INACTIVE)}
                />
              </RadioGroup>
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.TYPE)}</Label>
              <RadioGroup
                name="status"
                value={formValue.userType?.id ? formValue.userType?.id : null}
                style={{ flexDirection: 'row' }}
                onChange={e =>
                  onChangeFormValue({
                    userType: {
                      id: parseInt(e.target.value, 10),
                      name: e.target.id,
                    },
                  })
                }
              >
                <FormControlLabel
                  value={UserTypeEnum.ADMIN}
                  control={
                    <Radio id={t(translations.LABEL.ADMIN)} color="primary" />
                  }
                  label={t(translations.LABEL.ADMIN)}
                />
                <FormControlLabel
                  value={UserTypeEnum.EMPLOYEE}
                  control={
                    <Radio
                      id={t(translations.LABEL.EMPLOYEE)}
                      color="primary"
                    />
                  }
                  label={t(translations.LABEL.EMPLOYEE)}
                />
              </RadioGroup>
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.REVIEWERS)}</Label>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={reviewerOptions}
                value={formValue.reviewers}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  onChangeFormValue({
                    reviewers: findUniqueValue(value),
                  });
                }}
                renderOption={option => (
                  <UserOption
                    option={option}
                    checked={
                      formValue.reviewers.filter(
                        reviewer => reviewer.id === option.id,
                      ).length > 0
                    }
                  />
                )}
                style={{ width: 500 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder={t(
                      translations.PLACEHOLDER.SELECT_EMPLOYEE_REVIEWERS,
                    )}
                  />
                )}
              />
            </FormControlWrapper>
          </GridItem>
          <GridItem xs={12}>
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.REVIEWEES)}</Label>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={revieweeOptions}
                value={formValue.reviewees}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  onChangeFormValue({
                    reviewees: findUniqueValue(value),
                  });
                }}
                renderOption={option => (
                  <UserOption
                    option={option}
                    checked={
                      formValue.reviewees.filter(
                        reviewee => reviewee.id === option.id,
                      ).length > 0
                    }
                  />
                )}
                style={{ width: 500 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder={t(
                      translations.PLACEHOLDER.SELECT_EMPLOYEE_REVIEWEES,
                    )}
                  />
                )}
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
