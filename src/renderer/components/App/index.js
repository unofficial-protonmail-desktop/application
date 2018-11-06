import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import webviewHandler from '../../lib/webview-handler';
import history from '../../history';
import AddAccount from '../../containers/AddAccount';
import Wrapper from '../Wrapper';
import Sidebar from '../../containers/Sidebar';
import Settings from '../../containers/Settings';
import MailBox from '../../containers/MailBox';

export default class App extends React.Component {
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

          <Route path="/" component={Welcome} exact />
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
