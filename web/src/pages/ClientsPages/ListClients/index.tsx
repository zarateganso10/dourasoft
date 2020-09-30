import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, Link } from 'react-router-dom'

import DrawerLeft from '../../../components/DrawerLeft'
import Table, { StyledTableCell, StyledTableRow } from '../../../components/Table'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Container, Button } from './styles'

import api from '../../../services/api'

export interface ClientProps {
  id: string;
  name: string;
  phone: string;
  address: string;
}

const ListClients: React.FC = () => {
  const headers = ['Nome', 'Telefone', 'Endereco']
  const history = useHistory()
  
  const [clients, setClients] = useState<Array<ClientProps>>([])

  const handleEditButton = useCallback((id) => {
    history.push(`/clients/edit/${id}`)
  }, [history])

  const handleDeleteButton = useCallback(async ( id ) => {
    try {
      await api.delete(`/clients/${id}`)
      setClients(clients.filter(client => client.id !== id))
    } catch (error) {
      alert(error.message)
    }
  }, [clients])

  useEffect(() => {
    api.get('/clients')
      .then(response => setClients(response.data))
  }, [])

  return(
    <DrawerLeft title={"Clientes"}>
      <Link to="/clients/add">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      <Container>
        <Table tableHeaders={headers}>
          {
            clients.map(client => (
              <StyledTableRow key={client.id}>
                <StyledTableCell component="th" scope="row">{client.name}</StyledTableCell>
                <StyledTableCell>{client.phone}</StyledTableCell>
                <StyledTableCell>{client.address}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleEditButton(client.id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteButton(client.id)}>
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          }
        </Table>
      </Container>
    </DrawerLeft>
  )
}

export default ListClients