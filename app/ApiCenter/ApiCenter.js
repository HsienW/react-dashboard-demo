import is from 'is_js';

const LeftMenuData = [
    {
        name: 'Dealer Management',
        type: 'dealer',
        icon: 'profile',
        key: 'sub1',
        subitem: [{title: 'Dealer List1', id: 1}, {title: 'Dealer List2', id: 2}, {title: 'Dealer List3', id: 3}]
    },
    {
        name: 'User Management',
        type: 'user',
        icon: 'user',
        key: 'sub2',
        subitem: [{title: 'User List1', id: 1}, {title: 'User List2', id: 2}, {title: 'User List3', id: 3}]
    },
    {
        name: 'Machine Management',
        type: 'machine',
        icon: 'environment-o',
        key: 'sub3',
        subitem: [{title: 'Machine List1', id: 1}, {title: 'Machine List2', id: 2}, {title: 'Machine List3', id: 3}]
    },
    {
        name: 'Merchandise Management',
        type: 'merchandise',
        icon: 'solution',
        key: 'sub4',
        subitem: [{title: 'Merchandise List1', id: 1}, {title: 'Merchandise List2', id: 2}, {title: 'Merchandise List3', id: 3}]
    },
    {
        name: 'Advertising Management',
        type: 'advertising',
        icon: 'message',
        key: 'sub5',
        subitem: [{title: 'Advertising List1', id: 1}, {title: 'Advertising List2', id: 2}, {title: 'Advertising List3', id: 3}]
    },
    {
        name: 'Market Analysis',
        type: 'market',
        icon: 'area-chart',
        key: 'sub6',
        subitem: [{title: 'AD Analysis1', id: 1}, {title: 'AD Analysis2', id: 2}, {title: 'AD Analysis3', id: 3}]
    },
    {
        name: 'System Setting',
        type: 'system',
        icon: 'setting',
        key: 'sub7',
        subitem: [{title: 'Setting List1', id: 1}, {title: 'Setting List2', id: 2}, {title: 'Setting List3', id: 3}]
    },
];

const MachineData = [
    {
        id: 1,
        model: 'AK1',
        status: 0,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
    {
        id: 2,
        model: 'AK2',
        status: 1,
        temperature: '33℃',
        address: '台北市大安區和平東路一段162號',
        region: '大安區',
        disable: false,
    },
    {
        id: 3,
        model: 'AK1',
        status: 2,
        temperature: '33℃',
        address: '台北市大安區忠孝東路四段221號',
        region: '大安區',
        disable: false,
    },
    {
        id: 4,
        model: 'AK1',
        status: 0,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
    {
        id: 5,
        model: 'AK1',
        status: 1,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
    {
        id: 6,
        model: 'AK1',
        status: 2,
        temperature: '33℃',
        address: '台北市大安區和平東路一段162號',
        region: '大安區',
        disable: false,
    },
    {
        id: 7,
        model: 'AK1',
        status: 0,
        temperature: '33℃',
        address: '台北市大安區忠孝東路四段221號',
        region: '大安區',
        disable: false,
    },
    {
        id: 8,
        model: 'AK1',
        status: 1,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
    {
        id: 9,
        model: 'AK1',
        status: 2,
        temperature: '33℃',
        address: '台北市大安區和平東路一段162號',
        region: '大安區',
        disable: false,
    },
    {
        id: 10,
        model: 'AK1',
        status: 0,
        temperature: '33℃',
        address: '台北市大安區忠孝東路四段221號',
        region: '大安區',
        disable: false,
    },
    {
        id: 11,
        model: 'AK1',
        status: 2,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
    {
        id: 12,
        model: 'AK1',
        status: 2,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
    {
        id: 13,
        model: 'AK1',
        status: 2,
        temperature: '33℃',
        address: '台北市大安區新生南路一段103-4號',
        region: '大安區',
        disable: false,
    },
];

const getDataApi = (requestName) => {
    switch (requestName) {
        case 'LeftMenu':
            return LeftMenuData;

        case 'MachineContent':
            return MachineData;

        default:
            return;
    }
};

const addMachineDataApi = (request) => {
    MachineData.unshift(request);
    return MachineData;
};

const deleteMachineDataApi = (request) => {
    const deleteIndex = MachineData.findIndex((item) => {return is.equal(item.id, request);});
    MachineData.splice(deleteIndex, 1);
    return MachineData;
};

const editMachineItemApi = (request) => {
    MachineData.map((item) => {
        if(is.equal(item.id, request.id)) {
            item.region = request.region;
            item.address = request.address;
        }
    });
};

export default class ApiCenter {
    static getLeftMenu(requestName) {
        return Promise.resolve(getDataApi(requestName));
    }

    static getMachineContent(requestName) {
        return Promise.resolve(getDataApi(requestName));
    }

    static addMachineItem(request) {
        return Promise.resolve(addMachineDataApi(request));
    }

    static deleteMachineItem(request) {
        return Promise.resolve(deleteMachineDataApi(request));
    }

    static editMachineItem(request) {
        return Promise.resolve(editMachineItemApi(request));
    }
}
