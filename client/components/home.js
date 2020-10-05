import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Catalog from './catalog'
import Header from './header'
import { getCatalog, getCurrency, getLogs } from '../redux/reducers/catalog'
import Basket from './basket'
import Logs from './logs'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCatalog())
    dispatch(getCurrency())
    dispatch(getLogs())
  })
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 px-20">
        <Route exact path="/" component={() => <Catalog />} />
        <Route exact path="/basket" component={() => <Basket />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
