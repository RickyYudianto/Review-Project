import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const style = createStyles({
  list: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  listItem: {
    margin: '0 3px',
    padding: 0,
  },
});

interface IProps {
  classes: any;
  renderActionSection: boolean;
}

function ListLoading(props: IProps) {
  const { classes, renderActionSection } = props;
  return (
    <div>
      {renderActionSection ? (
        <Box display="flex" justifyContent="space-between">
          <Skeleton variant="rect" width={106} height={36} />
          <Skeleton variant="rect" width={86} height={36} />
        </Box>
      ) : null}
      <Skeleton variant="rect" height={150} style={{ marginTop: '24px' }} />
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

export default withStyles(style)(ListLoading);
