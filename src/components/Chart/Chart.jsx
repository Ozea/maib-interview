import React, { useEffect, useState } from 'react';
import { Chart, ArgumentAxis, ValueAxis, AreaSeries } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { Paper } from '@material-ui/core';
import { scalePoint } from 'd3-scale';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chart: {
    padding: theme.spacing(3, 7),
    '& svg': {
      '& path': {
        fill: theme.palette.primary.light
      },
      '& text': {
        fill: '#000'
      }
    }
  },
  paper: {
    marginLeft: theme.spacing(1.75)
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& > *': {
      color: theme.palette.common.black
    }
  },
  firstSpan: {
    padding: theme.spacing(3, 0, 0, 3),
    fontWeight: 'bolder',
    fontSize: '1.25rem'
  },
  secondSpan: {
    padding: theme.spacing(3, 3, 0, 0),
    fontWeight: 'bolder',
    fontSize: '1rem'
  }
}));

export default function CustomChart({ chartData: { items = [] }, ...props }) {
  const [data, setChartData] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (items) {
      setChartData(items);
    }
  }, [props, items]);

  const ChartRoot = ({ ...props }) => (
    <Chart.Root {...props} className={classes.chart} />
  );

  return (
    <Paper className={classes.paper}>
      {
        data
          ? (
            <Chart
              data={data}
              rootComponent={ChartRoot}>
              <ArgumentScale factory={scalePoint} />
              <ArgumentAxis />
              <ValueAxis />

              <AreaSeries
                name="Installations"
                valueField="installations"
                argumentField="page" />

              <AreaSeries
                name="Page"
                valueField="page"
                argumentField="page" />

              <Animation />

              <div className={classes.titleWrapper}>
                <span className={classes.firstSpan}>Numar de utilizatori</span>
                <span className={classes.secondSpan}>21 Sep - 21 Oct</span>
              </div>

            </Chart>
          )
          : null
      }
    </Paper>
  );
}