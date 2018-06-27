import {connect} from 'react-redux';
import AdvertisingContentView from '../Views/AdvertisingContentView';

export default connect(
    (state) => {
        return {actionType: state.AdvertisingContentReducer.actionType};
    }
)(AdvertisingContentView);
