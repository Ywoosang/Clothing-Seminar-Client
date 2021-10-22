<template>
  <div class="wrapper">
    <poster-presentation>
      <h1>Poster Session</h1>
    </poster-presentation>
    <section class="content">
      <div class="article-wrapper">
        <router-link
          class="article"
          :to="baseUrl + category.url +'?page=1'"
          v-for="category in categories"
          :key="category.url"
        >
          <h1 class="article-title" v-if="category.des.length != 1">
            <p v-for="(text,index) in category.des" :key="index">
              <span v-if="index !== 0">·</span>
              {{ text }}
            </p>
          </h1>
          <h1 class="article-title" v-else>
            <p>{{ category.des[0] }}</p>
          </h1>
        </router-link>
      </div>
    </section>
    <section class="q-a">
      <a href="https://us06web.zoom.us/j/89787862191?pwd=anRqbWErdm0rWWJVSFd4TVlDWDNMdz09">Q&A on Zoom</a>
    </section>
    <background/>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import PosterPresentation from "../components/common/PresentationTitle.vue";
import Background from '../components/common/Background.vue';

export default {
  name: "Home",
  components: {
    PosterPresentation,
    Background
  },
  setup() {
    const store = useStore();
    const authenticated = store.state.authenticated;
    const baseUrl = ref("/presentation/poster/");
    const categories = computed(() => {
      return store.state.categories.map((text:any) => {
        return {
          url : text,
          des : text.split(" · ")
        }  
      });
    });
    onMounted(async () => {
      // 사용자 정보 세팅
      await store.dispatch("setUserInfo");
    });
    return {
      baseUrl,
      categories,
      authenticated
    };
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  position: relative;
}
.title h1{
  text-align: center;
  font-size: 2.5rem;
  margin: 0;
}
.content {
  width: 100%;
  flex: 5;
  display: flex;
  justify-content: center;
  height: 100%;
}
.content .article-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
}
.content .article-wrapper .article {
  z-index: 2;
  float: left;
  width: 13vw;
  height: 13vw;
  margin: 2vw;
  border-radius: 50%;
  background-color: #aaaaaa;
  color: #ffffff;
  position: relative;
  cursor: pointer;
}
.content .article-wrapper .article .article-title {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: 500;
  font-size: 1.3vw;
  line-height: 140%;
}
.content .article-wrapper .article .article-title p{
  font-size: 1.1vw;
  margin: 0 ;
  line-height: 130%;
  coloR: white;
}


.q-a {
  z-index: 2;
  flex: 4;
  width: 80%;
  text-align: center;
}
.q-a a {
  display: block;
  width: 65%;
  height: 4rem;
  line-height: 4rem;
  margin: 0 auto;
  font-weight: bold;
  font-size: 1.6rem;
  background-color: #f5aaaf;
  border-radius: 0.8rem;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .title {
    display: none;
  }
  .content {
    height: 80%;
    align-items: center;
  }
  .content .article-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 10vh 0;
  }
  .content .article-wrapper .article {
    width: 50vw;
    border-radius: 0.8em;
    height: 20vw;
    z-index: 2;
  }
  .content .article-wrapper .article .article-title p{
    font-size: 1.5rem;
  }
}
</style>