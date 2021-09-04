<template>
  <div class="wrapper">
    <section class="category">
      <h1>포스터 발표</h1>
      <article>
        <router-link
          v-for="category in categories"
          :key="category"
          :class="{ curr: category == currentCategory }"
          :to="'/presentation/poster/' + category+'?page=1'"
          >{{ category }}</router-link
        >
      </article>
    </section>
    <section class="content">
      <article class="title">
        <h1>{{ currentCategory }}</h1>
        <router-link :to="'/post/'+currentCategory +'/write'">투고하기</router-link>
      </article>
      <article class="posts">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th class="post-title">제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
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
              <td>3</td>
            </tr>
          </tbody>
          <tbody v-else>
            <td colspan="5" style="text-align:center;">해당 카테고리에 투고된 논문이 존재하지 않습니다(0건)</td></tbody>
        </table>
      </article>
      <article class="pagination">
        <div class="pages">
          <div class="page" v-for="page in pages" :key="page">{{ page }}</div>
        </div>
      </article>
    </section>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, watch,computed } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";

interface Post{
  title: string;
  content: string;
  created_at: string;
  username: string,
  filename: string,
  fileId: number,
  category: string
}

export default {
  props: ["name"],
  name: "PostList",
  setup(props: any) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute(); 
    const posts = ref<Post[]>([]);
    const page = route.query.page;
    const postAuth = ref<boolean>(false);
    const categories = store.state.categories;
    const pages = ref<any>();

    const currentCategory = computed(() => props.name.replace(",", "·"));
    watch(currentCategory,async(newValue,oldValue)=>{
      await getNumberOfPages();
      await getCurrentPagePosts(); 
    })

    onMounted(async () => {
      await store.dispatch("setUserInfo");
      console.log(store.state.authenticated);
      if (!store.state.authenticated) {
        alert("로그인 해 주세요");
        router.push("/login");
      }
      await getNumberOfPages();
      await getCurrentPagePosts(); 
    });

    async function getNumberOfPages(){
      try{
        let response: any = await fetch(
          `${store.state.requestUrl}/post/${currentCategory.value}/count`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.status == 200) response = await response.json();
        const pageNumber: any = response.numberOfPages;
        pages.value = Array(pageNumber)
          .fill(0)
          .map((_, index) => index + 1); 
      } catch(error){
        alert(error);
      }
    }

    async function getCurrentPagePosts(){
      try {
        let response: any = await fetch(
          `${store.state.requestUrl}/post/${currentCategory.value}/${page}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.status == 200) response = await response.json();
        posts.value = response.posts;
      } catch (error) {
        alert(error);
      }
    }

    const authority = store.state.authority;
    postAuth.value =
      authority == "ADMINISTRATOR" || authority == "POST_ALLOWED";
    return {
      posts,
      postAuth,
      currentCategory,
      categories,
      pages,
    };
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

.category {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-right: 3px solid #a1a1a1;
  height: 90%;
  margin-top: 2rem;
}

.category h1 {
  margin-top: 4em;
  margin-bottom: 1em;
  width: 13.5rem;
}

.category article {
  width: 13.5rem;
}
.category article a {
  display: block;
  color: #787878;
  margin: 1em 0;
}
.category article .curr {
  color: #ea2d2e;
}

.content {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-left: 3em;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}
.title h1 {
  font-size: 2.3em;
  font-weight: 500;
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

.pagination {
  flex: 1;
}
.pages {
  margin-top: 2em;
  text-align: center;
}
.pages .page {
  width: 1.1rem;
  display: inline-block;
  margin: 0.2rem;
  height: 1.4rem;
  text-align: center;
  cursor: pointer;
  color: #787878;
}
/* 현재 위치한 페이지 */
.pages .curr {
  color: #000000;
  font-weight: 600;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .category {
    display: none;
  }
  .content {
    padding: 0;
  }
  .posts table {
    width: 100%;
  }
}
</style>