import React from 'react'
import { Link } from 'react-router-dom'

import DrawerLeft from '../../../components/DrawerLeft'
import CollapsibleTable from '../../../components/CollapsibleTable'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Container } from './styles'

const ListOrders: React.FC = () => {
  return(
    <DrawerLeft title={"Clientes"}>
      <Link to="/orders/add">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      <Container>
        <CollapsibleTable />
      </Container>
    </DrawerLeft>
  )
}

export default ListOrders