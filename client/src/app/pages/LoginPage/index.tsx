import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { translations } from '../../../locales/translations';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { FullWidthButton } from '../../components/Button';
import { ButtonCircularProgress } from '../../components/Loading';
import {
  ActionWrapper,
  ErrorWrapper,
  FormControlWrapper,
  LoginWrapper,
  PaperWrapper,
} from '../../components/Wrapper';
import { PathConstant } from '../../constants/path.constant';
import { fromJsonToObj } from '../../helpers/class-transformer.helper';
import User from '../../models/user.model';
import { login } from '../../services/auth.service';
import {
  actions as authActions,
  reducer as authReducer,
  sliceKey as authSliceKey,
} from '../../slices/auth.slice';

export function LoginPage() {
  useInjectReducer({ key: authSliceKey, reducer: authReducer });
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    login({
      email,
      password,
    })
      .then((result: any) => {
        const user: User = fromJsonToObj(User, result.user);
        setLoading(false);
        dispatch(authActions.setLoggedIn(user));
        dispatch(authActions.setAccessToken(result.accessToken));
        dispatch(authActions.setRefreshToken(result.refreshToken));
        history.push(PathConstant.ROOT);
      })
      .catch(() => {
        setLoading(false);
        setError(t(translations.MESSAGE.INCORRECT_EMAIL_ADDRESS_OR_PASSWORD));
      });
  };

  const onKeyPressed = e => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.LOGIN_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.LOGIN_PAGE)}
        />
      </Helmet>
      <LoginWrapper>
        <PaperWrapper>
          <FormControlWrapper required>
            <Input
              value={email}
              disabled={loading}
              onChange={e => {
                setEmail(e.target.value);
                setError('');
              }}
              onKeyPress={e => onKeyPressed(e)}
              id="email"
              placeholder={t(translations.PLACEHOLDER.EMAIL_ADDRESS)}
              startAdornment={
                <InputAdornment position="start">
                  <Icon>email</Icon>
                </InputAdornment>
              }
            />
          </FormControlWrapper>
          <FormControlWrapper required>
            <Input
              value={password}
              disabled={loading}
              onChange={e => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyPress={e => onKeyPressed(e)}
              type="password"
              id="password"
              placeholder={t(translations.PLACEHOLDER.PASSWORD)}
              startAdornment={
                <InputAdornment position="start">
                  <Icon>lock</Icon>
                </InputAdornment>
              }
            />
          </FormControlWrapper>
          <ErrorWrapper>{error}</ErrorWrapper>
          <ActionWrapper>
            <FullWidthButton
              onClick={handleLogin}
              disabled={loading}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <ButtonCircularProgress />
              ) : (
                t(translations.LABEL.LOGIN)
              )}
            </FullWidthButton>
          </ActionWrapper>
        </PaperWrapper>
      </LoginWrapper>
    </>
  );
}
