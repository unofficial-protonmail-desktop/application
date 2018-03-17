import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Sidebar = ({ onAddAccount }) =>
  <div className={styles.container}>
    <button
      className={styles.tab}
      onClick={onAddAccount}
    >
      <div>
        <span>+</span>
      </div>
    </button>
  </div>;

Sidebar.propTypes = {
  onAddAccount: PropTypes.func,
};

export default Sidebar;
