import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../../../services/relay/environment';
import ProductDetailComponent from './ProductDetailComponent';

const query = graphql`
  query ProductDetailContainerQuery($id: ID!) {
    market {
      product(id: $id) {
        id
        name
        categoryId
        attributes
        image
        description
        quantity
      }
    }
  }
`;

const ProductDetailContainer = ({ id, ...componentProps }) => (
  <QueryRenderer
    environment={environment}
    query={query}
    variables={{ id }}
    render={({ error, props }) => (
      <ProductDetailComponent
        {...props}
        {...componentProps}
      />
    )}
  />
);

export default ProductDetailContainer;
