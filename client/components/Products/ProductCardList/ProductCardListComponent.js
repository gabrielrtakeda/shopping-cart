import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'

import LayoutContent from '../../LayoutContent'
import CategoriesBar from '../CategoriesBar/CategoriesBarContainer';
import ProductCard from '../ProductCard';
import HeroBlackFriday from '../HeroBlackFriday/HeroBlackFridayComponent'
import { CategoriesBarContext } from '../CategoriesBar/CategoriesBarContext'

class ProductCardList extends React.Component {
  constructor(props) {
    super(props);

    this.setCategoryId = categoryId => {
      this.setState({ categoryId });
    }

    this._refetch = categoryId => {
      this.props.relay.refetch(fragmentVariables => ({ categoryId }));
    }

    this.state = {
      categoryId: 'all',
      setCategoryId: this.setCategoryId,
      refetchProducts: this._refetch,
    };
  }

  render() {
    const { market } = this.props;

    return (
      <CategoriesBarContext.Provider value={this.state}>
        <CategoriesBar market={market} />
        <LayoutContent>
          <HeroBlackFriday />
          <Grid container spacing={16}>
            {market.products && market.products.list.map(({ product }) => (
              <Grid item key={product.id}>
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
  market: PropTypes.object.isRequired,
};

export default ProductCardList;
