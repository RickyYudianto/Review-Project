import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';
import { DefaultButton } from '../Button';

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-start',
    padding: '8px 24px',
  },
}));

interface IProps {
  contentText: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function ConfirmationDialog(props: IProps) {
  const { contentText, open, handleClose, handleConfirm } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Icon fontSize="large" color="error">
            warning
          </Icon>
          <span className={classes.title}>
            {t(translations.LABEL.DELETE_CONFIRMATION)}
          </span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <DefaultButton variant="contained" onClick={handleClose}>
          {t(translations.LABEL.NO)}
        </DefaultButton>
        <DefaultButton
          color="secondary"
          variant="contained"
          autoFocus
          onClick={handleConfirm}
        >
          {t(translations.LABEL.YES)}
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
}
