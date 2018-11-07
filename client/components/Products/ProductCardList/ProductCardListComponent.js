import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import LayoutContent from '../../LayoutContent'
import CategoriesBar from '../CategoriesBar/CategoriesBarContainer'
import ProductCard from '../ProductCard'
import HeroBlackFriday from '../HeroBlackFriday/HeroBlackFridayComponent'
import { CategoriesBarContext } from '../CategoriesBar/CategoriesBarContext'

class ProductCardList extends React.Component {
  constructor (props) {
    super(props)

    this.setCategoryId = categoryId => {
      this.setState({ categoryId })
    }

    this.refetchProducts = categoryId => {
      this.props.relay.refetch(fragmentVariables => ({ categoryId }))
    }

    this.state = {
      categoryId: 'all',
      setCategoryId: this.setCategoryId,
      refetchProducts: this.refetchProducts
    }
  }

  render () {
    const { market } = this.props

    return (
      <CategoriesBarContext.Provider value={this.state}>
        <CategoriesBar market={market} />
        <LayoutContent>
          <HeroBlackFriday />
          <Grid container spacing={16}>
            {market.products && market.products.list.map(({ product }) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard data={product} />
              </Grid>
            ))}
          </Grid>
        </LayoutContent>
      </CategoriesBarContext.Provider>
    )
  }
}

ProductCardList.propTypes = {
  market: PropTypes.object.isRequired
}

export default ProductCardList
