<template>
  <article class="comments">
 
  <div class="comment" v-for="(comment,index) in comments" :key="index">
    <div class="title">
      <div>작성자: {{comment.username}} {{  comment.created_at }}</div>
      <button
      class="delete"
      v-if="comment.userId == userId || authority=='ADMINISTRATOR'"
      @click="deleteComment(index)"
    >삭제</button>
    </div>
    <div :class="{ content : index !== comments.length -1}">{{ comment.content }}</div>
  </div>
  <div class="register">
    <textarea v-model="state.comment"></textarea>
    <button @click="postComment">댓글<br>작성</button>
  </div>
  </article>
</template>

<script lang="ts">
import { Comment } from '../types/type';
import { onMounted, ref, toRefs, reactive } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    postid: {
      type: Number,
      required: true
    }
  },
  setup(props: any) {
    const store = useStore();
    //
    const showModal = ref<boolean>(false);
    const message = ref<string>("");
    const { postid } = toRefs(props);
    const authority = ref<string>(store.state.authority);
    const userId = ref<string>(store.state.id);
    const isBlocked = ref<boolean>(false); 
    // 
    const state = reactive({
        comment: ''
    });
    const comments = ref<Comment[]>();
    const getComments = async () => {
      try {
        await store.dispatch("setUserInfo");
        let response: any = await fetch(
          `/api/comment/${postid.value}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
          }
        );
        if (response.ok) {
          response = await response.json();
          comments.value = response.comments;
        } else {
          throw new Error("댓글 등록에 문제가 발생했습니다.");
        }
      } catch (error) {
        showModal.value = true;
        message.value = error.messsage;
      }
    };
    // 댓글 등록
    const postComment = async() => {
      if (state.comment.trim() == "") {
        showModal.value = true;
        message.value = "댓글 본문을 입력해 주세요";
      }
      if(isBlocked.value) return;
      isBlocked.value = true; 
      const data = { comment: state.comment };
      setTimeout(async()=> { 
          let response: any = await fetch(
          `/api/comment/${postid.value}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
          }
        );
        if (response.ok) {
          await getComments();
          state.comment = "";
          isBlocked.value = false; 
        }
      },500);
    };
    // 댓글 삭제
    const deleteComment = async (index: number) => {
      const isConfirm = confirm('정말로 해당 댓글을 삭제하시겠습니까?');
      if(!isConfirm) return;
      const comment: Comment = comments.value![index];
      // 댓글 아이디 확인
      const commentId: number = comment.id;
      const response: any = await fetch(
        `/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      );
      if (response.ok) {
        comments.value = comments.value!.filter((el, idx) => idx !== index);
        // 모달 확인 요망 - vuex store 이용할 것
        showModal.value = true;
        message.value = "삭제되었습니다.";
      }
    };
    onMounted(async() => {
      await getComments();
      await store.dispatch('setUserInfo')
    });
    return {
      state,
      comments,
      message,
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
  background: #DCDCDC;
  width: 80%;
  padding: 1em;
  margin: 2em 0;
}

.comment{
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
  
}
.comment .title{
  display: flex;
}
.comment .title .delete{
  margin-left: auto;
  background-color: #EBEBEB;
}
.comment .content {
  padding-bottom :0.5em; 
  border-bottom: 2px solid #787878;
}
.comments .register{
  display: flex;
  margin: 1em 0;
}
.comments .register textarea{
  background-color: #EBEBEB;
  resize: none;
  border: none;
  font-size: 1.2em;
  flex:1;
  box-sizing: border-box;
}

.comments .register button{
  background-color: #787878;
  color:#FFFFFF;
  width:5em;
  height: 5em;
  padding:0;
  margin-left: 1em;
}


</style>