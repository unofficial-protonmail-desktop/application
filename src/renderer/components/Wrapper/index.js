import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Wrapper = ({ children }) =>
  <div className={styles.container}>
    {children}
  </div>;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
