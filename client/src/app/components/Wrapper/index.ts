import { Paper, styled, withTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import { dangerColor } from '../../../styles/color';

export const ActionWrapper = styled(withTheme(Box))(props => ({
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  marginTop: 6,
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  width: '100%',
}));

export const ErrorWrapper = styled(Box)({
  height: 30,
  marginTop: 6,
  color: dangerColor[0],
  textAlign: 'right',
  fontSize: '0.875em',
});

export const FormControlWrapper = styled(withTheme(FormControl))(props => ({
  marginTop: props.theme.spacing(3),
}));

export const LoginWrapper = styled(withTheme(Box))(props => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  height: 'fit-content',
  left: '50%',
  top: '25%',
  transform: 'translate(-50%, 0)',
}));

export const PaperWrapper = styled(withTheme(Paper))(props => ({
  width: 360,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  [props.theme.breakpoints.down('md')]: {
    width: '100%',
    minWidth: 300,
  },
}));
