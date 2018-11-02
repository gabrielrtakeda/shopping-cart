import { MARKET_ID } from '../constants'

export class Category {}

export const categoriesById = {};
export const categoryIdsByMarket = {
  [MARKET_ID]: [],
};
let nextCategoryId = 0;

export const addCategory = name => {
  const category = new Category();
  category.id = `${nextCategoryId++}`;
  category.name = name;
  categoriesById[category.id] = category;
  categoryIdsByMarket[MARKET_ID].push(category.id);
  return category.id;
}

export const getCategories = () => {
  return categoryIdsByMarket[MARKET_ID].map(id => categoriesById[id]);
}

export const getCategory = id => {
  return categoriesById[id];
}

// Mock `Categories` data
addCategory('Argentina');
addCategory('Baiana');
addCategory('Bebidas');
addCategory('Cafeteria');
addCategory('Carnes');
addCategory('Casa de Sucos');
addCategory('Comida Alemã');
addCategory('Comida Árabe');
addCategory('Comida Asiática');
addCategory('Comida Brasileira');
addCategory('Comida Contemporânea');
