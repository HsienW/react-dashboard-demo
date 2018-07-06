import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import * as DeleteDialogActions from '../Actions/DeleteDialogActions';
import './assets/DeleteDialogView.scss';

export default class DeleteDialogView extends React.Component {
    constructor() {
        super();
        this.state = {
            showDialog: false
        };
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case DeleteDialogActions.SHOW_DELETE_DIALOG:
            case DeleteDialogActions.HIDE_DELETE_DIALOG:
                this.showDialog();
                break;
            case DeleteDialogActions.DELETE_ITEM_SUCCESS:
                this.props.DeleteDialogActionsCreator.updateDialog();
                break;

            default:
                break;
        }
    }

    showDialog = () => {
        this.setState({showDialog: !this.state.showDialog});
        this.props.DeleteDialogActionsCreator.updateDialog();
    };

    handleOk = () => {
        this.props.DeleteDialogActionsCreator.doDeleteItem(this.props.deleteItemId);
        this.setState({showDialog: false});
    };

    handleCancel = () => {
        this.setState({showDialog: false});
    };

    render() {
        return (
            <div>
                <Modal
                    title="Delete"
                    visible={this.state.showDialog}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="delete-dialog"
                >
                    <p>Are you sure you want to delete the item with device ID {this.props.deleteItemId} ?</p>
                </Modal>
            </div>
        );
    }
}

DeleteDialogView.defaultProps = {
    deleteItemId: 0
};

DeleteDialogView.propTypes = {
    actionType: PropTypes.string.isRequired,
    deleteItemId: PropTypes.number.isRequired,
    DeleteDialogActionsCreator: PropTypes.object.isRequired,
};
