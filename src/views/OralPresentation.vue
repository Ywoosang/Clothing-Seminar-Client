<template>
  <div class="wrapper">
    <presentation-title>
      <h1>Oral Session</h1>
    </presentation-title>
    <section class="content">
      <div class="article-wrapper">
        <a :href="links[index]" class="article" v-for="(category,index) in categories" :key="category">
          <h1 class="article-title" v-if="category.length != 1">
            <p v-for="(text,index) in category" :key="text">
              <span v-if="index !== 0">·</span>
              {{ text }}
            </p>
          </h1>
          <h1 class="article-title" v-else><p>{{ category[0] }}</p></h1>
        </a>
      </div>
    </section>
    <background/>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import Background from '../components/common/Background.vue';
import PresentationTitle from '../components/common/PresentationTitle.vue';

export default {
  components: { Background, PresentationTitle },
  setup() {
    const links = [
      "https://us06web.zoom.us/j/85613854576?pwd=R2RtTVRuMnRaYVYyRlFLdklQYWxQdz09",
      "https://us06web.zoom.us/j/85308489997?pwd=Y1M3b3IxbTlSMmNuNncyU05hc2Eydz09",
      "https://us06web.zoom.us/j/86392493339?pwd=YlUzZG1CU1hYQXc5OG1FYm1rVVo0UT09",
      "https://us06web.zoom.us/j/84232442713?pwd=cGZzeHd2S25xNi9lR2FrZ3dPQmc4QT09"
    ]
    const store = useStore();
    const categories = computed(() => {
      return store.state.categories.map(text => {
        return text.split(" · ");
      });
    });
    return {
      categories,
      links
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
  font-size: 3rem;
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
  position: relative;
  cursor: pointer;
}
.content .article-wrapper .article .article-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-weight: 500;
}

.content .article-wrapper .article .article-title p{
  margin:0;
  font-size: 1.1vw;
  line-height: 130%;
  coloR: white;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .title {
    display: none;
  }
  .content .article-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 10vh 0;
  }
  .content .article-wrapper .article {
    border-radius: 0.8rem;
    z-index: 1001;
    height: 20vw;
    width: 50vw;
  }
  .content .article-wrapper .article h1 {
    font-size: 3.5vw;
  }
   .content .article-wrapper .article .article-title p{
    font-size: 1.5rem;
  }
}
</style>