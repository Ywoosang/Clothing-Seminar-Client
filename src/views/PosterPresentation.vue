<template>
  <div class="wrapper">
    <section class="title">
      <article>
        <div class="image-wrapper">
          <img src="/img/logo.png" />
        </div>
        <h1>논문 포스터발표</h1>
      </article>
    </section>
    <section class="content">
      <div class="article-wrapper"> 
        <router-link :to="baseUrl + category +'?page=1'" class="article" v-for="category in categories" :key="category">
            <h1 v-if="category.length == 2">
                {{ category[0] }}<br>{{ category[1] }} 
            </h1>
            <h1 v-else>{{ category[0] }}</h1>
        </router-link>
      </div>
    </section>
    <section class="q-a"><a href="#">Q&A</a></section>
    <img class="background-logo" src="/img/background-logo.png"> 
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted,computed } from "vue";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const authenticated = store.state.authenticated;
    const baseUrl = ref("/presentation/poster/");
    const categories = computed(()=>{
        return store.state.categories.map((text: string)=>{
            return text.split('·');
        });
    }); 
    onMounted(async () => {
      // 사용자 정보 세팅
      await store.dispatch("setUserInfo");
    });
    return {
      baseUrl,
      categories,
      authenticated,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  position:relative;
}
.wrapper .background-logo{
  position:absolute;
  left: 0;
  bottom:0;
  height: 80%;
}
.title {
  flex: 4;
}
.title article {
  margin: 0 auto;
  width: 15rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* 이미지 */
.title article .image-wrapper {
  width: 100%;
  flex: 5;
  position: relative;
}
.title article .image-wrapper img {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  height: 60%;
  object-fit: contain;
}
/* 구두발표 */
.title article h1 {
  flex: 2;
  text-align: center;
  line-height: 4rem;
  font-weight: 500;
  font-size: 1.4em;
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
.content .article-wrapper .article{
    float:left; 
    width: 11vw; 
    height: 11vw;
    margin:2vw;
    border-radius: 50%;
    background-color: #AAAAAA;
    color: #FFFFFF;
    position:relative; 
    cursor:pointer;
}
.content .article-wrapper .article h1 {
    position:absolute;
    width: 100%;
    left : 50%;
    top : 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: 500;
    font-size: 1.3vw;
    line-height: 140%;
}
.q-a{
    flex:4;
    width: 80%;
    text-align: center;
}
.q-a a{
    display: block;
    width: 65%;
    height: 3rem;
    line-height: 3rem;
    margin:0 auto;
    font-weight: bold;
    font-size: 1.6rem;
    background-color:#F5AAAF;
    border-radius: 0.8rem;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
    
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
   .title{
       display: none;
   }
   .content .article-wrapper{
       display: flex;
       flex-wrap: wrap;
       margin: 10vh 0;
   }
   .content .article-wrapper article{
       width: 30vw;
       height: 30vw;
   }
    .content .article-wrapper article h1{
        font-size: 3.5vw;
    }
}
</style>