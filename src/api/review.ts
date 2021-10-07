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

export const deleteReviewByPassword = (formData: any) =>
    request({
        url: `/api/review`,
        method: 'DELETE',
        data: formData
    })

export const deleteReviewByAdminRole = (formData: any) =>
    request({
        url: `/api/review/admin`,
        method: 'DELETE',
        data: formData
    })

