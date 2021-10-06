import request from '@/utils/request';

export const getPostById = (postId: number) => 
    request({
        url: `/api/post/${postId}`,
        method: 'GET',
    })

export const deletePostById = (postId: number) =>  
    request({
        url: `/api/post/${postId}`,
        method: 'DELETE',
    })


export const getTotalPageNumber = (category: string) => 
    request({
        url: `/api/category/${category}/count`,
        method: 'GET',
    })

export const getPostsByPageNumber = (page: string,category: string) => 
    request({
        url: `/api/category/${category}/${page}`,
        method: 'GET',
    })
