import React from 'react';
import Loadable from 'react-loadable';

const LoadingPage = () => {
    return (<div>Loading...</div>);
};

export const Machine = Loadable({
    loader: () => import('./Modules/MachineContent/Containers/MachineContentContainer'),
    loading: LoadingPage
});

export const Dealer = Loadable({
    loader: () => import('./Modules/DealerContent/Containers/DealerContentContainer'),
    loading: LoadingPage
});

export const Merchandise = Loadable({
    loader: () => import('./Modules/MerchandiseContent/Containers/MerchandiseContentContainer'),
    loading: LoadingPage
});

export const Advertising = Loadable({
    loader: () => import('./Modules/AdvertisingContent/Containers/AdvertisingContentContainer'),
    loading: LoadingPage
});

export const Market = Loadable({
    loader: () => import('./Modules/MarketContent/Containers/MarketContentContainer'),
    loading: LoadingPage
});

export const User = Loadable({
    loader: () => import('./Modules/UserContent/Containers/UserContentContainer'),
    loading: LoadingPage
});


export const System = Loadable({
    loader: () => import('./Modules/SystemContent/Containers/SystemContentContainer'),
    loading: LoadingPage
});

