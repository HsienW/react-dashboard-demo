import React from 'react';
import PropTypes from 'prop-types';
import {Modal, List} from 'antd';
import * as DetailDialogActions from '../Actions/DetailDialogActions';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';
import './assets/DetailDialogView.css';

export default class DetailDialogView extends React.Component {
    constructor() {
        super();
        this.state = {
            showDialog: false
        };
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case DetailDialogActions.SHOW_DETAIL_DIALOG:
            case DetailDialogActions.HIDE_DETAIL_DIALOG:
                this.showDialog();
                break;

            default:
                break;
        }
    }

    showDialog = () => {
        this.setState({showDialog: !this.state.showDialog});
        this.props.DetailDialogActionsCreator.updateDialog();
    };

    handleOk = () => {
        this.setState({showDialog: false});
    };

    handleCancel = () => {
        this.setState({showDialog: false});
    };

    handleDetailInfo(target) {
        const detailTarget = MachineContentRespond.machineDataItems.find((item) => {
            switch (item.status) {
                case 0:
                    item.state = 'Online';
                    break;
                case 1:
                    item.state = 'Offline';
                    break;
                case 2:
                    item.state = 'Error';
                    break;
                default:
                    break;
            }
            return item.id === target;
        });
        return (
            <List
                itemLayout="horizontal"
                dataSource={[detailTarget]}
                renderItem={item => (
                    <div>
                        <List.Item>
                            <List.Item.Meta
                                title={`Device ID:  ${item.id}`}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={`Model: ${item.model}`}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={`Status: ${item.state}`}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={`Machine Temp: ${item.temperature}`}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={`Region: ${item.region}`}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={`Address: ${item.address}`}
                            />
                        </List.Item>
                    </div>
                )}
            />
        );
    }

    render() {
        return (
            <div>
                <Modal
                    title="Detail"
                    visible={this.state.showDialog}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="detail-dialog"
                >
                    {this.handleDetailInfo(this.props.detailItemId)}
                </Modal>
            </div>
        );
    }
}

DetailDialogView.defaultProps = {
    detailItemId: 0
};

DetailDialogView.propTypes = {
    actionType: PropTypes.string.isRequired,
    detailItemId: PropTypes.number.isRequired,
    DetailDialogActionsCreator: PropTypes.object.isRequired,
};
