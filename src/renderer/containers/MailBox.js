import { connect } from 'react-redux';

import MailBox from '../components/MailBox';

const mapStateToProps = state => ({
  accounts: Object.values(state.accounts),
});

export default connect(mapStateToProps)(MailBox);
