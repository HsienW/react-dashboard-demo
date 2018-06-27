import React from 'react';
import PropTypes from 'prop-types';

export default class MarketContentShow extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="show-content-text">
                {this.props.showContentName}
            </div>
        );
    }
}

MarketContentShow.propTypes = {
    showContentName: PropTypes.string.isRequired
};
