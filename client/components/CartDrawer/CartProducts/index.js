import { withStyles } from '@material-ui/core/styles';

import CartProductsHeader from './CartProductsHeader';
import CartProductsComponent from './CartProductsComponent';
import styles from './CartProducts.styles';

CartProductsComponent.Header = withStyles(styles)(CartProductsHeader);

export default withStyles(styles)(CartProductsComponent)
