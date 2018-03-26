import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './style.scss';

const Sidebar = ({
  accounts,
}) =>
  <div className={styles.container}>
    <Link to="/add-account" className={styles.tab}>
      <div>
        <span>+</span>
      </div>
    </Link>

    {accounts
      .map((account, index) => (
        <Link
          key={index}
          className={styles.AccountBadge}
          to={`/mailbox/${account}`}
        >
          {account.charAt(0)}
        </Link>
      ))}

    <Link
      to="/settings"
      className={styles.SettingsTab}
    >
      settings
    </Link>
  </div>;

Sidebar.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default Sidebar;
