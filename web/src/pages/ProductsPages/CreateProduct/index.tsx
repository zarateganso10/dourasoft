import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import DrawerLeft from '../../../components/DrawerLeft'
import Input from '../../../components/Input'

import { Container, Button } from './styles'
import api from '../../../services/api';

const CreateProduct: React.FC = () => {
  const history = useHistory()

  const handleSubmit = useCallback(async (data) => {
    try {
      await api.post('/products', data)
      history.push('/products')
    } catch (error) {
      alert(error.message)
    }
  },[history])

  return(
    <DrawerLeft title={"Criar Novo Produto"}>
      <Container>
        <h1>Criar Produto</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              name="code"
              placeholder="Codigo"
            />
            <Input
              name="name"
              placeholder="Nome"
            />
            <Input
              name="description"
              placeholder="Descricao"
            />
            <Input
              name="price"
              placeholder="Preco"
            />
          </div>
          <Button type="submit">Criar</Button>
        </Form>
      </Container>
    </DrawerLeft>
  )
}

export default CreateProduct