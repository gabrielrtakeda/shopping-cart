import { CART_ID } from '../constants'

export class Cart {}

// Mock `Cart` data
export const cart = new Cart();
cart.id = CART_ID;

export const cartsById = {
  [CART_ID]: cart,
};

export const getCart = (id) => {
  return cartsById[id || CART_ID];
}
