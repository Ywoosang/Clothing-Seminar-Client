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
import { Post } from '../types/type';
import { getPostById,deletePostById } from "../api/post";

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
    const postId = ref<any>(route.query.id);
    const postViewLink = ref<any>(`${process.env.VUE_APP_BASE_URL}/api/post/${route.query.id}/view`);
    const post = ref<any>({
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
        const response = await getPostById(postId.value); 
        post.value = response.data.post;
      } catch (error) {
        console.log(error);
        await router.push(`/404`);
      }
    });
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
      const comfirmDelete = confirm(
        `정말로 ${post.value.title} 를 삭제하시겠습니까?`
      );
      if (!comfirmDelete) return alert("삭제를 취소합니다");
      try {
          await deletePostById(postId.value);
          alert("삭제되었습니다");
          await router.push(`/presentation/poster/${category.value}`);
      } catch (error) {
        if(error.response){
          const status = error.response.status;
          switch(status){
            case 401:
                alert('로그인 해 주세요');
                await router.push('/login');
                break;
            case 403:
                alert('권한이 없습니다');
                break;
            case 500:
                console.log(error);
          }
        } else if(error.request){ 
          console.log(error.request);
        } else {
          console.log('Error',error.message);
        }
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
