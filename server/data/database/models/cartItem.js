import { CART_ID } from '../constants'

let nextCartItemId = 0;
export class CartItem {}

export const itemById = {};
export const itemIdsByCart = {
  [CART_ID]: [],
};

export const addCartItem = (productId, quantity) => {
  const item = new CartItem();
  item.id = `${nextCartItemId++}`;
  item.productId = productId;
  item.quantity = quantity;
  itemById[item.id] = item;
  itemIdsByCart[CART_ID].push(item.id);
  return item.id;
}

export const getCartItems = () => {
  return itemIdsByCart[CART_ID].map(id => itemById[id]);
}

export const getCartItem = id => {
  return itemById[id];
}

// Mock `CartItems` data
addCartItem(0, 1);
addCartItem(2, 5);
addCartItem(3, 10);
