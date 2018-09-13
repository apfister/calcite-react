import PropTypes from 'prop-types';
import React from 'react';
import withRefs from '../utils/withRefs';
import { StyledCardTitle } from './Card-styled';

const CardTitle = ({ children, forwardedRef, ...other }) => {
  return (
    <StyledCardTitle ref={forwardedRef} {...other}>
      {children}
    </StyledCardTitle>
  );
};

CardTitle.propTypes = {
  /** Description TBD */
  children: PropTypes.node
};

CardTitle.defaultProps = {};

export default withRefs(CardTitle);
