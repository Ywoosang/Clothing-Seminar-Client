<template>
  <div class="comment" v-for="(com,index) in comments" :key="index">
    <div class="content">{{ com.content }}</div>
    <div>작성자: {{com.username}} 작성일:{{  com.created_at }}</div>
    <button
      v-if="com.user_id == userId || authority=='ADMINISTRATOR'"
      @click="deleteComment(index)"
    >댓글 삭제하기</button>
  </div>
  <div>
    <textarea v-model="state.comment"></textarea>
    <button @click="postComment">댓글 달기</button>
  </div>
  <Modal v-if="showModal" @close="showModal = false">
    <p>{{ message }}</p>
    <button @click="closeModal">확인</button>
  </Modal>
</template>

<script lang="ts">
import Modal from "./common/Modal.vue";
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
    const authority:string = store.state.authority;
    const userId:string = store.state.userId;
    const state = reactive({
        comment: ''
    });
    const comments = ref<Comment[]>();
    //
    interface Comment {
      id: number;
      content: string;
      user_id: string;
      username: string;
      created_at: string;
    }
    console.log(postid);
    const closeModal = () => {
      return (showModal.value = false);
    };
    const getComments = async () => {
      try {
        await store.dispatch("setUserInfo");
        let response: any = await fetch(
          `${store.state.requestUrl}/comment/${postid.value}`,
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
      const data = { comment: state.comment };
      let response: any = await fetch(
        `${store.state.requestUrl}/comment/${postid.value}`,
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
      }
    };
    // 댓글 삭제
    const deleteComment = async (index: number) => {
      const comment: Comment = comments.value![index];
      // 댓글 아이디 확인
      const commentId: number = comment.id;
      const response: any = await fetch(
        `${store.state.requestUrl}/comment/${commentId}`,
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
      showModal,
      message,
      postComment,
      deleteComment,
      closeModal,
      authority
    };
  }
};
</script>

<style scoped>
/* .comment {
  border: 2px solid black;
  padding: 1em 0.5em;
  width: 80%;
}
.comment .content {
  background-color: #ddd;
} */
</style>