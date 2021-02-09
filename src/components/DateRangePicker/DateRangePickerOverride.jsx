import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { makeStyles, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

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

const currentDate = new Date();
const currentDatePlusOneMonth = dayjs(currentDate).add(1, 'month').toDate();

export default function DateRangePickerOverride({ onChangeDates, dates = [currentDate, currentDatePlusOneMonth], daysBetweenDates, ...props }) {
  const [value, setValue] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (dates.length) {
      setValue(dates);
    }
  }, [dates]);

  const onChange = newValue => {
    setValue(newValue);
    onChangeDates(newValue);
  }

  return (
    <form>
      <div className={classes.dateRangePicker}>
        <Typography className={classes.label}>Last {daysBetweenDates || 0} days</Typography>
        <DateRangePicker
          onChange={onChange}
          value={value} />
      </div>
    </form>
  );
}