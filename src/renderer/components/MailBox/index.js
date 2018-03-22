import React from 'react';
import PropTypes from 'prop-types';

export default class MailBox extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    webviewHandler: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.webviewHandler.show();
    this.props.webviewHandler.displayView(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.props.webviewHandler.displayView(nextProps.username);
    }
  }

  componentWillUnmount() {
    this.props.webviewHandler.hide();
  }

  reload() {
    this.props.webviewHandler.reload(this.props.username);
  }

  render() {
    return <div style={{ display: 'none' }}/>;
  }
}
