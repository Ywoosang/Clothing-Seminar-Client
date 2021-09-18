import request from '@/utils/request';

export const getUserInfo  = () =>
    request({
        url: '/api/user',
        method: 'GET'
    })  
 