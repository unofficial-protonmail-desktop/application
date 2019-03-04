import { connect } from 'react-redux';
import { REMOVE_ACCOUNT } from './App/types';
import Sidebar from '../components/Sidebar';

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    isHidden: state.settings.hideSidebar
  };
};

const mapDispatchToProps = dispatch => ({
  onRemoveAccount: username => dispatch({
    type: REMOVE_ACCOUNT,
    username,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
