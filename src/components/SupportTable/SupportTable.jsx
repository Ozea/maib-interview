import { CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  spinner: {
    margin: theme.spacing(2, 4, 1)
  }
}));

export default function SupportTable({ loading, data = [], ...props }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data);
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
                  <TableCell><b>Nume Prenume</b></TableCell>
                  <TableCell><b>IDNP</b></TableCell>
                  <TableCell><b>Nr. Telefon</b></TableCell>
                  <TableCell><b>PAN Card</b></TableCell>
                  <TableCell><b>Last transaction</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  !loading
                    ? rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.firstName} {row.lastName}</TableCell>
                        <TableCell>{row.idnp}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.panCard}</TableCell>
                        <TableCell>{dayjs(row.lastTransaction).format('HH:mm DD/MM/YYYY')}</TableCell>
                      </TableRow>
                    ))
                    : null
                }

                {!rows.length && (
                  <TableRow>
                    <TableCell colSpan="5" align="center">Sorry, no data found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )
      }
    </TableContainer>
  );
}