import axios from 'axios'
import { products, categories, orders } from '../data/mockData'

export const api = axios.create({
  baseURL: '/api',
  timeout: 600,
})

export const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return products
}

export const fetchCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 220))
  return categories
}

export const fetchOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 280))
  return orders
}

export const submitCheckout = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { success: true, orderId: `NX-${Math.floor(Math.random() * 9000 + 1000)}` , payload }
}
