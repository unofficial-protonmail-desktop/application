import { connect } from 'react-redux';

import history from '../history';
import { ADD_ACCOUNT } from './App/types';
import AddAccount from '../components/AddAccount';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onSubmit: account => {
    dispatch({
      type: ADD_ACCOUNT,
      account,
    });

    history.push('mailbox/'.concat(account.username));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAccount);
