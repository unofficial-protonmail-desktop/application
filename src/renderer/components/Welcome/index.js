import React from 'react';
import styles from './styles.scss';

const Welcome = () => (
  <div className={styles.Welcome}>
    <h1>Welcome to ProtonMail unofficial desktop application</h1>

    <div>
      <a
        className={styles.AccountBadge}
        href="#/add-account"
      >
      Add existing account
      </a>

      <div>or</div>

      <a
        className={styles.AccountBadge}
        href="https://protonmail.com/signup"
      >
      Sign up
      </a>
    </div>
  </div>
);

export default Welcome;
