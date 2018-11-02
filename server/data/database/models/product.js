import { categoriesById } from './category'

export class Product {}

let nextProductId = 0;
export const productsById = {};
export const productIdsByCategory = {};
Object.keys(categoriesById).forEach(key => {
  productIdsByCategory[key] = []
});

export const addProduct = (name, categoryId, attributes, image, description, quantity) => {
  const product = new Product();

  product.id = `${nextProductId++}`;
  product.name = name;
  product.categoryId = categoryId;
  product.attributes = attributes;
  product.image = image;
  product.description = description;
  product.quantity = quantity;

  productsById[product.id] = product;
  productIdsByCategory[categoryId].push(product.id);
  return product.id;
}

export const getProduct = id => {
  return productsById[id];
}

export const getProductsByCategory = categoryId => {
  return productIdsByCategory[categoryId].map(id => productsById[id]);
}

// Mock `Product` data
addProduct('Toppling Goliath Brewing Company Kentucky Brunch Brand Stout', 0, ['ABV: 12 percent'], 'https://thumbor.thedailymeal.com/d9XaD_hMKdeFEQyX1pe6-SVf3LY=/840x565/https://www.thedailymeal.com/sites/default/files/2018/02/13/1_Toppling%20Goliath%20Brewing_SLide_edit_0.jpg', 'If you can get your hands on this beer, you’re one lucky person. A barrel-aged imperial stout brewed with coffee, this beer is only released once a year, 300 to 400 bottles at a time, and only at the brewery. If you manage to nab a beer, you will taste a massive maple aroma, followed by hints of chocolate and hazelnut. This iconic beer is not just hype; it’s been consistently rated the top beer in the world by Beer Advocate, RateBeer, and of course, The Daily Meal. And if you’re looking for even more great beers, check out our list of the best beer in every state.', 5);
