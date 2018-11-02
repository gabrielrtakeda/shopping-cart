import { VIEWER_ID } from '../constants'

export class Market {}
export class Category {}

export const categoriesById = {};
export const categoryIdsByUser = {
  [VIEWER_ID]: [],
};
let nextCategoryId = 0;

export const addCategory = name => {
  const category = new Category();
  category.id = `${nextCategoryId++}`;
  category.name = name;
  categoriesById[category.id] = category;
  categoryIdsByUser[VIEWER_ID].push(category.id);
  return category.id;
}

export const getCategories = () => {
  return categoryIdsByUser[VIEWER_ID].map(id => categoriesById[id]);
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
