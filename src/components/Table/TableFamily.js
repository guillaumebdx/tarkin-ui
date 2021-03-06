import React              from 'react';
import PropTypes          from 'prop-types';
import { withStyles }     from '@material-ui/core/styles';
import Table              from '@material-ui/core/Table';
import TableBody          from '@material-ui/core/TableBody';
import TableCell          from '@material-ui/core/TableCell';
import TableHead          from '@material-ui/core/TableHead';
import TableRow           from '@material-ui/core/TableRow';
import Paper              from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#221266",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *2,
    marginBottom: theme.spacing.unit *2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="left">Prénom</CustomTableCell>
            <CustomTableCell align="left">Nom</CustomTableCell>
            <CustomTableCell align="left">Position</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell align="left">{row.firstName}</CustomTableCell>
              <CustomTableCell align="left">{row.name}</CustomTableCell>
              <CustomTableCell align="left">{row.familyPosition}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);