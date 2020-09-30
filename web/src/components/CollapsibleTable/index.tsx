import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useOrders } from '../../hooks/orders'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface ItenProps {
  id: string;
  product_id: string;
  amount: number;
  product: {
    name: string;
  };
  unitary_value: number;
  total_value: number;
}

export interface OrderProps {
  id: string;
  client: {
    name: string;
  };
  total: number;
  status: string;
  client_id: string;
  itens: Array<ItenProps>;
}

interface RowProps {
  order: OrderProps;
}

const Row: React.FC<RowProps> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const history = useHistory()

  const { deleteById } = useOrders()

  const handleDeleteOrder = useCallback(async (id: string) => {
    await deleteById(id)
  }, [deleteById])

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell align="right">{order.client.name}</TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">{order.total}</TableCell>
        <TableCell align="right">{order.itens.length}</TableCell>
        <TableCell>
          <button onClick={() => history.push(`/orders/edit/${order.id}`) }><EditIcon /></button>
          <button onClick={() => handleDeleteOrder(order.id)}><DeleteIcon /></button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Itens
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Valor unitario</TableCell>
                    <TableCell align="right">Total($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.itens.map((iten) => (
                    <TableRow key={iten.id}>
                      <TableCell component="th" scope="row">
                        {iten.product.name}
                      </TableCell>
                      <TableCell align="right">{iten.amount}</TableCell>
                      <TableCell align="right">{iten.unitary_value}</TableCell>
                      <TableCell align="right">
                        {iten.total_value}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const CollapsibleTable: React.FC = () => {

  const { orders, getAll } = useOrders()

  useEffect(() => {
    getAll()
  }, [getAll])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Cliente</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Itens</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <Row key={index} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable