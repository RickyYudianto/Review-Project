import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import format from 'date-fns/format';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';
import { SettingConstant } from '../../constants/setting.constant';
import PendingFeedback from '../../models/pending-feedback.model';
import { DefaultButton } from '../Button';
import { Label } from '../Label';
import { FormControlWrapper } from '../Wrapper';

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-start',
    padding: '8px 24px',
  },
}));

interface IProps {
  formValue: PendingFeedback;
  open: boolean;
  onChangeFormValue: (value) => void;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function FeedbackDialog(props: IProps) {
  const {
    formValue,
    open,
    onChangeFormValue,
    handleClose,
    handleConfirm,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t(translations.LABEL.WRITE_FEEDBACK)}</DialogTitle>
      <DialogContent dividers>
        <FormControlWrapper>
          <Label>{t(translations.LABEL.REVIEW_PERIOD)}</Label>
          <span>
            {format(
              new Date(formValue.performanceReview.periodStart),
              SettingConstant.SIMPLE_DATE_FORMAT,
            )}{' '}
            ~
            {format(
              new Date(formValue.performanceReview.periodEnd),
              SettingConstant.SIMPLE_DATE_FORMAT,
            )}
          </span>
        </FormControlWrapper>
        <FormControlWrapper>
          <Label>{t(translations.LABEL.NAME)}</Label>
          <span>{formValue.user.name}</span>
        </FormControlWrapper>
        <FormControlWrapper required>
          <Label>{t(translations.LABEL.SCORE)}</Label>
          <RadioGroup
            name="status"
            value={formValue.score}
            style={{ flexDirection: 'row' }}
            onChange={e =>
              onChangeFormValue({
                score: parseInt(e.target.value),
              })
            }
          >
            <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label={t(translations.LABEL.POOR)}
            />
            <FormControlLabel
              value={2}
              control={<Radio color="primary" />}
              label={t(translations.LABEL.FAIR)}
            />
            <FormControlLabel
              value={3}
              control={<Radio color="primary" />}
              label={t(translations.LABEL.GOOD)}
            />
            <FormControlLabel
              value={4}
              control={<Radio color="primary" />}
              label={t(translations.LABEL.VERY_GOOD)}
            />
            <FormControlLabel
              value={5}
              control={<Radio color="primary" />}
              label={t(translations.LABEL.EXCELLENT)}
            />
          </RadioGroup>
        </FormControlWrapper>
        <FormControlWrapper required>
          <Label>{t(translations.LABEL.FEEDBACK)}</Label>
          <Input
            multiline
            rows={3}
            value={formValue.feedback || ''}
            onChange={e => {
              onChangeFormValue({ feedback: e.target.value });
            }}
            placeholder={t(translations.PLACEHOLDER.TYPE_FEEDBACK)}
          />
        </FormControlWrapper>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <DefaultButton variant="contained" onClick={handleClose}>
          {t(translations.LABEL.CANCEL)}
        </DefaultButton>
        <DefaultButton
          color="primary"
          variant="contained"
          autoFocus
          disabled={formValue.score === 0}
          onClick={handleConfirm}
        >
          {t(translations.LABEL.SEND)}
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
}
