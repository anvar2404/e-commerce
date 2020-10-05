import axios from 'axios'

const initialState = {
  catalog: [],
  selected: {},
  currency: {},
  base: 'EUR',
  search:'',
  currencySymbol: {
    EUR: '€',
    USD: '$',
    CAD: 'C$'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@SET_CATALOG':
      return { ...state, catalog: action.catalog }
    case '@@SET_CURRENCY':
      return { ...state, currency: action.currency }
    case 'SET_BASE':
      return { ...state, ...state.base, base: action.newBase }
      case 'SET_SEARCH':
          return {...state , search: action.search}
    case 'ADD_TO_CART':
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.id]: (state.selected[action.id] || 0) + 1
        }
      }
    case 'REMOVE_FROM_CART': {
      const updatedSelection = {
        ...state.selected,
        [action.id]: (state.selected[action.id] || 0) - 1
      }
      if (updatedSelection[action.id] <= 0) {
        delete updatedSelection[action.id]
      }
      return {
        ...state,
        selected: updatedSelection
      }
    }
    default:
      return state
  }
}

export function getCatalog() {
  return (dispatch) => {
    return axios('/api/v1/catalog').then(({ data }) =>
      dispatch({ type: '@@SET_CATALOG', catalog: data })
    )
  }
}

export function getCurrency() {
  return (dispatch) => {
    return axios('/api/v1/currency').then(({ data }) =>
      dispatch({ type: '@@SET_CURRENCY', currency: data })
    )
  }
}

export function getLogs() {
  return (dispatch) => {
    return axios('/api/v1/logs').then(({ data }) => dispatch({ type: '@@SET_LOGS', logs: data }))
  }
}

export function addToBasket(id, title) {
  return { type: 'ADD_TO_CART', id, title }
}

export function removeFromBasket(id, title) {
  return { type: 'REMOVE_FROM_CART', id, title }
}
export function setBase(newBase, base) {
  return { type: 'SET_BASE', newBase, base }
}

export function setSearch(e) {
    return (dispatch) => {
      return dispatch({ type:'SET_SEARCH', search: e.target.value })
    }
}
