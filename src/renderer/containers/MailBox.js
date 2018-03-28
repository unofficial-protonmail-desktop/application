import { connect } from 'react-redux';

import {
  DISPLAY_WEBVIEW,
  HIDE_WEBVIEWS,
  RELOAD_WEBVIEW,
} from '../middlewares/Webviews/types';
import MailBox from '../components/MailBox';

const mapStateToProps = (state, ownProps) => ({
  error: (state.webviewStatuses[ownProps.username] || {}).error,
});

const mapDispatchToProps = dispatch => ({
  displayWebview: name => dispatch({
    type: DISPLAY_WEBVIEW,
    name,
  }),
  hideWebviews: () => dispatch({
    type: HIDE_WEBVIEWS,
  }),
  onReload: name => dispatch({
    type: RELOAD_WEBVIEW,
    name,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailBox);
