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
<<<<<<< HEAD
        withCredentials: true
=======
        withCredentials: true,
        data
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
    })

export const deleteCommentById = (commentId: number) => {
    request({
        url: `/api/comment/${commentId}`,
        method: 'DELETE',
    })
}
