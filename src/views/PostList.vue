<template>
  <div class="wrapper">
    <side-bar/>
    <section class="content">
      <article class="title">
        <h1>{{ currentCategory }}</h1>
        <router-link v-if="postAuth" class="write" :to="'/post/'+currentCategory +'/write'">투고하기</router-link>
      </article>
      <article class="posts">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th class="post-title">제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th class="views">조회수</th>
            </tr>
          </thead>
          <tbody v-if="posts.length != 0">
            <tr v-for="(post, index) in posts" :key="index">
              <th>{{ posts.length - index }}</th>
              <td class="post-title">
                <router-link :to="'/post'+'/'+currentCategory+ '?id='+post.id">{{ post.title }}</router-link>
              </td>
              <td>{{ post.username }}</td>
              <td>{{ post.created_at }}</td>
              <td class="views">{{ post.views}}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="pagination">
        <div class="pages">
          <div class="page" v-for="page in pages" :key="page">
            <!-- <span @click="changeCategoryPage(page)">{{page}}</span> -->
            <router-link :class="{ curr : page == currentPage }" :to="'/presentation/poster/'+currentCategory+'?page='+page">
              {{ page }}
            </router-link>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, watch,computed } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
import SideBar from '../components/SideBar.vue';
import { Post } from '../types/type';
import { getPostsByPageNumber,getTotalPageNumber } from '../api/post'; 

export default {
  name: "PostList",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute(); 
    const posts = ref<Post[]>([]);
    const categories = store.state.categories;
    const pages = ref();
    // 페이지
    const currentPage = computed(()=>{
      return route.query.page as string ;
    });

    watch(currentPage,async() => {
        if(!currentPage.value) return;
        await getNumberOfPages();
        await getCurrentPagePosts(); 
    }); 

    // 카테고리
    const currentCategory = computed(() =>{
       return route.params.category as string;
    });

    watch(currentCategory,async(newValue)=>{
      store.commit('SET_CATEGORY',newValue); 
      await getNumberOfPages();
      await getCurrentPagePosts(); 
      document.title = `KSCIC > ${newValue}`
    });

    onMounted(async () => {
      await store.dispatch("setUserInfo");
      store.commit('SET_CATEGORY',route.params.category); 
      // title
      document.title = `KICIC > ${currentCategory.value}`
      await getNumberOfPages();
      await getCurrentPagePosts(); 
    });

    async function getNumberOfPages(){
      try{
        const category = currentCategory.value; 
        const response = await getTotalPageNumber(category);
        const pageNumber: number = response.data.numberOfPages;
        pages.value = Array(pageNumber)
          .fill(0)
          .map((_, index) => index + 1); 
      } catch(error){
        console.log(error);
      }
    }

    async function getCurrentPagePosts(){
      try {
        // const page = route.query.page as string; 
        const category = currentCategory.value;
        const response = await getPostsByPageNumber(currentPage.value,category); 
        posts.value = response.data.posts;
      } catch (error) {
        console.log(error);
      }
    }
    
    const postAuth = computed(()=> {
      return store.state.authority == "ADMINISTER" || store.state.authority == "ROOT"; 
    }
    );
    return {
      posts,
      postAuth,
      currentCategory,
      categories,
      pages,
      currentPage
    };
  },
  components : {SideBar}
};
</script>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
}


.content {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-left: 3em;
}
.title {
  display: flex;
  align-items: center;
  flex: 1;
  width: 95%;
}
.title h1 {
  font-size: 2.3em;
  font-weight: 500;
}
.title .write{
  margin-left:auto;
  padding: 0.5em 1em;
  background: #ddd;
}

.posts {
  flex: 6;
}
.posts table {
  border: none;
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0 10px;
  table-layout: fixed;
}
.posts table thead tr:first-child {
  background-color: #dcdcdc;
}
.posts table tr {
  border-bottom: 1px solid rgb(119, 119, 119, 0.7);
}
.posts table tr td,
.posts table tr th {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  text-align: center;
  height: 40px;
}
.posts table tr .post-title {
  width: 40%;
}
.posts table tbody.not-exist{
  text-align: center;
  position:relative;
}
.posts table tbody.not-exist .message{
  position:absolute;
  left: 50%;
  top: 2rem;
  transform:translateX(-50%);
}

.pagination {
  flex: 1;
}
.pagination  .pages {
  margin-top: 2em;
  text-align: center;
}
.pagination  .pages .page {
  width: 1.1rem;
  display: inline-block;
  margin: 0.2rem;
  height: 1.4rem;
  text-align: center;
  cursor: pointer;
  color: #787878;
}
/* 현재 위치한 페이지 */
.pagination .pages .curr {
  color: #f86969 ;
  font-weight: 600;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
  .title h1{
    font-size: 2.5rem;
  }
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .title h1{
    font-size: 2rem;
    padding-left: 1rem;
  }
  .category {
    display: none;
  }
  .content {
    padding: 0;
  }
  .posts{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .posts table {
    width: 98%;
  }
  .views{
    display: none;
  }
}
</style>