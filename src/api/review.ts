import request from '@/utils/request';

export const getReviews = () => 
    request({
        url: `/api/review/all`,
        method: 'GET',
    });

export const postReview = (formData: any) => 
    request({
        url: `/api/review`,
        method: 'POST',
        data: formData
    })

export const deleteReview = (formData: any) => 
    request({
        url: `/api/review`,
        method: 'DELETE',
        data: formData
    })

