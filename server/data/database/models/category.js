import { MARKET_ID } from '../constants'

export class Category {}

export const categoriesById = {}
export const categoryIdsByMarket = {
  [MARKET_ID]: []
}
let nextCategoryId = 0

export const addCategory = name => {
  const category = new Category()
  category.id = `${nextCategoryId++}`
  category.name = name
  categoriesById[category.id] = category
  categoryIdsByMarket[MARKET_ID].push(category.id)
  return category.id
}

export const getCategories = () => {
  return categoryIdsByMarket[MARKET_ID].map(id => categoriesById[id])
}

export const getCategory = id => {
  return categoriesById[id]
}

export const getCategoryIdByName = name => {
  return Object.keys(categoriesById).find(id => categoriesById[id].name === name)
}

// Mock `Categories` data
addCategory('Belgium')
addCategory('Canada')
addCategory('Denmark')
addCategory('England')
addCategory('France')
addCategory('Germany')
addCategory('Greece')
addCategory('Norway')
addCategory('Poland')
addCategory('Sweden')
addCategory('U.S.')
