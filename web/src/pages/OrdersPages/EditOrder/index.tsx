import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import DeleteIcon from '@material-ui/icons/Delete';
import DrawerLeft from '../../../components/DrawerLeft'
import Select from '../../../components/Select'
import Table, { StyledTableCell, StyledTableRow } from '../../../components/Table'

import { Container, Button } from './styles'

import { OrderProps } from '../../../components/CollapsibleTable';

import api from '../../../services/api'

interface ParamsProps {
  id: string;
}

const EditOrder: React.FC = () => {
  const { id } = useParams<ParamsProps>()
  const history = useHistory()

  const headers = ['Produto', 'Quantitade', 'Valor unitario', 'Valor total']

  const optionsOfStatus = [
    {value: 'Aberto', label: 'Aberto'},
    {value: 'Entregue', label: 'Entregue'},
    {value: 'Cancelado', label: 'Cancelado'},
  ]

  const [order, setOrder] = useState<OrderProps>({} as OrderProps)

  const handleDeleteIten = useCallback(async(id: string) => {
    try {
      await api.delete(`itens/${id}`)
      const newOrder = {
        ...order,
        itens: order.itens.filter(iten => iten.id !== id)
      }
      setOrder(newOrder)
    } catch (error) {
      alert(error.message)
    }
  }, [order])  

  useEffect(() => {
    api.get(`orders/${id}`)
      .then(response => {
        setOrder(response.data)
      })
  }, [id])

  const handleSubmit = useCallback(async(data) => {
    const orderUpdate = {
      client_id: order.client_id,
      status: data.status
    }
    try {
      await api.patch(`orders/${order.id}`, orderUpdate)
      history.push('/orders')
    } catch (error) {
      alert(error.message)
    }
  }, [order, history])

  return(
    <DrawerLeft title={"Editar Cliente"}>
      <Container>
        
        <Form onSubmit={handleSubmit}>
          <h1>Editar Status</h1>
          <div>
            <Select
              name="status"
              defaultValue={() => {
                return {
                  value: order.status,
                  label: order.status
                }
              } }
              options={optionsOfStatus}
            />
          </div>
          <Button type="submit">Atualizar</Button>
        </Form>
        <Table tableHeaders={headers}>
          {
            order.itens && order.itens.map(iten => (
              <StyledTableRow key={iten.id}>
                <StyledTableCell component="th" scope="row">{iten.product.name}</StyledTableCell>
                <StyledTableCell>{iten.amount}</StyledTableCell>
                <StyledTableCell>{iten.unitary_value}</StyledTableCell>
                <StyledTableCell>{iten.total_value}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleDeleteIten(iten.id)}>
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

export default EditOrder