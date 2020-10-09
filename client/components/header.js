import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { useDispatch, useSelector } from 'react-redux'
import { setBase, setSearch } from '../redux/reducers/catalog'

const Header = () => {
  const selected = useSelector((s) => s.products.selected)
  const totalCount = Object.values(selected).reduce((acc, rec) => acc + rec, 0)
  const base = useSelector((s) => s.products.base)
  const dispatch = useDispatch()
  return (
    <header className="sticky top-0 flex flex-wrap bg-black text-white justify-between items-center py-4 px-6 text-center">
      <div className="w-1/4">
        <button className="mr-3" type="button" onClick={() => dispatch(setBase('USD', base))}>
          USD
        </button>
        <button className="mr-3" type="button" onClick={() => dispatch(setBase('EUR', base))}>
          EUR
        </button>
        <button type="button" onClick={() => dispatch(setBase('CAD', base))}>
          CAD
        </button>
      </div>
      <div className="w-1/2 text-xl uppercase">
        <Link to="/" className="uppercase">
          e-commerce
        </Link>
      </div>
      <nav className="w-1/4 flex justify-evenly items-center">
        <input
          type="text"
          className="text-black rounded px-2"
          onChange={(e) => dispatch(setSearch(e))}
        />
        <div className="flex items-center w-1/8">
          <Link className to="/basket">
            <ShoppingBasketIcon className="h-10 pb-1" />
          </Link>
          <span className="text-sm">{totalCount}</span>
        </div>
        <Link to="/logs" className="uppercase">
          Logs
        </Link>
      </nav>
    </header>
  )
}

export default Header
