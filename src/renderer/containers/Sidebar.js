import { connect } from 'react-redux';
import { TOGGLE_SIDEBAR_ITEM_POSITION, REMOVE_ACCOUNT } from './App/types';
import { RELOAD_WEBVIEW } from '../middlewares/Webviews/types';
import Sidebar from '../components/Sidebar';

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    isHidden: state.settings.hideSidebar
  };
};

const mapDispatchToProps = dispatch => ({
  onChangePosition: ({ from, to }) => dispatch({
    type: TOGGLE_SIDEBAR_ITEM_POSITION,
    from,
    to
  }),
  onRemoveAccount: username => dispatch({
    type: REMOVE_ACCOUNT,
    username,
  }),
  onReloadAccount: name => dispatch({
    type: RELOAD_WEBVIEW,
    name,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
