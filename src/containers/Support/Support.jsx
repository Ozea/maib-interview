import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import SupportTable from '../../components/SupportTable/SupportTable';
import React, { useEffect, useState } from 'react';
import instance from '../../utils/axios';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 5, 3)
  },
  paper: {
    background: theme.palette.primary.light,
    padding: theme.spacing(2, 5),
    '& h5': {
      fontWeight: 'bolder'
    }
  },
  marginOffset: {
    marginBottom: theme.spacing(2)
  },
  label: {
    '& label': {
      color: theme.palette.primary.light
    }
  },
  sticky: {
    padding: theme.spacing(1, 5, 2),
    position: 'sticky',
    top: '64px',
    background: '#fafafa',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  datePicker: {
    margin: 0,
    '& label': {
      color: theme.palette.primary.light
    }
  },
  button: {
    width: '100%',
    height: '100%',
    margin: theme.spacing(0, 3),
    borderRadius: 0,
    fontWeight: 'bolder'
  }
}));

export default function Support() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    idnp: '',
    phoneNumber: '',
    lastTransaction: ''
  });

  useEffect(() => {
    setLoading(true);

    instance.get('/api/support')
      .then(result => {
        setData(result.data.items);
        setFilteredData(result.data.items);
        setLoading(false);
      })
      .catch();
  }, []);

  const onSearch = () => {
    const duplicatedData = [...data];
    const { idnp, phoneNumber, lastTransaction } = searchFilters;
    const filtered = duplicatedData.filter(item =>
      (item.idnp.includes(idnp) && item.phoneNumber.includes(phoneNumber) && isSameDay(item.lastTransaction, lastTransaction)));

    setLoading(true);
    setTimeout(() => {
      setFilteredData(filtered);
      setLoading(false);
    }, 1500);
  }

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) {
      return true;
    }

    let first = new Date(d1);
    let second = new Date(d2);

    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  const onChangeSearchFilter = (input, value) => {
    setSearchFilters({ ...searchFilters, [input]: value })
  }

  const onResetFilters = () => {
    setLoading(true);
    setSearchFilters({
      ...searchFilters,
      idnp: '',
      phoneNumber: '',
      lastTransaction: ''
    });

    setTimeout(() => {
      setFilteredData(data);
      setLoading(false);
    }, 1000);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0} square>
          <Typography variant="h5">Support</Typography>
        </Paper>
      </Grid>

      <Grid container className={clsx(classes.root, classes.sticky)}>
        <Grid item xs={12} className={classes.marginOffset}>
          <Typography variant="h6">Cauta utilizator:</Typography>
        </Grid>

        <Grid item xs={2}>
          <TextField
            className={classes.label}
            label="IDNP"
            value={searchFilters.idnp}
            onChange={event => onChangeSearchFilter('idnp', event.target.value)}
            InputLabelProps={{
              shrink: true,
            }} />
        </Grid>

        <Grid item xs={2}>
          <TextField
            className={classes.label}
            label="Nr. telefon"
            value={searchFilters.phoneNumber}
            onChange={event => onChangeSearchFilter('phoneNumber', event.target.value)}
            InputLabelProps={{
              shrink: true
            }} />
        </Grid>

        <Grid item xs={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                className={classes.datePicker}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data access"
                value={searchFilters.lastTransaction || null}
                onChange={date => onChangeSearchFilter('lastTransaction', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={onSearch} color="secondary" className={classes.button}>CAUTA</Button>
        </Grid>

        <Grid item xs={2} style={{ marginLeft: '10px' }}>
          <Button variant="outlined" onClick={onResetFilters} color="secondary" className={classes.button}>RESET FILTERS</Button>
        </Grid>
      </Grid>

      <Grid container className={classes.root}>
        <Grid item xs={11}>
          <SupportTable data={filteredData} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
}