import React from 'react';
import is from 'is_js';
import PropTypes from 'prop-types';
import {Input, Button, Popover, Table, Icon, Tag, Select} from 'antd';
import AddDialogContainer from '../../AddDialog/Containers/AddDialogContainer';
import DetailDialogContainer from '../../DetailDialog/Containers/DetailDialogContainer';
import PaginationContainer from '../../Pagination/Containers/PaginationContainer';
import DeleteDialogContainer from '../../DeleteDialog/Containers/DeleteDialogContainer';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as MachineContentActions from '../Actions/MachineContentActions';
import * as AddDialogActions from '../../AddDialog/Actions/AddDialogActions';
import * as DeleteDialogActions from '../../DeleteDialog/Actions/DeleteDialogActions';
import * as PortalActions from '../../Portal/Actions/PortalActions';

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
            isAdvancedSearch: false,
            isEditItemId: 0,
            isDetailItemId: 0,
            isDeleteItemId: 0,
            defaultSelect: '4',
            currentMenuPage: 'Machine List3',
            defaultSearchValue: '',
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
                            return <Input id={index.id} className="edit-address-input" defaultValue={index.address}/>;
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
                            return <Input id={index.id} className="edit-region-input" defaultValue={index.region}/>;
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
                this.setState({machineDataItems: MachineContentRespond.machineDataItems});
                break;

            case DeleteDialogActions.DELETE_ITEM_SUCCESS:
                this.updateDateItems();
                this.props.MachineContentActionsCreator.updateMachineDate();
                break;

            case AddDialogActions.ADD_ITEM_SUCCESS:
                this.updateDateItemsAdd();
                break;

            case PortalActions.UPDATE_PORTAL:
                break;

            case AddDialogActions.UPDATE_DIALOG:
                this.setState({isUpdatePagination: false});
                break;

            default:
                break;
        }
    }

    componentDidMount() {
        document.querySelector('.add-machine-btn').addEventListener('click', this.addMachine);
        document.querySelector('.advanced-search-btn').addEventListener('click', this.showAdvancedSearch);
    }

    updateDateItems = () => {
        const startIndex = WebStorage.getSessionStorage(WebStorageKeys.PAGE_START_INDEX);
        const endIndex = WebStorage.getSessionStorage(WebStorageKeys.PAGE_END_INDEX);
        const currentData = MachineContentRespond.machineDataItems.slice(startIndex, endIndex);

        this.setState({
            machineDataItems: MachineContentRespond.machineDataItems,
            currentShowData: currentData,
        });
    };

    updateDateItemsAdd = () => {
        WebStorage.setSessionStorage(WebStorageKeys.CURRENT_PAGE, 1);
        WebStorage.setSessionStorage(WebStorageKeys.PAGE_START_INDEX, 0);
        WebStorage.setSessionStorage(WebStorageKeys.PAGE_END_INDEX, 9);
        const currentData = MachineContentRespond.machineDataItems.slice(0, 9);
        this.setState({
            machineDataItems: MachineContentRespond.machineDataItems,
            currentShowData: currentData,
        });
    };

    generalSearch = (value) => {
        const searchData = this.doFilterKey(
            value,
            parseInt(this.state.defaultSelect),
            MachineContentRespond.machineDataItems
        );
        this.setState({machineDataItems: searchData});
    };

    advancedSearch = () => {
        const searchKey = document.querySelector('.advanced-search-input').value;
        const keyFilterDone = this.doFilterKey(
            searchKey,
            parseInt(this.state.defaultSelect),
            MachineContentRespond.machineDataItems
        );
        const searchDone = this.doFilterStatus(parseInt(this.state.defaultSelect), keyFilterDone);

        this.setState({machineDataItems: searchDone});
    };

    doFilterKey = (value, searchState, data) => {
        const searchKey = value.toUpperCase();
        if (is.empty(searchKey) && is.equal(searchState, 4)
            || is.empty(searchKey) && is.nan(searchState)
            || is.empty(searchKey) && is.empty(searchState)
        ) {
            this.setSearchStatus(searchState);
            return data;
        }
        return data.filter((item) => {
            return is.include(item.address, searchKey) || is.include(item.model, searchKey);
        });
    };

    doFilterStatus = (status, data) => {
        if(status === 4 || is.nan(status)) {
            return data;
        }
        if (is.not.empty(status)) {
            return data.filter((item) => {
                return is.equal(item.status, status);
            });
        }
        return data;
    };

    setSearchStatus = (value) => {
        switch (value) {
            case '0':
                this.setState({defaultSelect:  '0'});
                break;

            case '1':
                this.setState({defaultSelect:  '1'});
                break;

            case '2':
                this.setState({defaultSelect:  '2'});
                break;

            default:
                this.setState({defaultSelect:  '4'});
                break;
        }
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
        this.setState({
            defaultSearchValue: '',
            showAdvancedSearch: false
        });
    };

    searchKeyChange = (event) => {
        const searchKey = event.target.value;
        this.setState({defaultSearchValue: searchKey});
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
                                className="content-search-input"
                                placeholder="keyword"
                                enterButton="Search"
                                size="large"
                                value={this.state.defaultSearchValue}
                                onChange={this.searchKeyChange}
                                onSearch={value => this.generalSearch(value)}
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
                                            <Input
                                                placeholder="keyword"
                                                className="advanced-search-input"
                                                onChange={this.searchKeyChange}
                                                value={this.state.defaultSearchValue}
                                            />
                                            <div className="search-type-select">
                                                <span>Packaging Type</span>
                                                <Select
                                                    value={this.state.defaultSelect}
                                                    style={{width: 430}}
                                                    onChange={this.setSearchStatus}
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
                        <PaginationContainer
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
