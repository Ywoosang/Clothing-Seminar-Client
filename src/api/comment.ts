import request from '@/utils/request';

export const getCommentsByPostId = (postId: number) => 
    request({
        url: `/api/comment/${postId}`,
        method: 'GET',
        withCredentials: true
    })

export const postCommentByPostId = (postId: number,data: any) => 
    request({
        url: `/api/comment/${postId}`,
        method: 'POST',
        withCredentials: true,
        data
    })

export const deleteCommentById = (commentId: number) => {
    request({
        url: `/api/comment/${commentId}`,
        method: 'DELETE',
    })
}
