import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import webviewHandler from '../../lib/webview-handler';
import history from '../../history';
import { updateIconBadge } from './actions';

import AddAccount from '../AddAccount';
import Wrapper from '../../components/Wrapper';
import Sidebar from '../Sidebar';
import Settings from '../Settings';
import MailBox from '../MailBox';

class App extends React.Component {
  static propTypes = {
    onMount: PropTypes.func.isRequired,
  };

  state = {
    webviewReady: false,
  };

  componentDidMount() {
    this.props.onMount();
  }

  setWebviewContainerElem(elem) {
    if (webviewHandler.container) return;
    webviewHandler.attachTo(elem);

    this.setState({
      webviewReady: true,
    });
  }

  render() {
    return (
      <Router history={history}>
        <Wrapper>
          <Sidebar />

          <Route path="/settings" component={Settings} />
          <Route path="/add-account" component={AddAccount} />
          <Route
            path="/mailbox/:username"
            render={props => this.state.webviewReady && <MailBox
              webviewHandler={webviewHandler}
              {...props.match.params}
            />}
          />
          <div ref={this.setWebviewContainerElem.bind(this)} />
        </Wrapper>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(updateIconBadge()),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(App);
