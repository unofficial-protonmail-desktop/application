import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

const mapStateToProps = state => {
  return {
    accounts: Object.values(state.accounts),
  };
};

const mapDispatchToProps = () => {
  return {
    onSelectAccount: () => null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
