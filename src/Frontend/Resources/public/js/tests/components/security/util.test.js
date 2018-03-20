import { decodeToken, checkToken } from '../../../components/security/util';
import jwt from 'jsonwebtoken';

describe('security utility', () => {
    it('decodeToken should return decoded token', () => {
        const iat = Math.floor(Date.now() / 1000);
        const token = jwt.sign({
            username: 'admin',
            iat: iat
        },'secret');
        expect(decodeToken(null)).toBeNull();
        expect(decodeToken(undefined)).toBeNull();
        expect(decodeToken(token)).toEqual({
            username: 'admin',
            iat: iat
        });
    });


    it('checkToken should check token from local storage', () => {
        const iat = Math.floor(Date.now() / 1000);
        const exp = Math.floor(Date.now() / 1000)+1;
        const token = jwt.sign({
            username: 'admin',
            iat: iat,
            exp: exp
        },'secret');
        expect(checkToken()).toEqual(null);

        localStorage.setItem('token',token);
        expect(checkToken()).toEqual({
            exp: exp,
            iat: iat,
            username: 'admin',
        });
    });

    it('checkToken should expire token', () => {

        const iat = Math.floor(Date.now() / 1000)-30;
        const exp = Math.floor(Date.now() / 1000)-30;
        const token = jwt.sign({
            username: 'admin',
            iat: iat,
            exp: exp
        },'test');
        localStorage.setItem('token',token);
        expect(checkToken()).toEqual(null);
        expect(localStorage.getItem('token')).toBeNull();
    });


});