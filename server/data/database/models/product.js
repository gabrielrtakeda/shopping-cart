import { MARKET_ID } from '../constants';
import { categoriesById } from './category';

export class Product {};

let nextProductId = 0;
export const productsById = {};
export const productIdsByMarket = {
  [MARKET_ID]: [],
};
export const productIdsByCategory = {};
Object.keys(categoriesById).forEach(key => {
  productIdsByCategory[key] = []
});

export const addProduct = (categoryId, quantity, price, name, attributes, image, description) => {
  const product = new Product();

  product.id = `${nextProductId++}`;
  product.categoryId = categoryId;
  product.quantity = quantity;
  product.price = price;
  product.name = name;
  product.attributes = attributes;
  product.image = image;
  product.description = description;

  productsById[product.id] = product;

  productIdsByMarket[MARKET_ID].push(product.id);
  productIdsByCategory[categoryId].push(product.id);

  return product.id;
};

export const getProduct = id => {
  return productsById[id];
};

export const getProducts = () => {
  return productIdsByMarket[MARKET_ID].map(id => productsById[id]);
};

export const getProductsByCategory = categoryId => {
  return categoryId === 'all' ?
    getProducts() :
    productIdsByCategory[categoryId].map(id => productsById[id]);
};

// Mock `Product` data
addProduct(0, 10, { default: 259.9, sale: 179.9 }, 'Toppling Goliath Brewing Company Kentucky Brunch Brand Stout', ['ABV: 12 percent', 'Decorah, Iowa, U.S.'], 'https://untappd.akamaized.net/photos/2018_10_08/b7144f62fcbffbb426c070fa13c540b9_640x640.jpg', 'If you can get your hands on this beer, you’re one lucky person. A barrel-aged imperial stout brewed with coffee, this beer is only released once a year, 300 to 400 bottles at a time, and only at the brewery. If you manage to nab a beer, you will taste a massive maple aroma, followed by hints of chocolate and hazelnut. This iconic beer is not just hype; it’s been consistently rated the top beer in the world by Beer Advocate, RateBeer, and of course, The Daily Meal. And if you’re looking for even more great beers, check out our list of the best beer in every state.');
addProduct(1, 0, { default: 179.9 }, 'Brouwerij De Sint-Sixtusabdij van Westvleteren Westvleteren 12 (XII)', ['ABV: 10.2 percent', 'Westvleteren, Belgium'], 'https://thumbor.thedailymeal.com/a0buBt7LF_HDOiJbVnjoZNo6X1k=/840x565/https://www.thedailymeal.com/sites/default/files/2018/02/13/2_Brouweij%20De%20Sint_Slide_edit_0.jpg', 'A true Trappist beer, brewed by Trappist monks on the grounds of the Saint Sixtus Abbey, this Belgian quad is a rich chestnut brown color with a nose of dark fruit and brown sugar. Complex and spicy, this brew is full of lively carbonation. What makes this beer so special is not only its taste but its rarity. Procuring a bottle is notoriously difficult; the monks are only allowed to make enough beer each month to support themselves and no more.');
