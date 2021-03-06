import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import List from 'antd/lib/list';
import * as DetailDialogActions from '../Actions/DetailDialogActions';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';
import './assets/DetailDialogView.scss';

export default class DetailDialogView extends React.Component {
    constructor() {
        super();
        this.state = {
            showDialog: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case DetailDialogActions.SHOW_DETAIL_DIALOG:
                this.showDialog();
                break;

            case DetailDialogActions.HIDE_DETAIL_DIALOG:
                this.hideDialog();
                break;
            default:
                break;
        }
    }

    showDialog = () => {
        this.setState({showDialog: true});
        this.props.DetailDialogActionsCreator.updateDialog();
    };

    hideDialog = () => {
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

        const outputTarget = Object.entries(detailTarget).map(([key, value]) => ({key,value}));

        return (
            <List itemLayout="horizontal">
                {
                    outputTarget.map((item) => {
                        if(item.key === 'status') {
                            return;
                        }
                        return (
                            <List.Item key={item.key}>
                                <List.Item.Meta
                                    title={`${item.key}: ${item.value}`}
                                />
                            </List.Item>
                        );
                    })
                }
            </List>
        );
    }

    render() {
        return (
            <div>
                <Modal
                    title="Detail"
                    visible={this.state.showDialog}
                    onOk={this.hideDialog}
                    onCancel={this.hideDialog}
                    className="detail-dialog"
                >
                    {this.state.showDialog ? this.handleDetailInfo(this.props.detailItemId) : null}
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
