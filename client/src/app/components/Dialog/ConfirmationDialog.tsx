import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';
import { DefaultButton } from '../Button';

const style = createStyles(theme => ({
  title: {
    paddingLeft: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-start',
    padding: '8px 24px',
  },
}));

interface IProps {
  classes: any;
  contentText: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

function ConfirmationDialog(props: IProps) {
  const { classes, contentText, open, handleClose, handleConfirm } = props;
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
      <DialogContent dividers>
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

export default withStyles(style)(ConfirmationDialog);
