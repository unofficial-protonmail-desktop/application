import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Router, Route, withRouter } from 'react-router-dom';
import webviewHandler from '../../lib/webview-handler';
import history from '../../history';
import AddAccount from '../../containers/AddAccount';
import Wrapper from '../Wrapper';
import Sidebar from '../../containers/Sidebar';
import Settings from '../../containers/Settings';
import MailBox from '../../containers/MailBox';

const RoutedSidebar = withRouter(Sidebar);

export default class App extends React.Component {
  static propTypes = {
    firstAccount: PropTypes.shape({
      username: PropTypes.string.isRequired
    }),
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
          <RoutedSidebar />

          <Switch>
            {!this.props.firstAccount && (<Redirect exact from="/" to="/add-account" />)}
            {this.props.firstAccount && (<Redirect exact from="/" to={`/mailbox/${this.props.firstAccount.username}`} />)}
            <Route path="/settings" component={Settings} />
            <Route path="/add-account" component={AddAccount} />
            <Route
              path="/mailbox/:username"
              render={props => this.state.webviewReady && <MailBox
                webviewHandler={webviewHandler}
                {...props.match.params}
              />}
            />
          </Switch>
          <div ref={this.setWebviewContainerElem.bind(this)} />
        </Wrapper>
      </Router>
    );
  }
}
