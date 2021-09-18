import request from '@/utils/request';

export const register = (data: any) =>
    request({
        url: '/api/auth/register',
        method: 'POST',
        data,
    })

export const login = (data: any) =>
    request({
        url: '/api/auth/login',
        method: 'POST',
        data,
    })

export const logout = () => 
    request({
        url: '/api/auth/logout',
        method: 'GET',
    })





