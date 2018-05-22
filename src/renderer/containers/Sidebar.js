import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const mapStateToProps = state => {
  return {
    accounts: Object.values(state.accounts),
  };
};

export default withRouter(connect(
  mapStateToProps,
)(Sidebar));
