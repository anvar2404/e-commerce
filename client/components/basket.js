import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket } from '../redux/reducers/catalog'

const Basket = () => {
  const dispatch = useDispatch()
  const catalog = useSelector((s) => s.products.catalog)
  const selected = useSelector((s) => s.products.selected)
  const base = useSelector((s) => s.products.base)
  const currency = useSelector((s) => s.products.currency)
  const currencySymbol = useSelector((s) => s.products.currencySymbol)
  const cart = catalog.filter((el) => Object.keys(selected).includes(el.id))
  const total = cart.reduce(
    (acc, rec) => acc + rec.price * (currency[base] || 1) * selected[rec.id],
    0
  )
  return (
    <div>
      <div className="flex py-4 px-4 bg-gray-400 mb-2">
        <div className="w-1/3">Название</div>
        <div className="w-1/3 text-center">Количество</div>
        <div className="w-1/3 text-center">Цена за товар</div>
      </div>
      {cart.map((product) => (
        <div key={product.id} className="flex py-4 px-4 items-center bg-gray-400 mb-2">
          <div className="w-1/3">{product.title}</div>
          <div className="w-1/3 text-center">
            <button
              type="button"
              className="outline-none border-none"
              onClick={() => dispatch(removeFromBasket(product.id, product.title))}
            >
              <RemoveIcon />
            </button>
            <span className="px-4">{selected[product.id]}</span>
            <button
              type="button"
              className="outline-none border-none"
              onClick={() => dispatch(addToBasket(product.id, product.title))}
            >
              <AddIcon />
            </button>
          </div>
          <div className="w-1/3 text-center">
            {(product.price * (currency[base] || 1)).toFixed(2)} {currencySymbol[base]}
          </div>
        </div>
      ))}
      <div className="text-right text-xl">
        Total:{total.toFixed(2)} {currencySymbol[base]}
      </div>
    </div>
  )
}

export default Basket
