import {connect} from 'react-redux';
import MerchandiseContentView from '../Views/MerchandiseContentView';

export default connect(
    (state) => {
        return {actionType: state.MerchandiseContentReducer.actionType};
    }
)(MerchandiseContentView);
