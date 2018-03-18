import React from 'react';
import PropTypes from 'prop-types';

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
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <h1>Add account</h1>

        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}
