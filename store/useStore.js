import { create } from 'zustand'

export const initialState = {
  quantityTotal: 0,
  total: 0.0,
  items: [],
  payment_type: "",
  has_address: false,
}

function calcularPrecoTotal(items, quantity) {
  return items.reduce((total, item) => {
    const precoItem = item.price * quantity
    return total + precoItem
  }, 0)
}

function calcularQuantityTotal(items) {
  return items.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}

const useStore = create((set) => ({
  data: initialState,

  resetState: () =>
    set((state) => {
      const newState = {
        data: initialState,
      }
      console.log('Estado após definir status:', newState)
      return newState
    }),

  addItem: (item) =>
    set((state) => {
      const updatedItems = [...state.data.items, item]
      const total = calcularPrecoTotal(updatedItems, item.quantity)
      const quantityTotal = calcularQuantityTotal(updatedItems)
      const newState = {
        data: {
          ...state.data,
          items: updatedItems,
          total,
          quantityTotal,
        },
      }
      console.log('Estado após adicionar items:', newState)
      return newState
    }),

  updateItem: (id, newItem) =>
    set((state) => {
      const updatedItems = state.data.items.map((item) =>
        item._id === id ? { ...item, ...newItem } : item
      )
      const quantityTotal = calcularQuantityTotal(updatedItems) + newItem.quantity
      const total = calcularPrecoTotal(updatedItems, quantityTotal)
      const newState = {
        data: {
          ...state.data,
          items: updatedItems,
          total,
          quantityTotal,
        },
      }
      console.log('Estado após atualizar items:', newState)
      return newState
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.data.items.filter((item) => item._id !== id)
      const quantityTotal = calcularQuantityTotal(updatedItems)
      const total = calcularPrecoTotal(updatedItems, quantityTotal)
      const newState = {
        data: {
          ...state.data,
          items: updatedItems,
          total,
          quantityTotal,
        },
      }
      console.log('Estado após remover items:', newState)
      return newState
    }),

  setPaymentType: (type) =>
    set((state) => {
      const newState = {
        data: {
          ...state.data,
          payment_type: type,
        },
      }
      console.log('Estado após definir tipo do pagamento:', newState)
      return newState
    }),

  setHasAddress: (value) =>
    set((state) => {
      const newState = {
        data: {
          ...state.data,
          has_address: value,
        },
      }
      console.log('Estado após definir tipo do pagamento:', newState)
      return newState
    }),
}))

export default useStore
