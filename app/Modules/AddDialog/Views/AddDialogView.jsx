import React from 'react';
import PropTypes from 'prop-types';
import AddForm from './AddForm';
import Modal from 'antd/lib/modal';
import * as AddDialogActions from '../Actions/AddDialogActions';
import './assets/AddDialogView.scss';

export default class AddDialogView extends React.Component {
    constructor() {
        super();
        this.state = {
            showDialog: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case AddDialogActions.SHOW_ADD_DIALOG:
            case AddDialogActions.HIDE_ADD_DIALOG:
                this.showDialog();
                break;

            case AddDialogActions.ADD_ITEM_SUCCESS:
                this.hideDialog();
                this.props.AddDialogActionsCreator.updateDialog();
                break;

            case AddDialogActions.UPDATE_DIALOG:
                break;

            default:
                break;
        }
    }

    showDialog = () => {
        this.setState({showDialog: !this.state.showDialog});
        this.props.AddDialogActionsCreator.updateDialog();
    };

    hideDialog = () => {
        this.setState({showDialog: false});
    };

    render() {
        return (
            <div>
                <Modal
                    title="Add Machine"
                    visible={this.state.showDialog}
                    onCancel={this.hideDialog}
                    className="add-dialog"
                >
                    <AddForm
                        dialogState={this.state.showDialog}
                        AddDialogActionsCreator={this.props.AddDialogActionsCreator}
                    />
                </Modal>
            </div>
        );
    }
}

AddDialogView.propTypes = {
    actionType: PropTypes.string.isRequired,
    AddDialogActionsCreator: PropTypes.object.isRequired,
};
