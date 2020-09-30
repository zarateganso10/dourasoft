import React from 'react'

import { OrdersProvider } from './orders'


const AppProvider: React.FC = ({ children }) => (
  <OrdersProvider>
    {children}
  </OrdersProvider>
)

export default AppProvider