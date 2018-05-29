import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { REMOVE_ACCOUNT } from './App/types';
import Sidebar from '../components/Sidebar';

const mapStateToProps = state => {
  return {
    accounts: Object.values(state.accounts),
  };
};

const mapDispatchToProps = dispatch => ({
  onRemoveAccount: username => dispatch({
    type: REMOVE_ACCOUNT,
    username,
  }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar));
