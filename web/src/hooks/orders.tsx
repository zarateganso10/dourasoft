import React, { createContext, useState, useCallback, useContext } from 'react'
import api from '../services/api'

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

interface OrderProps {
  id: string;
  client: {
    name: string;
  };
  total: number;
  status: string;
  client_id: string;
  itens: Array<ItenProps>;
}

interface OrdersContextData {
  orders: Array<OrderProps>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<void>;
  getById(id: string): Promise<OrderProps>;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData)

export const OrdersProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<OrderProps[]>([])

  const getAll = useCallback(async() => {
    try {
      const response = await api.get('orders')
      setData(response.data)
    } catch (error) {
      alert(error.message)
    }
  }, [])

  const getById = useCallback(async(id: string) => {
    try {
      const response = await api.get(`orders/${id}`)
      return response.data
    } catch (error) {
      alert(error.message)
    }
  }, [])

  const deleteById = useCallback(async(id: string) => {
    try { 
      await api.delete(`orders/${id}`)
      setData(data.filter((order: OrderProps) => order.id !== id))
    } catch (error) {
      alert(error.message)
    }
  }, [data])

  return (
    <OrdersContext.Provider value={{ orders: data, deleteById, getAll, getById }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders(): OrdersContextData {
  const context = useContext(OrdersContext)

  return context
}