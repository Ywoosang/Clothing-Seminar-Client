import request from '@/utils/request';

export const uploadPost = (formData: any) => 
    request({
        url: `/api/post/`,
        method: 'POST',
        data: formData,
    });

export const uploadPostImage = (formData: any) => 
    request({
        url: `/api/post/image`,
        method: 'POST',
        data: formData
    })

export const uploadPostPdf = (formData: any) => 
    request({
        url: `/api/post/pdf`,
        method: 'POST',
        data: formData
    })

