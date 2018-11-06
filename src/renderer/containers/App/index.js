import { connect } from 'react-redux';
import { updateIconBadge } from './actions';
import App from '../../components/App';


const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(updateIconBadge()),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(App);
