import request from '@/utils/request';

export const getCommentsByPostId = (postId: number) => 
    request({
        url: `/api/comment/${postId}`,
        method: 'GET',
    })

export const postCommentByPostId = (postId: number,data: any) => 
    request({
        url: `/api/comment/${postId}`,
        method: 'POST',
        data
    })

export const deleteCommentByPassword = (commentId: number,data?: any) => 
    request({
        url: `/api/comment/user/${commentId}`,
        method: 'DELETE',
        data
    })

export const deleteCommentByAdmin = (commentId: number) => 
    request({
        url: `/api/comment/admin/${commentId}`,
        method: 'DELETE',
    })
