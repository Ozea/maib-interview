import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dateRangePicker: {
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    width: '347px',
    marginTop: theme.spacing(1.5),
    '& > div': {
      backgroundColor: '#80808012',
      padding: theme.spacing(1, 3),
      width: '100%',
      '& > div': {
        border: 'none',
        '& > span': {
          marginRight: theme.spacing(2)
        },
        '& input': {
          color: '#4d4d4d'
        },
        '& span': {
          color: '#4d4d4d'
        }
      }
    }
  },
  label: {
    backgroundColor: '#80808012',
    padding: theme.spacing(1.5, 3, 0),
    fontSize: '12px',
    color: '#4d4d4d'
  }
}));

export default function DateRangePickerOverride({ onChangeDates, ...props }) {
  const [value, setValue] = useState([new Date(), new Date()]);
  const classes = useStyles();

  const onChange = newValue => {
    setValue(newValue);
    onChangeDates(newValue);
  }

  return (
    <form>
      <div className={classes.dateRangePicker}>
        <Typography className={classes.label}>Last 30 days</Typography>
        <DateRangePicker
          onChange={onChange}
          value={value} />
      </div>
    </form>
  );
}