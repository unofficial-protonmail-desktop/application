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
      .map(({ username, unreadEmails }, index) => (
        <Link
          key={index}
          className={styles.AccountBadge}
          to={`/mailbox/${username}`}
        >
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
};

export default Sidebar;
