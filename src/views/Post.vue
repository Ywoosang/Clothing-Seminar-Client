<template>
  <div class="wrapper">
    <side-bar />
    <section class="content">
      <h1 class="category">{{ category }}</h1>
      <h1 class="title">{{ post.title }} <span v-if="modified">(수정됌)</span></h1>
      <div class="info">
        <div>작성자: {{ post.username }}({{ post.userid }})</div>
        <div>작성일: {{ post.created_at }}</div>
        <div>조회수: {{ post.views }}</div>
      </div>
      <div class="file">
        <div class="name">
          {{ post.filename }}
        </div>
        <a :href="postViewLink"
          ><i class="fa fa-file-pdf-o" style="margin-right: 0.5em"></i
          ><b>논문 보기</b></a
        >
      </div>
      <div class="post-content">{{ post.content }}</div>
      <button v-if="hasDeleteAuthority" @click="deletePost">삭제하기</button>
      <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
      <!-- use the modal component, pass in the prop -->
      <Comment :postid="postId"/>
    </section>
  </div>
</template>

<script lang="ts">
import Comment from "../components/Comment.vue";

import { onMounted, ref, reactive, computed, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";

export default {
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  // before created 이전 - this 에 접근이 불가
  // props 가 가장 많이 쓰이기 때문에 props 를 제일 첫 번째로
  setup(props: any) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { category } = toRefs(props);
    //
    interface Post {
      title: string;
      content: string;
      userid: string;
      created_at: string;
      updated_at: string;
      filename: string;
    }
    const postId = ref<any>(route.query.id);
    const postViewLink = ref<any>(`/api/post/${route.query.id}/view`);
    // 모달
    interface Post {
      title: string;
      content: string;
      userid: string;
      created_at: string;
      updated_at: string;
      filename: string;
      views: number;
    }
    const isConfirm = ref<boolean>(false);
    const showModal = ref<boolean>(false);
    const post: any = ref<Post>({
      title: "",
      content: "",
      userid: "",
      created_at: "",
      updated_at: "",
      filename: "",
      views: 0,
    });
    onMounted(async () => {
      // 사용자 정보 세팅
      await store.dispatch("setUserInfo");
      try {
        const response: any = await fetch(`/api/post/${postId.value}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.status == 200) {
          const res = await response.json();
          post.value = res.post;
        } else {
          throw new Error("Page Not Found");
        }
      } catch (error) {
        console.log(error);
        await router.push(`/404`);
      }
    });
    //
    const modified = computed(() => {
      return post.value.created_at !== post.value.updated_at;
    });
    const hasDeleteAuthority = computed(() => {
      const currentUserId = store.state.userId;
      const authority = store.state.authority;
      return authority == "ADMINISTRATOR" || currentUserId == post.value.userid;
    });
    //
    const deletePost = async () => {
      const data = { postId };
      const comfirmDelete = confirm(
        `정말로 ${post.value.title} 를 삭제하시겠습니까?`
      );
      if (!comfirmDelete) return alert("삭제를 취소합니다");
      try {
        let response: any = await fetch(`/api/post/${postId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        if (response.ok) {
          alert("삭제되었습니다");
          await router.push(`/presentation/poster/${category.value}`);
        } else if (response.status == 403) {
          throw new Error("권한이 없습니다");
        } else {
          throw new Error("올바르지 못한 접근입니다");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    return {
      post,
      postId,
      modified,
      postViewLink,
      category,
      deletePost,
      hasDeleteAuthority,
    };
  },
  components: {
    Comment,
    SideBar,
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.wrapper {
  flex: 1;
  display: flex;
}
.content {
  padding-top: 1em;
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 2em 2em 0em 2em;
}

.content .category {
  font-weight: bold;
}

.content .title {
  margin: 2em 0 0.3em 0;
  font-size: 1.3em;
  font-weight: bold;
}

.content .info {
  width: 80%;
  display: flex;
  border-bottom: 2px solid #dcdcdc;
  padding-bottom: 0.2em;
}
.content .info div {
  margin-right: 2em;
}
.content .file {
  margin: 2em 0 0 0;
  background-color: #dcdcdc;
  width: 50em;
  padding: 1em;
}

.content .file .name {
  font-size: 1em;
}

.content .post-content{
    margin: 1em 0 0 0;
}
.category {
}
</style>
