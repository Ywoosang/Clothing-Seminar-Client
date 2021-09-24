<template>
  <article class="comments">
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <div class="title">
        <div>
          <b>작성자:</b> {{ comment.username }} <b>작성일:</b>
          {{ comment.created_at }}
        </div>
        <button class="delete" @click="deleteComment(index)">삭제</button>
      </div>
      <p class="content">
        {{ comment.content }}
      </p>
    </div>
    <div class="register">
      <div class="form" style="margin-bottom: 1rem">
        <label for="copyright_holder">작성자(*)</label>
        <input
          type="text"
          id="copyright_holder"
          maxlength="10"
          v-model="copyrightHolder"
          placeholder="작성자 본인 이름을 입력해 주세요"
        />
      </div>
      <div class="form" style="margin-bottom: 1rem">
        <label for="password">비밀번호(*)</label>
        <input
          type="number"
          id="password"
          v-model="password"
          placeholder="비밀번호로 사용할 4자리 숫자를 입력해 주세요"
        />
      </div>
      <div class="form">
        <label for="content">내용(*)</label>
        <textarea
          id="content"
          v-model="content"
          placeholder="댓글 내용을 입력해 주세요"
        ></textarea>
        <button @click="postComment">댓글<br />작성</button>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Comment } from "../types/type";
import { onMounted, ref, toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import {
  deleteCommentByPassword,
  deleteCommentByAdmin,
  getCommentsByPostId,
  postCommentByPostId,
} from "../api/comment";

export default {
  props: {
    postid: {
      type: Number,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore();
    const { postid } = toRefs(props);
    const authority = computed(
      () =>
        store.state.authority == "ROOT" || store.state.authority == "ADMINISTER"
    );
    const userId = ref<string>(store.state.id);
    //
    const comments = ref<Comment[]>();
    // 댓글 내용
    const content = ref<string>();
    const password = ref<number>();
    const copyrightHolder = ref<string>();
    const getComments = async () => {
      try {
        await store.dispatch("setUserInfo");
        const response = await getCommentsByPostId(postid.value);
        comments.value = response.data.comments;
      } catch (error) {
        if (error) alert("댓글 조회에 문제가 발생했습니다.");
      }
    };
    // 댓글 등록
    const postComment = async () => {
      if (!copyrightHolder.value || copyrightHolder.value.trim() == "") {
        return alert("작성자를 입력해 주세요");
      } else if (
        !password.value ||
        password.value < 999 ||
        password.value > 99999
      ) {
        return alert("비밀번호는 4자리로 입력해 주세요");
      } else if (!content.value || content.value.trim() == "") {
        return alert("댓글 본문을 입력해 주세요");
      }
      const data = {
        copyrightHolder: copyrightHolder.value.trim(),
        content: content.value.trim(),
        password: password.value,
      };
      await postCommentByPostId(postid.value, data);
      await getComments();
      content.value = "";
      copyrightHolder.value = "";
      password.value = undefined;
    };
    // 댓글 삭제
    const deleteComment = async (index: number) => {
      const isConfirm = confirm("정말로 해당 댓글을 삭제하시겠습니까?");
      if (!isConfirm) return;
      const comment: Comment = comments.value![index];
      const commentId: number = comment.id;
      if (!store.state.authenticated) {
        const commentPassword = prompt("비밀번호를 입력해 주세요");
        if (!commentPassword) return;
        if (isNaN(parseInt(commentPassword))) {
          return alert("비밀번호가 일치하지 않습니다");
        }
        if (
          parseInt(commentPassword) < 1000 ||
          parseInt(commentPassword) > 9999
        ) {
          return alert("비밀번호가 일치하지 않습니다");
        }
        try {
          await deleteCommentByPassword(commentId, { password: commentPassword! });
          comments.value = comments.value!.filter((el, idx) => idx !== index);
          return alert("삭제되었습니다");
        } catch (error) {
          if(error.response){
            alert(error.response.data.message)
          }
          console.log(error);
        }
      } else {
         try {
            await deleteCommentByAdmin(commentId);
            comments.value = comments.value!.filter((el, idx) => idx !== index);
            alert("삭제되었습니다");
          } catch (error) {
            console.log(error);
          }
      }
    };
    onMounted(async () => {
      await getComments();
    });
    return {
      content,
      comments,
      postComment,
      deleteComment,
      authority,
      userId,
      password,
      copyrightHolder,
    };
  },
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
  margin-bottom: 0.5em;
}
.comment .title {
  display: flex;
}
.comment .title .delete {
  margin-left: auto;
  background-color: #ebebeb;
}
.comment .content {
  padding: 0.5em 0;
  line-break: normal;
  word-break: break-all;
  white-space: pre-line;
  border-bottom: 2px solid #787878;
}
.comments .register {
  display: flex;
  flex-direction: column;
}
.comments .register .form {
  display: flex;
  align-items: center;
}
.comments .register .form label {
  min-width: 8rem;
  text-align: end;
  margin-right: 0.5rem;
}
.comments .register .form input {
  flex: 1;
  background-color: #ebebeb;
  border: none;
  font-size: 1em;
  height: 3rem;
  flex: 1;
  box-sizing: border-box;
  padding-left: 0.5rem;
}

.comments .register textarea {
  background-color: #ebebeb;
  resize: none;
  padding-left: 0.5rem;
  padding: 0.5em 0 0.5em 0.5em;
  border: none;
  font-size: 1em;
  height: 8rem;
  flex: 1;
  box-sizing: border-box;
}

.comments .register button {
  background-color: #787878;
  color: #ffffff;
  width: 8rem;
  height: 8rem;
  padding: 0;
  margin-left: 1em;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
  
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .comments {
  background: #dcdcdc;
  width: 100%;
  padding: 1em;
  margin: 2em 0;
}
  .category{
    display: none;
  }
  .content{
    margin:2px;
    padding:0;
  }
  
}
</style>