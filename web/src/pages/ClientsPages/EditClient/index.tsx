import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import DrawerLeft from '../../../components/DrawerLeft'
import Input from '../../../components/Input'

import { Container, Button } from './styles'
import api from '../../../services/api';

import { ClientProps } from '../ListClients'

interface ParamsProps {
  id: string;
}

const EditClients: React.FC = () => {
  const { id } = useParams<ParamsProps>()
  const history = useHistory()
  const [client, setClient] = useState<ClientProps>({} as ClientProps)

  const handleSubmit = useCallback(async (data) => {
    try {
      await api.patch(`clients/${id}`, data)
      history.push('/clients')
    } catch (error) {
      alert(error.message)
    }
    
  },[history, id])

  useEffect(() => {
    api.get(`/clients/${id}`)
      .then(response => {
        setClient(response.data)
        console.log(response.data)
      })
  }, [id])

  return(
    <DrawerLeft title={"Editar Cliente"}>
      <Container>
        <h1>Editar Cliente {client.name}</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              defaultValue={client.name}
              name="name"
            />
            <Input
              defaultValue={client.phone}
              name="phone"
            />
            <Input
              defaultValue={client.address}
              name="address"
            />
          </div>
          <Button type="submit">Atualizar</Button>
        </Form>
      </Container>
    </DrawerLeft>
  )
}

export default EditClients