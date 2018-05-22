import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

export default class SidebarItem extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    unreadEmails: PropTypes.number,
    username: PropTypes.string.isRequired,
  };

  static defaultProps = {
    unreadEmails: null,
  };

  render() {
    const { href, isActive, unreadEmails, username } = this.props;
    const className = styles.AccountBadge.concat(' ' + (isActive ? styles.Active : ''));

    return (
      <Link
        className={className}
        to={href}
      >
        {username.charAt(0)}

        {unreadEmails && <span className={styles.NotificationBadge}>{unreadEmails}</span>}
      </Link>
    );
  }
}
