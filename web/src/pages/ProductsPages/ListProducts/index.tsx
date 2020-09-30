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

export interface ProductProps {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
}

const ListProducts: React.FC = () => {
  const headers = ['Codigo', 'Nome', 'Descricao', 'Preco']
  const history = useHistory()
  
  const [products, setProducts] = useState<Array<ProductProps>>([])

  const handleEditButton = useCallback((id) => {
    history.push(`/products/edit/${id}`)
  }, [history])

  const handleDeleteButton = useCallback(async ( id ) => {
    try {
      await api.delete(`/products/${id}`)
      setProducts(products.filter(client => client.id !== id))
    } catch (error) {
      alert(error.message)
    }
  }, [products])

  useEffect(() => {
    api.get('/products')
      .then(response => setProducts(response.data))
  }, [])

  return(
    <DrawerLeft title={"Clientes"}>
      <Link to="/products/add">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      <Container>
        <Table tableHeaders={headers}>
          {
            products.map(product => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">{product.code}</StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.description}</StyledTableCell>
                <StyledTableCell>{product.price}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleEditButton(product.id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteButton(product.id)}>
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

export default ListProducts