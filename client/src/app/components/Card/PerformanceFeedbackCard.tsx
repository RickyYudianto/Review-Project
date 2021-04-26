import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/translations';
import { SettingConstant } from '../../constants/setting.constant';
import {
  generateInitial,
  stringToColor,
} from '../../helpers/avatar-user.helper';
import UserPerformanceFeedback from '../../models/user-performance-feedback.model';

const style = createStyles(theme => ({
  root: {
    height: 'fit-content',
    marginBottom: theme.spacing(3),
  },
  header: { cursor: 'pointer' },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    borderRadius: 4,
    background: '#e8e8e8',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  date: {
    fontSize: '0.75rem',
    color: theme.palette.grey.A200,
  },
  reviewerAvatar: {
    width: '28px',
    height: '28px',
    fontSize: '0.875rem',
  },
  reviewerScore: {
    marginLeft: theme.spacing(1),
  },
  score: {
    fontSize: '0.6rem',
    color: theme.palette.secondary.main,
  },
  emptyScore: {
    fontSize: '0.6rem',
    color: theme.palette.grey.A200,
  },
  notReviewed: {
    fontSize: '0.8rem',
    color: theme.palette.grey.A200,
  },
}));

interface IProps {
  classes: any;
  userPerformanceFeedback: UserPerformanceFeedback;
}

function PerformanceFeedbackCard(props: IProps) {
  const { classes, userPerformanceFeedback } = props;
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderScore = score => {
    const list: any[] = [];
    for (let i = 0; i < score; i++) {
      list.push(
        <Icon key={i} className={classes.score}>
          star
        </Icon>,
      );
    }

    const emptyScore = SettingConstant.FEEDBACK_MAX_SCORE - score;
    for (let i = 0; i < emptyScore; i++) {
      list.push(
        <Icon key={score + i} className={classes.emptyScore}>
          star
        </Icon>,
      );
    }

    return list;
  };

  const renderFeedbackContent = performanceFeedback => (
    <Box display="grid">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <div>
            <Avatar
              className={classes.reviewerAvatar}
              style={{
                background: stringToColor(performanceFeedback.reviewer.name),
              }}
            >
              {generateInitial(performanceFeedback.reviewer.name)}
            </Avatar>
          </div>
          <Box display="grid" className={classes.reviewerScore}>
            <span>{performanceFeedback.reviewer.name}</span>
            <Box display="flex">{renderScore(performanceFeedback.score)}</Box>
          </Box>
        </Box>
        <span className={classes.date}>
          {performanceFeedback.score > 0
            ? format(
                new Date(performanceFeedback.updatedAt),
                SettingConstant.SIMPLE_DATE_FORMAT,
              )
            : null}
        </span>
      </Box>
      <p>
        {performanceFeedback.score > 0 ? (
          performanceFeedback.feedback
        ) : (
          <i className={classes.notReviewed}>
            {t(translations.LABEL.NOT_YET_REVIEWED)}
          </i>
        )}
      </p>
    </Box>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        className={classes.header}
        onClick={handleExpandClick}
        avatar={
          <Avatar
            style={{ background: stringToColor(userPerformanceFeedback.name) }}
          >
            {generateInitial(userPerformanceFeedback.name)}
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <Icon>expand_more</Icon>
          </IconButton>
        }
        title={userPerformanceFeedback.name}
        subheader={userPerformanceFeedback.email}
      />
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {userPerformanceFeedback.performanceFeedbacks.length > 0 ? (
            userPerformanceFeedback.performanceFeedbacks.map(
              (performanceFeedback, idx) => (
                <Box className={classes.content} key={idx}>
                  {renderFeedbackContent(performanceFeedback)}
                </Box>
              ),
            )
          ) : (
            <Box>
              <i>{t(translations.LABEL.NO_DATA_AVAILABLE)}</i>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default withStyles(style)(PerformanceFeedbackCard);
