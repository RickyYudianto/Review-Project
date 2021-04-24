import { createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';

const style = createStyles({
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  },
});

function GridContainer(props: any) {
  const { classes, children, ...rest } = props;
  return (
    <Grid container={true} {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridContainer);
