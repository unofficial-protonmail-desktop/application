import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './style.scss';

const Sidebar = ({
  accounts,
  location,
}) =>
  <div className={styles.container}>
    <Link to="/add-account" className={styles.tab}>
      <div>
        <span>+</span>
      </div>
    </Link>

    {accounts
      .map(account => ({ ...account, path: `/mailbox/${account.username}` }))
      .map(account => ({ ...account, isActive: account.path === location.pathname }))
      .map(({ username, unreadEmails, path, isActive }, index) => (
        <Link
          key={index}
          className={styles.AccountBadge}
          to={path}
        >
          {isActive && 'active'}
          {username.charAt(0)}

          {unreadEmails && <span className={styles.NotificationBadge}>{unreadEmails}</span>}
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
  location: PropTypes.object.isRequired,
};

export default Sidebar;
