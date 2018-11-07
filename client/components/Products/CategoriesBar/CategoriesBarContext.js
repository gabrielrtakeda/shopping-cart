import React from 'react'

export const CategoriesBarContext = React.createContext({
  categoryId: 'all',
  setCategoryId: () => {},
  refetchProducts: f => f
})
