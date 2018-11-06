import React from 'react';
import numeral from 'numeral';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default () => (
  <Grid container xs={12} justify='space-between' alignItems='center'>
    <Grid item>
      <Typography variant='overline' color='secondary'>
        de R$ 369,90
      </Typography>
      <Typography variant='h3' paragraph>
        R$ 299,90
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant='overline' color='textSecondary'>
        ou
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant='overline'>
        3x de
      </Typography>
      <Typography variant='h3' paragraph>
        {numeral(299.90 / 3).format('$ 0,0.00')}
      </Typography>
    </Grid>
  </Grid>
)
