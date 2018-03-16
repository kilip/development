import _ from 'lodash';

const routes = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/baptisans': 'Buku Baptis',
    '/baptisans/*/edit': 'Edit',
    '/baptisans/create': 'Data Baru',
};

const merged = _.merge(routes,{});

export default merged;
