import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class Settings extends React.Component {
  static propTypes = {
    darkTheme: PropTypes.bool.isRequired,
    onChangeSetting: PropTypes.func.isRequired,
    useProtonMailBeta: PropTypes.bool.isRequired,
  };

  handleChangeCheckbox({ target }) {
    this.props.onChangeSetting(target.name, target.checked);
  }

  render() {
    return (
      <div className={styles.Container}>
        <h1>Settings</h1>

        <div className={styles.FormControl}>
          <input
            checked={this.props.darkTheme}
            id="settings-dark-theme"
            name="darkTheme"
            type="checkbox"
            onChange={this.handleChangeCheckbox.bind(this)}
          />
          <label htmlFor="settings-dark-theme">
            Dark theme
          </label>
        </div>

        <div className={styles.FormControl}>
          <input
            checked={this.props.useProtonMailBeta}
            id="settings-use-beta"
            name="useProtonMailBeta"
            type="checkbox"
            onChange={this.handleChangeCheckbox.bind(this)}
          />
          <label htmlFor="settings-use-beta">
            Use beta.protonmail.com
          </label>
        </div>
      </div>
    );
  }
}

