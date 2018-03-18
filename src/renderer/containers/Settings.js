import { connect } from 'react-redux';
import { UPDATE_SETTINGS } from './App/types';
import Settings from '../components/Settings';

const mapStateToProps = ({ settings }) => ({
  darkTheme: settings.darkTheme,
});

const mapDispatchToProps = dispatch => ({
  onChangeSetting: (key, value) => dispatch({
    key,
    value,
    type: UPDATE_SETTINGS,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
