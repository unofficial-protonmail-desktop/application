import React from 'react';
import PropTypes from 'prop-types';

export default class Settings extends React.Component {
  static propTypes = {
    darkTheme: PropTypes.bool.isRequired,
    onChangeSetting: PropTypes.func.isRequired,
  };

  handleChangeCheckbox({ target }) {
    this.props.onChangeSetting(target.name, target.checked);
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>

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
    );
  }
}

