import React from 'react';
import PropTypes from 'prop-types';

export default class MailBox extends React.Component {
  static propTypes = {
    displayWebview: PropTypes.func.isRequired,
    error: PropTypes.object,
    hideWebviews: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  constructor(props) {
    super(props);

    this.handleReload = this.handleReload.bind(this);
  }

  componentDidMount() {
    this.props.displayWebview(this.props.username);
  }

  componentWillReceiveProps({ error, username }) {
    if (error) {
      this.props.hideWebviews();
    } else {
      if (this.props.username !== username) {
        this.props.displayWebview(username);
      }

      if (error !== this.props.error) {
        this.props.displayWebview(username);
      }
    }
  }

  componentWillUnmount() {
    this.props.hideWebviews();

    /**
     * TODO: Clear error upon unmount
     */
  }

  handleReload() {
    this.props.onReload(this.props.username);
  }

  render() {
    if (this.props.error) {
      return (
        <div>
          <h1>Are you connected?</h1>
          <p>Login page couldnt be loaded due to the following error:</p>
          <p>{this.props.error.errorDescription}</p>
          <p>Please check your internet connection and try to reload the page.</p>
          <button onClick={this.handleReload}>Reload</button>
        </div>
      );
    }
    return <div style={{ display: 'none' }}/>;
  }
}
