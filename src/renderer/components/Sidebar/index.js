import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Sidebar = ({
  accounts,
  onAddAccount,
  onSelectAccount,
}) =>
  <div className={styles.container}>
    <button
      className={styles.tab}
      onClick={onAddAccount}
    >
      <div>
        <span>+</span>
      </div>
    </button>

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
  </div>;

Sidebar.propTypes = {
  accounts: PropTypes.array,
  onAddAccount: PropTypes.func.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  accounts: [],
};

export default Sidebar;
