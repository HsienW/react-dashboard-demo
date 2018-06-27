import React from 'react';
import PropTypes from 'prop-types';

export default class DealerContentShow extends React.Component {
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

DealerContentShow.propTypes = {
    showContentName: PropTypes.string.isRequired
};
