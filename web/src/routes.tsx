import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'

import ListClients from './pages/ClientsPages/ListClients'
import EditClient from './pages/ClientsPages/EditClient'
import CreateClient from './pages/ClientsPages/CreateClient'

import ListProducts from './pages/ProductsPages/ListProducts'
import EditProduct from './pages/ProductsPages/EditProduct'
import CreateProduct from './pages/ProductsPages/CreateProduct'

import ListOrders from './pages/OrdersPages/ListOrders'
import EditOrder from './pages/OrdersPages/EditOrder'
import CreateOrder from './pages/OrdersPages/CreateOrder'


const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />

    <Route exact path="/clients" component={ListClients} />
    <Route path="/clients/edit/:id" component={EditClient} />
    <Route path="/clients/add" component={CreateClient} />

    <Route exact path="/products" component={ListProducts} />
    <Route path="/products/edit/:id" component={EditProduct} />
    <Route path="/products/add" component={CreateProduct} />

    <Route exact path="/orders" component={ListOrders} />
    <Route path="/orders/edit/:id" component={EditOrder} />
    <Route path="/orders/add" component={CreateOrder} />
  </Switch>
)

export default Routes