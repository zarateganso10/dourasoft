import React, { useEffect, useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';

import DrawerLeft from '../../../components/DrawerLeft'
import Input from '../../../components/Input'

import { Container, Button } from './styles'
import api from '../../../services/api';

import { ProductProps } from '../ListProducts'

interface ParamsProps {
  id: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<ParamsProps>()
  const history = useHistory()
  const [product, setProduct] = useState<ProductProps>({} as ProductProps)

  const handleSubmit = useCallback(async (data) => {
    try {
      await api.patch(`products/${id}`, data)
      history.push('/products')
    } catch (error) {
      alert(error.message)
    }
    
  },[history, id])

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data)
        console.log(response.data)
      })
  }, [id])

  return(
    <DrawerLeft title={"Editar Cliente"}>
      <Container>
        <h1>Editar {product.name}</h1>
        <Form onSubmit={handleSubmit}>
          <div>
          <Input
              defaultValue={product.code}
              name="code"
            />
            <Input
              defaultValue={product.name}
              name="name"
            />
            <Input
              defaultValue={product.description}
              name="description"
            />
            <Input
              defaultValue={product.price}
              name="price"
            />
          </div>
          <Button type="submit">Atualizar</Button>
        </Form>
      </Container>
    </DrawerLeft>
  )
}

export default EditProduct