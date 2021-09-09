<template>
  <article class="comments">
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <div class="title">
        <div>작성자: {{ comment.username }} {{ comment.created_at }}</div>
        <button
          class="delete"
          v-if="comment.userId == userId || authority == 'ADMINISTRATOR'"
          @click="deleteComment(index)"
        >
          삭제
        </button>
      </div>
      <div :class="{ content: index !== comments.length - 1 }">
        {{ comment.content }}
      </div>
    </div>
    <div class="register">
<<<<<<< HEAD
      <textarea v-model="state.comment"></textarea>
=======
      <textarea v-model="comment"></textarea>
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      <button @click="postComment">댓글<br />작성</button>
    </div>
  </article>
</template>

<script lang="ts">
import { Comment } from '../types/type';
import { onMounted, ref, toRefs, reactive } from "vue";
import { useStore } from "vuex";
import { deleteCommentById, getCommentsByPostId, postCommentByPostId } from "../api/comment";

export default {
  props: {
    postid: {
      type: Number,
      required: true
    }
  },
  setup(props: any) {
    const store = useStore();
    const { postid } = toRefs(props);
    const authority = ref<string>(store.state.authority);
    const userId = ref<string>(store.state.id);
<<<<<<< HEAD
    const isBlocked = ref<boolean>(false); 
    // 
    const state = reactive({
        comment: ''
    });
=======
    // 
    const comment = ref<string>();
     
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
    const comments = ref<Comment[]>();
    const getComments = async () => {
      try {
        await store.dispatch("setUserInfo");
        const response = await getCommentsByPostId(postid.value);
        comments.value = response.data.comments;
      } catch (error) {
        if(error)
        alert("댓글 등록에 문제가 발생했습니다.");
      }
    };
    // 댓글 등록
    const postComment = async() => {
<<<<<<< HEAD
      if (state.comment.trim() == "") {
        return alert("댓글 본문을 입력해 주세요");
      }
      if(isBlocked.value) return;
      isBlocked.value = true; 
      const data = { comment: state.comment };
      setTimeout(async()=> { 
        try{
            await postCommentByPostId(postid.value,data);
            await getComments();
            state.comment = "";
            isBlocked.value = false; 
        } catch(error){
          console.log(error); 
        }
      },500);
=======
      if (comment.value!.trim() == "") {
        return alert("댓글 본문을 입력해 주세요");
      }
      await postCommentByPostId(postid.value,{ content: comment.value });
      await getComments();
      comment.value = "";
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
    };
    // 댓글 삭제
    const deleteComment = async (index: number) => {
      const isConfirm = confirm('정말로 해당 댓글을 삭제하시겠습니까?');
      if(!isConfirm) return;
      const comment: Comment = comments.value![index];
      // 댓글 아이디 확인
      const commentId: number = comment.id;
      try{
          await deleteCommentById(commentId);
          comments.value = comments.value!.filter((el, idx) => idx !== index);
          alert('삭제되었습니다'); 
      } catch(error) {
          console.log(error); 
      }
    };
    onMounted(async() => {
      await getComments();
      await store.dispatch('setUserInfo')
    });
    return {
<<<<<<< HEAD
      state,
=======
      comment,
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      comments,
      postComment,
      deleteComment,
      authority,
      userId
    };
  }
};
</script>

<style scoped>
.comments {
  background: #dcdcdc;
  width: 80%;
  padding: 1em;
  margin: 2em 0;
}

.comment {
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
}
.comment .title {
  display: flex;
}
.comment .title .delete {
  margin-left: auto;
  background-color: #ebebeb;
}
.comment .content {
  padding-bottom: 0.5em;
  border-bottom: 2px solid #787878;
}
.comments .register {
  display: flex;
  margin: 1em 0;
}
.comments .register textarea {
  background-color: #ebebeb;
  resize: none;
  border: none;
  font-size: 1.2em;
  flex: 1;
  box-sizing: border-box;
}

.comments .register button {
  background-color: #787878;
  color: #ffffff;
  width: 5em;
  height: 5em;
  padding: 0;
  margin-left: 1em;
}
</style>