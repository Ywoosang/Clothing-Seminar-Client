<template>
  <div class="wrapper">
    <main>
      <section class="banner">
        <img :src="currentImg" />
        <!-- <VueSlickCarousel  v-bind="settings">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </VueSlickCarousel> -->
      </section>
      <section class="category">
        <div class="table top">
          <div class="content">
            <div>
              개회사/
              <br />연구 윤리 세미나
            </div>
          </div>
          <div class="content">
            <div>
              기조강연
              <br />
              <span class="sub-text">:지구와 공생하는 삶</span>
            </div>
          </div>
          <div class="content">
            <div>
              초청강연
              <br />
            </div>
          </div>
        </div>
        <div class="table middle">
          <router-link to="/presentation/kosco" class="content">
            <div>
              2021
              <br />KOSCO전
              <br />
              <span class="sub-text">:Oneness for fashion</span>
            </div>
          </router-link>
          <div class="content">
            <div>
              청년 취업/창업
              <br />프로그램
              <br />
              <span class="sub-text">
                :글로벌 패션플랫폼
                <br />청년 창업 세미나
              </span>
            </div>
          </div>
          <div class="content">
            <div>
              이공계
              <br />대학원생을 위한
              <br />워크샵
              <br />
            </div>
          </div>
        </div>
        <div class="table bottom">
          <router-link to="/presentation/poster" class="content">
            <div>포스터 발표</div>
          </router-link>
          <router-link to="/presentation/oral" class="content">
            <div>구두 발표</div>
          </router-link>
          <div class="content">
            <div>폐회사</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="js">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import VueSlickCarousel from 'vue-slick-carousel'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


export default {
  name: "Home",
  // data(){
  //   return {
  //     settings: {
  //         "dots": true,
  //         "dotsClass": "slick-dots custom-dot-class",
  //         "edgeFriction": 0.35,
  //         "infinite": false,
  //         "speed": 500,
  //         "slidesToShow": 1,
  //         "slidesToScroll": 1
  //     }
  //   }
  // }, 
  setup()  {
    const store = useStore();
    const currentImg = ref("img/Asset1.png");
    onMounted(async () => {
      await store.dispatch("setUserInfo");
    });
    setInterval(() => {
      currentImg.value =
        currentImg.value == "img/Asset2.png"
          ? "img/Asset1.png"
          : "img/Asset2.png";
    }, 3500);
    return {
      currentImg
    }
  // },
  // components : {
  //   VueSlickCarousel
  // }
}
}
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  display: flex;
  width: 63%;
  margin: 3rem 0;
}
.banner {
  flex: 3.3;
  padding-bottom: 0;
  margin-right: 4%;
  position: relative;
  overflow: hidden;
}
.banner img {
  object-fit: contain;
  width: 100%;
}

.category {
  flex: 6;
  display: flex;
  flex-direction: column;
}
.category .table {
  flex: 1 1 0;
  position: relative;
}
.category .table .content {
  position: relative;
  float: left;
  width: 27%;
  padding-bottom: 27%;
  margin-bottom: 2%;
  margin-right: 2%;
  background-color: #dcdcdc;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.category .table .content:hover {
  background-color: #787878;
  color: white;
}
.category .table .content div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  font-size : 14px;
  font-size: 14px;
  transform: translate(-50%, -50%);
}
.category .table .content .sub-text {
  font-size: 0.6em;
  padding: -0.5em;
  font-weight: normal;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
  main {
    width: 80%;
  }
  .category .table .content div {
    font-size: 10px;
  }
  .sub-text {
    display: none;
  }
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  main {
    width: 95%;
  }
  .banner {
    display: none;
  }
  .category .table {
    display: flex;
    justify-content: center;
  }
  .category .table {
    margin-bottom: 1em;
  }
  .sub-text {
    display: none;
  }
  .category .table .content div {
    font-size: 5px;
  }
}
</style>