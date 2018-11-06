import { CART_ID } from '../constants'
import { getProduct, updateProductQuantity } from '../../database'

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
  return item;
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

export const updateProductInTheCart = (productId, quantity, append) => {
  const itemIds = Object.keys(itemById);
  const matchedProductId = itemIds.find(id => itemById[id].productId === productId);

  let item;
  let product;

  if (matchedProductId === undefined) {
    item = addCartItem(productId, quantity);
    product = updateProductQuantity(productId, quantity * -1)
  }
  else {
    item = itemById[matchedProductId];

    if (append) {
      // sum received quantity with current
      // cart item quantity, instead of adding
      // product diff quantity.
      product = updateProductQuantity(productId, quantity * -1);
      item.quantity = item.quantity + quantity;
    }
    else {
      // update product stock quantity
      // before update the cart item quantity of product,
      // to avoiding to lose the before cart item quantity state.
      product = updateProductQuantity(productId, item.quantity - quantity);
      item.quantity = quantity;
    }
  }
  return { item, product };
};

// Mock `CartItems` data
addCartItem(0, 1);
addCartItem(2, 5);
addCartItem(3, 10);
