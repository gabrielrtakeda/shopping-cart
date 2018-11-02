import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'

import ProductCard from '../ProductCard';

class ProductCardList extends React.Component {
  render() {
    const { market } = this.props;

    console.log('ProductCardList', this.props);
    return (
      <Grid container spacing={16}>
        {market.products.list.map(({ product }) => (
          <Grid item key={product.id}>
            <ProductCard data={product} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

ProductCardList.propTypes = {
  market: PropTypes.object.isRequired,
};

export default ProductCardList;
