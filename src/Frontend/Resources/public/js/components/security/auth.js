import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.security.auth !== null,
    authenticatingSelector: state => state.security.fetching,
    wrapperDisplayName: 'UserIsAuthenticated'
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    redirectPath: '/login'
});

export const userIsAdminRedir = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.security.auth !== null && state.security.auth,
    predicate: user => userIsAdmin(user),
    wrapperDisplayName: 'UserIsAdmin'
});

export const isGrantedUser = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.security.auth !== null && state.security.auth,
    predicate: user => userIsGranted(user,'USER'),
    wrapperDisplayName: 'IsGrantedUser'
});


const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => state.security.auth === null && state.security.fetching === false,
    wrapperDisplayName: 'UserIsNotAuthenticated'
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    redirectPath: (state, ownProps) => '/',
    allowRedirectBack: false
});


export function userIsAdmin(user){
    return userIsGranted(user,'ADMIN');
}

export function userIsGranted(user,role){
    console.log(user);
    return user.roles.includes(role);
}
