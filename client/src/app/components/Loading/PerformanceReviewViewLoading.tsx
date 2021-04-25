import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useStyle = makeStyles((theme: Theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  listItem: {
    margin: '0 3px',
    padding: 0,
  },
}));

export function PerformanceReviewViewLoading() {
  const classes = useStyle();
  return (
    <div>
      <Skeleton variant="text" width={340} height={32} />
      <Skeleton variant="rect" height={75} style={{ marginTop: '24px' }} />
      <Skeleton variant="rect" height={75} style={{ marginTop: '24px' }} />
      <Skeleton variant="rect" height={75} style={{ marginTop: '24px' }} />
      <Skeleton
        variant="rect"
        height={75}
        width="50%"
        style={{ marginTop: '24px' }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ marginTop: '24px' }}
      >
        <Skeleton variant="rect" width={42} height={32} />
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Skeleton variant="rect" width={32} height={32} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <Skeleton variant="rect" width={32} height={32} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <Skeleton variant="rect" width={32} height={32} />
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
