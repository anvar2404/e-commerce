import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket } from '../redux/reducers/catalog'

const CatalogItem = () => {
  const catalog = useSelector((s) => s.products.catalog)
  const selected = useSelector((s) => s.products.selected)
  const base = useSelector((s) => s.products.base)
  const currency = useSelector((s) => s.products.currency)
  const currencySymbol = useSelector((s) => s.products.currencySymbol)
  const search = useSelector((s) => s.products.search)
  const filteredCatalog = catalog.filter((el) => el.title.toLowerCase().includes(search))
  const dispatch = useDispatch()
  return (
    <div className="flex flex-wrap -mx-4 -my-4">
      {filteredCatalog.map((product) => (
        <div key={product.id} className="w-1/4  p-4 text-center ">
          <div className="border-solid border-2 border-black  mb-8">
            <img src={product.image} alt="" className="w-full h-40 object-contain mt-2" />
            <div>{product.title}</div>
            <div>
              Price : {(product.price * (currency[base] || 1)).toFixed(2)} {currencySymbol[base]}
            </div>
            <div className="flex items-center justify-evenly">
              <button
                type="button"
                className="outline-none border-none"
                onClick={() => dispatch(removeFromBasket(product.id, product.title))}
              >
                <RemoveIcon />
              </button>
              <span>{selected[product.id] || 0}</span>
              <button
                type="button"
                className="outline-none border-none"
                onClick={() => dispatch(addToBasket(product.id, product.title))}
              >
                <AddIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CatalogItem
