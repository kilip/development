import jwt_decode from 'jwt-decode';

export function decodeToken(token){
    if (token){
        return jwt_decode(token);
    }
    return null;
}

export function checkToken() {
    let data = null

    let token = localStorage.getItem('token');
    if (token) {
        const decoded = decodeToken(token);
        if (decoded.exp < Date.now() / 1000) {
            data = null;
            localStorage.clear();
            token = null;
        } else {
            data = decoded;
        }
    }
    return data;
}