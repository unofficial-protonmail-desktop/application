import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default class MailBox extends React.Component {
  static propTypes = {
    darkTheme: PropTypes.bool.isRequired,
    displayWebview: PropTypes.func.isRequired,
    error: PropTypes.object,
    hideWebviews: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
    useProtonMailBeta: PropTypes.bool.isRequired,
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
    this.handleDisplayWebview();
  }

  componentDidUpdate(prevProps) {
    if (this.props.error) {
      this.props.hideWebviews();
    } else {
      if (this.props.username !== prevProps.username) {
        this.handleDisplayWebview();
      }

      if (prevProps.error !== this.props.error) {
        this.handleDisplayWebview();
      }
    }
  }

  componentWillUnmount() {
    this.props.hideWebviews();

    /**
     * TODO: Clear error upon unmount
     */
  }

  handleDisplayWebview() {
    this.props.displayWebview({
      darkTheme: this.props.darkTheme,
      useBeta: this.props.useProtonMailBeta,
    });
  }

  handleReload() {
    this.props.onReload(this.props.username);
  }

  render() {
    if (this.props.error) {
      return (
        <div className={styles.ErrorView}>
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
