import React from 'react';
import PropTypes from 'prop-types';

export default class MachineContentShow extends React.Component {
    render() {
        return (
            <div className="show-content-text">
                {this.props.showContentName}
            </div>
        );
    }
}

MachineContentShow.propTypes = {
    showContentName: PropTypes.string.isRequired
};
