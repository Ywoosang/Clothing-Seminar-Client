import { RootState, UserInfo, AuthResponse } from '../types/type';
import request from '@/utils/request';

export const getUserInfo  = () =>
    request({
        url: '/api/user',
        method: 'GET',
    })  
 