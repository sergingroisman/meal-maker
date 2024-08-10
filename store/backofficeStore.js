import { create } from 'zustand'

export const initialState = {
  quantityPendent: 0,
  orders: [],
  loading: false,
}

function calcQuantityTotal(orders) {
  return orders
  .filter(order => order.status === "Pedido Enviado")
  .reduce((total, order) => {
    return total + 1
  }, 0)
}

const backofficeStore = create((set) => ({
  data: initialState,

  resetState: () =>
    set((state) => {
      const newState = {
        data: initialState,
      }
      console.log('Estado após resetState:', newState)
      return newState
    }),

  addOrders: (orders) =>
    set((state) => {
      const updatedOrders = orders
      const quantityPendent = calcQuantityTotal(updatedOrders)
      const newState = {
        data: {
          ...state.data,
          orders: updatedOrders,
          quantityPendent,
        },
      }
      console.log('Estado após addOrders:', newState)
      return newState
    }),

  updateOrders: (id, newOrder) =>
    set((state) => {
      const updatedOrders = state.data.orders.map((order) =>
        order._id === id ? { ...order, ...newOrder } : order
      )
      const quantityPendent = calcQuantityTotal(updatedOrders)
      const newState = {
        data: {
          ...state.data,
          orders: updatedOrders,
          quantityPendent,
        },
      }
      console.log('Estado após addOrders:', newState)
      return newState
    }),

  setLoading: (value) =>
    set((state) => {
      const newState = {
        data: {
          ...state.data,
          loading: value,
        },
      }
      console.log('Estado após setLoading:', newState)
      return newState
    }),
}))

export default backofficeStore
