import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

export default class AddAccount extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    username: '',
  };

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.onSubmit({
      username: this.state.username,
    });
  }

  handleUsernameChange({ target }) {
    this.setState({ username: target.value });
  }

  render() {
    return (
      <div className={styles.AddAccountContainer}>
        <form
          className={styles.formContainer}
          onSubmit={this.handleFormSubmit.bind(this)}
        >

          <h1>Add account</h1>

          <div className={styles.form__group}>
            <input
              type="text"
              name="username"
              id="username"
              className={styles.form__field}
              value={this.state.username}
              placeholder="Enter e-mail or username"
              autoFocus
              onChange={this.handleUsernameChange.bind(this)}
            />

            <label
              className={styles.form__label}
              htmlFor="username"
            >Enter e-mail or username</label>

          </div>

        </form>
      </div>
    );
  }
}
