import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProductDetail from '../ProductDetail'
import ProductBuyAction from '../ProductBuyAction'

class ProductCard extends React.Component {
  state = {
    openDetail: false,
  };

  handleOpen = () => {
    this.setState({ openDetail: true });
  };

  handleClose = () => {
    this.setState({ openDetail: false });
  };

  render() {
    const { classes, data } = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <Card>
            <CardActionArea onClick={this.handleOpen}>
              <CardMedia
                className={classes.media}
                image={data.image}
                title={data.name}
              />

              <CardContent>
                <Typography gutterBottom variant="subtitle1" noWrap>
                  {data.name}
                </Typography>
                <Typography gutterBottom>{data.categoryId}</Typography>
                {data.attributes.map(attribute => (
                  <Typography color="textSecondary">
                    {attribute}
                  </Typography>
                ))}
              </CardContent>
            </CardActionArea>

            <CardActions className={classes.actions}>
              <ProductBuyAction data={data} noMargin />
            </CardActions>
          </Card>
        </Grid>
        <ProductDetail
          id={data.id}
          open={this.state.openDetail}
          handleClose={::this.handleClose}
        />
      </React.Fragment>
    );
  }
}

const { object, shape, string, number, arrayOf } = PropTypes;

ProductCard.propTypes = {
  classes: object.isRequired,
  data: shape({
    id: string,
    name: string,
    categoryId: number,
    attributes: arrayOf(string),
    image: string,
    description: string,
    quantity: number,
  }).isRequired,
};

export default ProductCard;
