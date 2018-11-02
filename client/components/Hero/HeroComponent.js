import React from 'react';
import PropTypes from 'prop-types';

const HeroComponent = ({ classes, image, color, children }) => {
  const backgroundStrategy = image ?
    { backgroundImage: `url(${image})` } :
    { backgroundColor: color }

    return (
      <div className={classes.root} style={backgroundStrategy}>
        {children}
      </div>
    );
};

HeroComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,

  ]).isRequired,
  image: PropTypes.string,
  color: PropTypes.string,
};

HeroComponent.defaultProps = {
  color: '#dfdfdf'
};

export default HeroComponent;
