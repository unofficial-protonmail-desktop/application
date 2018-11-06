import { connect } from 'react-redux';
import { updateIconBadge } from './actions';
import App from '../../components/App';

const mapStateToProps = ({ accounts }) => ({
  firstAccount: Object.values(accounts)[0]
});

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(updateIconBadge()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
