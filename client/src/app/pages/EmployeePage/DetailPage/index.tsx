import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { translations } from '../../../../locales/translations';
import { useInjectReducer } from '../../../../utils/redux-injectors';
import { DefaultButton } from '../../../components/Button';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Label } from '../../../components/Label';
import { ActionWrapper, FormControlWrapper } from '../../../components/Wrapper';
import { PathConstant } from '../../../constants/path.constant';
import { fromJsonToObj } from '../../../helpers/class-transformer.helper';
import { UserTypeEnum } from '../../../models/user-type.enum';
import User from '../../../models/user.model';
import { selectFormValue, selectUsers } from '../../../selectors/user.selector';
import {
  createUser,
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
  const formValue = useSelector(selectFormValue);

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
    if (params.id) {
      fetchUserData();
    } else {
      onResetFormValue();
    }
  }, [fetchUserData, onResetFormValue, params.id]);

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
            <FormControlWrapper required>
              <Label>{t(translations.LABEL.NAME)}</Label>
              <Input
                value={formValue.name}
                onChange={e => {
                  onChangeFormValue({ name: e.target.value });
                }}
                id="name"
                placeholder={t(translations.PLACEHOLDER.EMPLOYEE_NAME)}
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
                placeholder={t(translations.PLACEHOLDER.EMPLOYEE_EMAIL_ADDRESS)}
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
