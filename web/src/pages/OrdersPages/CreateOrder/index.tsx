import React, { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { uuid } from 'uuidv4'

import DeleteIcon from '@material-ui/icons/Delete';

import Table, { StyledTableCell, StyledTableRow } from '../../../components/Table'
import DrawerLeft from '../../../components/DrawerLeft'
import Input from '../../../components/Input'
import Select from '../../../components/Select'

import { Container, Button, ContainerFormOrder } from './styles'

import api from '../../../services/api';

import { ProductProps } from '../../ProductsPages/ListProducts';
import { ClientProps } from '../../ClientsPages/ListClients';

interface ItenProps {
  id: string;
  name: string;
  product_id: string;
  amount: number;
  unitary_value: number;
  total_value: number;
}

interface Options {
  value: string;
  label: string;
}

const CreateOrder: React.FC = () => {
  const history = useHistory()
  const headers = ['Nome', 'Quantidade', 'Preco', 'Total']

  const [itens, setItens] = useState<Array<ItenProps>>([])

  const [products, setProducts] = useState<Array<ProductProps>>([])
  const [optionsProducts, setOptionsProducts] = useState<Array<Options>>([])

  const [clients, setClients] = useState<Array<ClientProps>>([])
  const [client, setClient] = useState<ClientProps | null>(null)

  const handleSubmitClient = useCallback(async (data) => {
    const checkClientExist = clients.find(client => client.name === data.name)
    if(checkClientExist){
      setClient(checkClientExist)
      return
    }

    try {
      const responseClient = await api.post('clients', data)
      setClient(responseClient.data)
    } catch (error) {
      alert(error.message)
    }

  }, [clients])

  const handleSubmitOrder = useCallback(async () => {
    const formattedItens = itens.map(iten => {
      return {
        name: iten.name, 
        amount:iten.amount, 
        product_id: iten.product_id, 
        unitary_value: iten.unitary_value, 
        total_value: iten.total_value
      }
    })

    const total = itens.map(iten => iten.total_value).reduce((acc , val) => acc + val);

    const order = {
      client_id: client?.id,
      itens: formattedItens,
      status: 'Aberto',
      total: total
    }
    
    try {
      await api.post('orders', order)
      history.push('/orders')
    } catch (error) {
      alert(error.message)
    }

  }, [client, history, itens])

  const handleSubmitIten = useCallback((data) => {
    const product = products.find(product => product.name === data.productName)
    if(product){
      const iten = {
        id: uuid(),
        name: product.name,
        product_id: product?.id,
        amount: Number(data.amount),
        unitary_value: Number(product?.price),
        total_value: product?.price * data.amount
      }
      setItens([...itens, iten])
    }
  },[itens, products])

  const handleDeleteIten = useCallback((id:  string) => {
    const newArrayItens = itens.filter(iten => iten.id !== id)

    setItens(newArrayItens)

  }, [itens])

  const loadData = useCallback(async() => {
    try {
      const responseClient = await api.get('clients')
      const responseProduct = await api.get('products')

      setClients(responseClient.data)
      setProducts(responseProduct.data)
      setOptionsProducts(products.map(product=> {
        return {
          value: product.name,
          label: product.name
        }
      }))
    } catch (error) {
      alert(error.message)
    }
  }, [products])

  useEffect(() => {
    loadData()
  },[loadData])

  return(
    <DrawerLeft title={"Criar Novo Pedido"}>
      {
        client &&  (
          <h2>Cliente: {client.name}</h2>
        )
      }
      <Container>
        {
          !client && (
            <>
              <h2>Adicione o cliente ao Pedido</h2>
              <Form onSubmit={handleSubmitClient}>
                <div>
                  <Input
                    name="name"
                    placeholder="Nome"
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Telefone"
                  />
                  <Input
                    name="address"
                    placeholder="Endereco"
                  />
                </div>
                <Button type="submit">Criar ou Adicionar</Button>
              </Form>
            </>
          )
        }
        <ContainerFormOrder>
        {
          client && (
            <>
              
              <Form onSubmit={handleSubmitIten}>
              <h2>Escolher Produto</h2>
                <Select name="productName" options={optionsProducts} />
                <Input
                  name="amount"
                  placeholder="Quantidade"
                />
                <Button type="submit">Adicionar</Button>
                <Button onClick={handleSubmitOrder}>Finalizar Pedido</Button>
              </Form>
            </>
          )
        }
        {
          itens && client &&(
            <Table tableHeaders={headers}>
              {itens.map(iten => (
                <StyledTableRow key={iten.id}>
                  <StyledTableCell component="th" scope="row">{iten.name}</StyledTableCell>
                  <StyledTableCell>{iten.amount}</StyledTableCell>
                  <StyledTableCell>{iten.unitary_value}</StyledTableCell>
                  <StyledTableCell>{iten.total_value}</StyledTableCell>
                  <StyledTableCell><Button onClick={() => handleDeleteIten(iten.id)} ><DeleteIcon /></Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </Table>
          )
        } 
      </ContainerFormOrder>
      </Container>
    </DrawerLeft>
  )
}

export default CreateOrder