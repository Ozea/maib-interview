import { CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useStyles = makeStyles(theme => ({
  paper: {
    marginLeft: theme.spacing(1.75),
    padding: theme.spacing(2, 1)
  },
  spinner: {
    margin: theme.spacing(3, 3, 0)
  }
}));

export default function DashboardTable({ data, loading = true, ...props }) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setRows(data.items);
    }
  }, [data]);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      {
        loading
          ? <CircularProgress className={classes.spinner} />
          : (
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Data</b></TableCell>
                  <TableCell><b>Numar de utilizatori total</b></TableCell>
                  <TableCell><b>Numar de utilizatori unici</b></TableCell>
                  <TableCell><b>Other Data</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  !loading
                    ? rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{dayjs(row.date).format('DD/MM/YYYY')}</TableCell>
                        <TableCell>{row.newUsers}</TableCell>
                        <TableCell>{row.newUsers}</TableCell>
                        <TableCell>{row.otherData}</TableCell>
                      </TableRow>
                    ))
                    : null
                }
              </TableBody>
            </Table>
          )
      }
    </TableContainer>
  );
}