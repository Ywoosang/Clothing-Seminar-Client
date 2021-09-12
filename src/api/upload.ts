import request from '@/utils/request';

export const uploadPost = (formData: any) => 
    request({
        url: `/api/post/`,
        method: 'POST',
        data: formData,
        headers: { 
            "Content-Type": "multipart/form-data",
        },  
        withCredentials: true
    });

