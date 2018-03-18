import { connect } from 'react-redux';
import { ADD_ACCOUNT } from './App/types';
import Sidebar from '../components/Sidebar';

const mapStateToProps = state => {
  return {
    accounts: Object.values(state.accounts),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddAccount: account => dispatch({
      type: ADD_ACCOUNT,
      account,
    }),
    onSelectAccount: () => null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
