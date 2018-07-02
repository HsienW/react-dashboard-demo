import React from 'react';
import PropTypes from 'prop-types';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import MachineContentModel from './MachineContentModel';
import MachineContentShow from './MachineContentShow';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import './assets/MachineContentView.scss';

export default class MachineContentView extends React.Component {
    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.UPDATE_PORTAL:
                break;

            default:
                break;
        }
    }

    getMachineContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'Machine List1':
                return (<MachineContentShow showContentName={'Machine List1'}/>);

            case 'Machine List2':
                return (<MachineContentShow showContentName={'Machine List2'}/>);

            case 'Machine List3':
                return (
                    <MachineContentModel
                        actionType={this.props.actionType}
                        AddDialogActionsCreator={this.props.AddDialogActionsCreator}
                        DetailDialogActionsCreator={this.props.DetailDialogActionsCreator}
                        DeleteDialogActionsCreator={this.props.DeleteDialogActionsCreator}
                        MachineContentActionsCreator={this.props.MachineContentActionsCreator}
                    />
                );

            default:
                break;
        }
    };

    render() {
        return (
            <div className="machine-content">
                {this.getMachineContentModel()}
            </div>
        );
    }
}

MachineContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
    AddDialogActionsCreator: PropTypes.object.isRequired,
    DetailDialogActionsCreator: PropTypes.object.isRequired,
    DeleteDialogActionsCreator: PropTypes.object.isRequired,
    MachineContentActionsCreator: PropTypes.object.isRequired,
};
