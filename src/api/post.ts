import request from '@/utils/request';

export const getPostById = (postId: number) => 
    request({
        url: `/api/post/${postId}`,
        method: 'GET',
        withCredentials: true
    })

export const getPostsByPageNumber = (page: string,category: string) => 
    request({
        url: `/api/post/${category}/${page}`,
        method: 'GET',
        withCredentials: true
    })

export const deletePostById = (postId: number) =>  
    request({
        url: `/api/post/${postId}`,
        method: 'DELETE',
        withCredentials: true
    })


export const getTotalPageNumber = (category: string) => 
    request({
        url: `/api/post/${category}/count`,
        method: 'GET',
        withCredentials: true
    })

