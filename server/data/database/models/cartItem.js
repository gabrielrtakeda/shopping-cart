import { CART_ID } from '../constants'
import { getProduct } from '../../database'

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

export const getCartItemsTotalPrice = () => {
  let total = 0;
  const products = getCartItems().forEach(item => {
    const { price } = getProduct(item.productId);
    total += (price.sale ? price.sale : price.default) * item.quantity;
  });

  return total;
};

export const getCartItemsQuantity = () => {
  return getCartItems().map(item => item.quantity).reduce((acc, cur) => acc + cur);
};

// Mock `CartItems` data
addCartItem(0, 1);
addCartItem(2, 5);
addCartItem(3, 10);
