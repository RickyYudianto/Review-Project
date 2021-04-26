import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';

const style = createStyles({
  grid: {
    padding: '0 15px !important',
  },
});

function GridItem({ ...props }: any) {
  const { classes, children, ...rest } = props;
  return (
    <Grid item={true} {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
