<template>
  <div class="wrapper">
    <side-bar/>
    <section class="content">
      <h1 class="category">{{ category }}</h1>
      <h1 class="title">{{ post.title }} <span v-if="modified">(수정됌)</span></h1>
      <div class="info">
        <div>작성자: {{ post.username }}</div>
        <div>관리자: {{ post.userid }}</div>
        <div>작성일: {{ post.created_at }}</div>
        <div>조회수: {{ post.views }}</div>
        <button class="delete" v-if="hasDeleteAuthority" @click="deletePost">삭제하기</button>
      </div>
      <div class="file" v-if="post.filename">
        <div class="name">
          {{ post.filename }}
        </div>
        <a :href="postViewLink" id="viewer" style="display:none"></a> 
        <div class="viewer-btn" @click="viewPdf"
          ><i class="fa fa-file-pdf-o" style="margin-right: 0.5em; font-size: 1.3em;"></i
          ><b style="font-size: 1.3em; line-height: 3rem;">원본 PDF 파일 보기</b>
        </div>
      </div>
      <div class="post-content" v-html="post.content"></div>
      <Comment :postid="postId"/>
    </section>
  </div>
</template>

<script lang="ts">
import Comment from "../components/Comment.vue";

import { onMounted, ref, reactive, computed, toRefs,watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";
import { Post } from '../types/type';
import { getPostById,deletePostById } from "../api/post";

export default {
  
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const category = route.params.category as string;
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
      store.commit('SET_CATEGORY',category); 
      await store.dispatch("setUserInfo");
      try { 
        const response = await getPostById(postId.value); 
        post.value = response.data.post;
           document.title = `KICIC > ${post.value.title}`
      } catch (error) {
        console.log(error);
        await router.push(`/404`);
      }
    });
    const viewPdf = () => {
      (document.getElementById('viewer') as any).click();
    }
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
          await router.push(`/presentation/poster/${category}?page=1`);
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
      viewPdf
    };
  },
  components: {
    Comment,
    SideBar,
  },
};
</script>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
}
.content {
  padding-top: 1em;
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 2em 10% 0em 2em;
}

.content .category {
  font-weight: 500;
}

.content .title {
  margin: 2em 0 0.3em 0;
  font-size: 1.3em;
  font-weight: bold;
}

.content .info {
  display: flex;
  border-bottom: 2px solid #dcdcdc;
  padding-bottom: 0.2em;
}
.content .info div {
  margin-right: 2em;
}
.content .info .delete{
  margin-left: auto;
}
.content .file {
  margin: 2em 0 0 0;
  background-color: #dcdcdc;
  padding: 1em;
}
.content .file .name {
  font-size: 1em;
  margin-bottom: 0.5em;
}
.content .file .viewer-btn{
  cursor: pointer;
}

.content .post-content{
    margin: 1em 0 0 0;
}
/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
 
.content {
  padding: 2em 2em 0em 2em;
}
.content .info div {
  margin-right: 1em;
}
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .category{
    display: none;
  }
  .content{
    margin:0;
    padding:10px;
    width: 100%;
  }
  .content .title{
    margin: 10px 0;
  }
  .content .info {
    width: 100%;
  }
  .content .info div{
    font-size:11px;
    margin: 0 10px 0 0;
  }
  .content .file {
    width: 100%;
  }
}
</style>
