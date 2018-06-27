import {connect} from 'react-redux';
import MarketContentView from '../Views/MarketContentView';

export default connect(
    (state) => {
        return {actionType: state.MarketContentReducer.actionType};
    },
)(MarketContentView);
