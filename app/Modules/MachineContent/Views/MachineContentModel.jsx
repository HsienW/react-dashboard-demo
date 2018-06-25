import React from 'react';
import is from 'is_js';
import PropTypes from 'prop-types';
import {Input, Button, Popover, Table, Icon, Tag, Select} from 'antd';
import JwPagination from 'jw-react-pagination';
import AddDialogContainer from '../../AddDialog/Containers/AddDialogContainer';
import DetailDialogContainer from '../../DetailDialog/Containers/DetailDialogContainer';
import DeleteDialogContainer from '../../DeleteDialog/Containers/DeleteDialogContainer';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as MachineContentActions from '../Actions/MachineContentActions';
import * as AddDialogActions from '../../AddDialog/Actions/AddDialogActions';
import * as DeleteDialogActions from '../../DeleteDialog/Actions/DeleteDialogActions';
// import * as PortalActions from '../../Portal/Actions/PortalActions';
import './assets/MachineContentView.css';

const Search = Input.Search;
const Option = Select.Option;
const customLabels = {
    first: '|<',
    last: '>|',
    previous: '<',
    next: '>'
};

export default class MachineContentModel extends React.Component {
    constructor() {
        super();
        this.state = {
            machineDataItems: [],
            currentShowData: [],
            collapse: false,
            showAdvancedSearch: false,
            isItemEdit: false,
            isEditItemId: 0,
            isDetailItemId: 0,
            isDeleteItemId: 0,
            currentMenuPage: 'Machine List3',
            columns: [
                {
                    title: 'Device ID',
                    dataIndex: 'id',
                    key: 'id',
                    render: (record, index) => {
                        switch (index.status) {
                            case 0:
                                return (
                                    <div>
                                        <div className='device-id-online'/>
                                        <span>{index.id}</span>
                                    </div>
                                );

                            case 1:
                                return (
                                    <div>
                                        <div className='device-id-offline'/>
                                        <span>{index.id}</span>
                                    </div>
                                );

                            case 2:
                                return (
                                    <div>
                                        <div className='device-id-error'/>
                                        <span>{index.id}</span>
                                    </div>
                                );

                            default:
                                return <span>{index.id}</span>;
                        }
                    }
                },
                {
                    title: 'Model',
                    dataIndex: 'model',
                    key: 'model',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (record, index) => {
                        switch (index.status) {
                            case 0:
                                return (<Tag color="#3ABA77">Online</Tag>);

                            case 1:
                                return (<Tag color="#727171">Offline</Tag>);

                            case 2:
                                return (<Tag color="#FF6B6B">Error</Tag>);

                            default:
                                break;
                        }
                    }
                },
                {
                    title: 'Machine Temp',
                    dataIndex: 'temperature',
                    key: 'temperature',
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                    render: (record, index) => {
                        if (this.state.isItemEdit && is.equal(index.id, this.state.isEditItemId)) {
                            return <Input id={index.id} className="edit-address-input"/>;
                        }
                        return <span>{index.address}</span>;
                    }
                },
                {
                    title: 'Region',
                    dataIndex: 'region',
                    key: 'region',
                    render: (record, index) => {
                        if (this.state.isItemEdit && is.equal(index.id, this.state.isEditItemId)) {
                            return <Input id={index.id} className="edit-region-input"/>;
                        }
                        return <span>{index.region}</span>;
                    }
                },
                {
                    title: 'Details',
                    dataIndex: 'details',
                    key: 'details',
                    render: (record, index) => {
                        if (this.state.isEditItemId && is.equal(index.id, this.state.isEditItemId)) {
                            return <div/>;
                        }
                        return <div className="table-item-edit-detail">
                            <Icon
                                className="edit-btn" id={index.id} type="calendar"
                                onClick={this.itemEditClick.bind(this, index, 'detail')}/>
                        </div>;
                    }
                }, {
                    title: 'Setup',
                    dataIndex: 'setup',
                    key: 'setup',
                    render: (record, index) => {
                        if (this.state.isEditItemId && is.equal(index.id, this.state.isEditItemId)) {
                            return <div className="table-item-edit-setup">
                                <Icon style={{width: '31px', height: '31px'}}/>
                                <Icon
                                    className="edit-btn" type="close"
                                    onClick={this.confirmEditClick.bind(this, index, 'cancel')}/>
                                <Icon
                                    className="edit-btn" type="check"
                                    onClick={this.confirmEditClick.bind(this, index, 'confirm')}/>
                            </div>;
                        }
                        return <div className="table-item-edit-setup">
                            <Icon
                                className="edit-btn" id={index.id} type="edit"
                                onClick={this.itemEditClick.bind(this, index, 'edit')}/>
                            <Icon
                                className="edit-btn" id={index.id} type="delete"
                                onClick={this.itemEditClick.bind(this, index, 'delete')}/>
                            <Icon style={{width: '31px', height: '31px'}}/>
                        </div>;
                    }
                }
            ]
        };
    }

