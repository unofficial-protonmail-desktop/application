import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { remote } from 'electron';

import styles from './styles.scss';

export class SidebarItem extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onOpenMenu: PropTypes.func.isRequired,
    unreadEmails: PropTypes.number,
    username: PropTypes.string.isRequired,
  };

  static defaultProps = {
    unreadEmails: null,
  };

  constructor(props) {
    super(props);

    this.elemRef = null;
  }

  componentDidMount() {
    if (this.elemRef) {
      this.elemRef.addEventListener('contextmenu', event => {
        event.preventDefault();

        this.props.onOpenMenu();
      });
    }
  }

  render() {
    const { href, isActive, unreadEmails, username } = this.props;
    const className = styles.AccountBadge.concat(' ' + (isActive ? styles.Active : ''));

    return (
      <Link
        className={className}
        innerRef={(ref) => this.elemRef = ref}
        to={href}
      >
        {username.charAt(0)}

        {!!unreadEmails && <span className={`${styles.NotificationBadge} notifications`}>{unreadEmails}</span>}
      </Link>
    );
  }
}

export default class ConnectedSidebarItem extends React.Component {
  static propTypes = {
    onRemoveAccount: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
  };

  menu = remote.Menu.buildFromTemplate([{
    label: 'Remove account',
    visible: true,
    click: () => {
      this.props.onRemoveAccount(this.props.username);
    },
  }]);

  render() {
    return (
      <SidebarItem
        {...this.props}
        onOpenMenu={() => {
          this.menu.popup(remote.getCurrentWindow());
        }}
      />
    );
  }
}

