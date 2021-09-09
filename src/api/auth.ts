import request from '@/utils/request';

export const register = (data: any) =>
    request({
        url: '/api/register',
        method: 'POST',
        data,
    })

export const login = (data: any) =>
    request({
        url: '/api/login',
        method: 'POST',
        data,
    })

export const logout = () => 
    request({
        url: '/api/logout',
        method: 'GET',
    })