    componentWillMount() {
        this.props.MachineContentActionsCreator.getMachineData('MachineContent');
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case MachineContentActions.GET_MACHINE_DATA_SUCCESS:
            case MachineContentActions.EDIT_DATA_ITEM_SUCCESS:
            case DeleteDialogActions.DELETE_ITEM:
                this.setState({machineDataItems: MachineContentRespond.machineDataItems});
                break;

            case AddDialogActions.ADD_ITEM_SUCCESS:
                this.setState({
                    machineDataItems: MachineContentRespond.machineDataItems,
                    columns: this.state.columns
                });
                break;

            // case PortalActions.GO_TO_PAGE:
            //     this.setState({currentMenuPage: WebStorage.getSessionStorage(WebStorageKeys.CURRENT_MENU_PAGE)});
            //     break;

            default:
                break;
        }
    }

    componentDidMount() {
        document.querySelector('.add-machine-btn').addEventListener('click', this.addMachine);
        document.querySelector('.advanced-search-btn').addEventListener('click', this.showAdvancedSearch);
    }

    handleSearch = (value) => {
        const searchKey = value.toUpperCase();
        if (is.empty(value) || is.falsy(value)) {
            this.setState({machineDataItems: MachineContentRespond.machineDataItems});
            return;
        }
        let searchData = MachineContentRespond.machineDataItems.filter((itemObj) => {
            return is.include(itemObj.address, searchKey) || is.include(itemObj.model, searchKey);
        });
        this.setState({machineDataItems: searchData});
    };

    advancedSearch = () => {
        let searchKey = document.querySelector('.advanced-search-input').value;
        let temporarilyData = JSON.parse(WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SEARCH_DATA));

        if (is.empty(searchKey)) {
            this.setState({machineDataItems: MachineContentRespond.machineDataItems});
            return;
        }
        if (is.empty(temporarilyData) || is.falsy(temporarilyData)) {
            let currentData = MachineContentRespond.machineDataItems.filter((itemObj) => {
                return is.include(itemObj.address, searchKey) || is.include(itemObj.model, searchKey);
            });
            this.setState({machineDataItems: currentData});
            return;
        }

        let currentData = temporarilyData.filter((itemObj) => {
            return is.include(itemObj.address, searchKey) || is.include(itemObj.model, searchKey);
        });
        this.setState({machineDataItems: currentData});
    };

    advancedSearchStatus = (value) => {
        if (parseInt(value) === 4) {
            WebStorage.setSessionStorage(
                WebStorageKeys.CURRENT_SEARCH_DATA, JSON.stringify(MachineContentRespond.machineDataItems)
            );
            return;
        }
        const searchTemporaryData = MachineContentRespond.machineDataItems.filter((itemObj) => {
            return is.equal(itemObj.status, parseInt(value));
        });
        WebStorage.setSessionStorage(WebStorageKeys.CURRENT_SEARCH_DATA, JSON.stringify(searchTemporaryData));
    };

    itemEditClick = (target, editType) => {
        if (this.state.isItemEdit) {
            return;
        }
        switch (editType) {
            case 'detail':
                this.setState({isDetailItemId: target.id});
                this.props.DetailDialogActionsCreator.showDetailDialog();
                break;

            case 'edit':
                this.setState({
                    isEditItemId: target.id,
                    isItemEdit: true
                });
                this.itemDisable(target.id);
                break;

            case 'delete':
                this.setState({isDeleteItemId: target.id});
                this.props.DeleteDialogActionsCreator.showDeleteDialog();
                break;

            default:
                break;
        }
    };

    confirmEditClick = (target, confirmType) => {
        const regionInput = document.querySelector('.edit-region-input');
        const addressInput = document.querySelector('.edit-address-input');
        const updateObj = {
            id: parseInt(regionInput.id),
            region: regionInput.value,
            address: addressInput.value
        };

        switch (confirmType) {
            case 'confirm':
                this.props.MachineContentActionsCreator.doEditDataItem(updateObj);
                this.setState({
                    isEditItemId: 0,
                    isItemEdit: false
                });
                this.itemEnable();
                break;

            case 'cancel':
                this.setState({
                    isEditItemId: 0,
                    isItemEdit: false
                });
                this.itemEnable();
                break;

            default:
                break;
        }
    };

    itemDisable = (editItemId) => {
        const editBtns = Array.from(document.querySelectorAll('.edit-btn'));
        editBtns.forEach((item) => {
            if (is.not.equal(parseInt(item.id), editItemId)) {
                item.style.opacity = 0.4;
                item.style.cursor = 'not-allowed';
            }
        });
    };

    itemEnable = () => {
        const editBtns = Array.from(document.querySelectorAll('.edit-btn'));
        editBtns.forEach((item) => {
            item.style.opacity = 1;
            item.style.cursor = 'pointer';
        });
    };

    addMachine = () => {
        this.props.AddDialogActionsCreator.showAddDialog();
    };

    showAdvancedSearch = () => {
        this.setState({showAdvancedSearch: true});
    };

    hideAdvancedSearch = () => {
        this.setState({showAdvancedSearch: false});
    };

    onChangePage = (showData) => {
        this.setState({currentShowData: showData});
    };

    render() {
        return (
            <div>
                <div className="content-toolbar">
                    <div className="content-title">{this.state.currentMenuPage}</div>
                    <div className="content-tools">
                        <div className="content-search">
                            <Search
                                placeholder="keyword"
                                enterButton="Search"
                                size="large"
                                onSearch={value => this.handleSearch(value)}
                            />
                        </div>
                        <div className="content-tool-item">
                            <Popover
                                placement="leftTop"
                                trigger="click"
                                visible={this.state.showAdvancedSearch}
                                content={
                                    (
                                        <div className="advanced-search">
                                            <Input placeholder="keyword" className="advanced-search-input"/>
                                            <div className="search-type-select">
                                                <span>Packaging Type</span>
                                                <Select
                                                    defaultValue="All" style={{width: 460}}
                                                    onChange={this.advancedSearchStatus}
                                                >
                                                    <Option value="4">All</Option>
                                                    <Option value="0">Online</Option>
                                                    <Option value="1">Offline</Option>
                                                    <Option value="2">Error</Option>
                                                </Select>
                                            </div>
                                            <div>
                                                <Button size={'large'} onClick={this.hideAdvancedSearch}>Close</Button>
                                                <Button size={'large'} onClick={this.advancedSearch}>Search</Button>
                                            </div>
                                        </div>
                                    )
                                }>
                                <div className="advanced-search-btn">
                                    <Button shape="circle" icon="search" size={'large'}/>
                                    <span className="btn-title">Advanced Search</span>
                                </div>
                            </Popover>
                            <div className="add-machine-btn">
                                <Button shape="circle" icon="plus" size={'large'}/>
                                <span className="btn-title">Add Machine</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-table">
                    <Table
                        pageSizeOptions={['10']}
                        rowKey="id"
                        columns={this.state.columns}
                        dataSource={this.state.currentShowData}
                    />
                    <div className="table-pagination">
                        <JwPagination
                            items={this.state.machineDataItems}
                            onChangePage={this.onChangePage}
                            labels={customLabels}
                        />
                    </div>
                </div>
                <AddDialogContainer/>
                <DetailDialogContainer detailItemId={this.state.isDetailItemId}/>
                <DeleteDialogContainer deleteItemId={this.state.isDeleteItemId}/>
            </div>
        );
    }
}

MachineContentModel.propTypes = {
    actionType: PropTypes.string.isRequired,
    AddDialogActionsCreator: PropTypes.object.isRequired,
    DetailDialogActionsCreator: PropTypes.object.isRequired,
    DeleteDialogActionsCreator: PropTypes.object.isRequired,
    MachineContentActionsCreator: PropTypes.object.isRequired,
};