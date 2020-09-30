import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import DrawerLeft from '../../../components/DrawerLeft'
import Input from '../../../components/Input'

import { Container, Button } from './styles'
import api from '../../../services/api';

const CreateClient: React.FC = () => {
  const history = useHistory()

  const handleSubmit = useCallback(async (data) => {
    try {
      await api.post('/clients', data)
      history.push('/clients')
    } catch (error) {
      alert(error.message)
    }
    
  },[history])

  return(
    <DrawerLeft title={"Criar Novo Cliente"}>
      <Container>
        <h1>Criar Novo Cliente</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              name="name"
              placeholder="Nome"
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
          <Button type="submit">Criar</Button>
        </Form>
      </Container>
    </DrawerLeft>
  )
}

export default CreateClient