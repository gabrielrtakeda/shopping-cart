import { withStyles } from '@material-ui/core/styles';

import CartProductHeader from './CartProductHeader';
import CartProductComponent from './CartProductComponent';
import styles from './CartProduct.styles';

CartProductComponent.Header = withStyles(styles)(CartProductHeader);

export default withStyles(styles)(CartProductComponent)
