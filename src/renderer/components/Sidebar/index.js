import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './style.scss';

const Sidebar = ({
  accounts,
  onSelectAccount,
}) =>
  <div className={styles.container}>
    <Link to="/add-account" className={styles.tab}>
      <div>
        <span>+</span>
      </div>
    </Link>

    {accounts
      .map((account, index) => (
        <button
          key={index}
          className={styles.tab}
          onClick={onSelectAccount.bind(this, account)}
        >
          {account.charAt(0)}
        </button>
      ))}

    <Link
      to="/settings"
      className={styles.tab}
    >
      Settings
    </Link>
  </div>;

Sidebar.propTypes = {
  accounts: PropTypes.array.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
};

export default Sidebar;
