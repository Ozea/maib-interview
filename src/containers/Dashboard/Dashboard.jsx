import { Button, CircularProgress, Grid, makeStyles, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import DateRangePickerOverride from '../../components/DateRangePicker/DateRangePickerOverride';
import CustomChart from '../../components/Chart/Chart';
import React, { useEffect, useState } from 'react';
import instance from '../../utils/axios';
import clsx from 'clsx';
import DashboardTable from '../../components/DashboardTable/DashboardTable';

const useStyles = makeStyles(theme => ({
  paper: {
    background: theme.palette.primary.light,
    padding: theme.spacing(2, 5),
    '& h5': {
      fontWeight: 'bolder'
    }
  },
  tabsPaper: {
    background: theme.palette.primary.light,
    paddingLeft: theme.spacing(5),
    '& button': {
      color: theme.palette.common.white
    }
  },
  offset: {
    margin: theme.spacing(4, 0, 0, 5)
  },
  fullWidth: {
    width: '100%'
  },
  installationsOffset: {
    paddingLeft: theme.spacing(1.5)
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButton: {
    textTransform: 'uppercase',
    padding: theme.spacing(.75, 4),
    borderRadius: 0
  },
  installationsPaper: {
    padding: theme.spacing(2, 4),
    '& h4': {
      fontWeight: 'bolder'
    },
  },
  installations: {
    fontSize: '25px',
    '& > span': {
      fontSize: '40px',
      '& span': {
        color: 'gray',
        fontSize: '20px'
      }
    }
  },
  padding: {
    padding: theme.spacing(3, 0)
  },
  indicator: {
    backgroundColor: '#fff'
  }
}));

export default function Dashboard() {
  const [state, setState] = useState({
    tabValue: 0,
    chartData: [],
    tableData: [],
    cardInfo: {},
    dates: {
      startDate: '',
      endDate: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setState({ ...state, tabValue: newValue });
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([instance.get('/api/chart'), instance.get('/api/table'), instance.get('/api/card')])
      .then(result => {
        if (result.length) {
          let chartData = result[0].data;
          let tableData = result[1].data;
          let cardInfo = result[2].data.data;

          setState({
            ...state,
            chartData,
            tableData,
            cardInfo
          });
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  const onChangeDates = value => {
    setState({
      ...state,
      dates: {
        startDate: value[0],
        endDate: value[1]
      }
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0} square>
          <Typography variant="h5">Dashboard</Typography>
        </Paper>
        <Paper className={classes.tabsPaper} elevation={3} square>
          <Tabs classes={{ indicator: classes.indicator }} value={state.tabValue} onChange={handleChange}>
            <Tab label="Chart" />
            <Tab label="Report" />
          </Tabs>
        </Paper>

        <Grid container>
          <Grid item xs={6}>
            <Button className={clsx(classes.offset, classes.leftButton)} color="secondary" variant="contained">Configura Raport</Button>
          </Grid>

          <Grid item xs={6}>
            <DateRangePickerOverride onChangeDates={onChangeDates} />
          </Grid>
        </Grid>

        <br />
        <br />

        <Grid container className={classes.installationsOffset}>
          <Grid item>
            <Paper elevation={4} square className={classes.installationsPaper}>

              {
                loading
                  ? <CircularProgress />
                  : (<>
                    <Typography variant="h4">Instalari pe dispozitive active</Typography>
                    <div className={classes.installations}>
                      <span>{state.cardInfo.monthlyInstallation} <span>+ {state.cardInfo.prevMonthComparison}% vs previous 30 days</span></span>
                    </div>
                  </>)
              }
            </Paper>
          </Grid>
        </Grid>

        <br />
        <br />

        <Grid container>
          <Grid item xs={11} className={classes.centered}>
            {
              loading
                ? <CircularProgress />
                : (
                  <div className={classes.fullWidth}>
                    <CustomChart chartData={state.chartData} />
                  </div>
                )
            }
          </Grid>
        </Grid>

        <br />
        <br />

        <Grid container>
          <Grid item xs={11} className={classes.centered}>
            {
              loading
                ? <CircularProgress />
                : <DashboardTable data={state.tableData} />
            }
          </Grid>
        </Grid>

        <br />
        <br />

      </Grid>
    </Grid >
  );
}