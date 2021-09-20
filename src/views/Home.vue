<template>
  <div class="wrapper">
    <article class="title">
      <h1>
        <span style="color: #ff0000">KSC</span> International Conference (KSCIC)
        2021
      </h1>
      <h3>'Fashion for Human, Peace and the Future'</h3>
      <p>October 23, 2021 International Peace Center(and virtual Jeju)</p>
    </article>
    <main>
      <section class="category">
        <div class="table top">
          <div class="content" style="background: transparent"></div>
          <div class="content" style="background: transparent"></div>
          <div class="content" style="background: transparent"></div>
          <div class="content" style="background: transparent"></div>
          <router-link to="/info/program?lang=en" class="content">
            <div>
            <p>Program</p>
            </div>
          </router-link>
        </div>
        <div class="table middle">
          <div class="content" style="background: transparent"></div>
          <div class="content l-p">
            <img src="/img/zoom.png" />
            <div>
              <p>Welcome</p>
              <p>Message</p>
            </div>
          </div>
          <div class="content l-p">
            <img src="/img/zoom.png" />
            <div>
              <p>Keynote</p>
              <p>Talks 1</p>
            </div>
          </div>
          <div class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Special</p>
              <p>Topic</p>
              <p>Session 1</p>
            </div>
          </div>
          <div class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Research</p>
              <p>Ethics</p>
              <p>Seminar</p>
            </div>
          </div>
          <router-link to="/presentation/kosco" class="content">
            <div>
              <p>2021</p>
              <p>International</p>
              <p>KOSCO</p>
              <p>Exhibition</p>
            </div>
          </router-link>
        </div>
        <div class="table bottom">
          <router-link to="/presentation/poster" class="content l-p">
            <div>
              <p>Poster</p>
              <p>Session</p>
            </div>
          </router-link>
          <router-link to="/presentation/oral" class="content l-p">
            <img src="/img/zoom.png" />
            <div>
              <p>Oral</p>
              <p>Session</p>
            </div>
          </router-link>
          <div class="content d-p">
            <img src="/img/zoom.png" />
            <div>
              <p>Special</p>
              <p>Topic</p>
              <p>Session 2</p>
            </div>
          </div>
          <div class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Keynote</p>
              <p>Talks 2</p>
            </div>
          </div>
          <div class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Closing</p>
              <p>Remarks</p>
            </div>
          </div>
          <div class="content">
            <div>
              <p>Review</p>
              <p>:After</p>
              <p>finishing</p>
              <p>conference</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <img src="/img/background-logo.png" />
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
  setup()  {
    const store = useStore();
    const currentImg = ref("img/Asset1.png");
    onMounted(async () => {
      await store.dispatch("setUserInfo");
         $('.slider').slick({
          dots: false,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
      });
       
    });
    const prevImg = () => {
      document.querySelector('.slick-prev').click()
    }
     const nextImg = () => {
      document.querySelector('.slick-next').click()
    }
   
    return {
      currentImg,
      prevImg,
      nextImg
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
  background-color: #FFF;
  z-index: 1;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
.wrapper > img {
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 15vw;
  height: 80%;
}
.title {
  font-family: "Heebo", sans-serif;
  margin: 4vh 0 5rem 0;
}

.title h1 {
  font-weight: bold;
  font-size: 2.5vw;
  padding: 0.5rem 0;
}
.title h3 {
  font-size: 2vw;
  font-weight: 400;
  color: #c00000;
  padding: 0.5rem 0;
}
.title p {
  font-size: 1.2vw;
  padding: 0.5rem 0;
}

main {
  width: auto;
  display: inline-block;
  padding: 0 0 0 10vw;
}
.category {
  width: auto;
  height: auto;
  display: table;
}
.category .table {
  display: table-row;
}
.category .table .content {
  position: relative;
  float: left;
  width: 8vw;
  height: 8vw;
  background-color: #dcdcdc;
  margin: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: #787878;
}
.category .table .l-p {
  background-color: #ceb6b6;
}
.category .table .l-p p {
  color: black !important;
}

.category .table .d-p {
  background-color: #706262;
}

.category .table .content * {
  font-family: "Fahkwang", sans-serif;
}
.category .table .content img {
  position: absolute;
  top: 0;
  right: 0;
  width: 2vw;
  object-fit: contain;
  margin: 0.2vw 0.2vw 0 0;
}
.category .table .content div {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: start;
  padding: 0.2vw;
  line-height: 1.2vw;
  font-size: 1vw;
}
.category .table .content div p {
  margin: 0;
  color: white;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
  main {
    padding: 0;
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
    padding: 0;
  }
  .title {
    margin-top: 1vh;
  }

  .category {
    display: flex;
  }
  .category .table {
    display: flex;
    flex-direction: column;
  }
  .category .table .content {
    display: flex;
    flex-wrap: wrap;
  }
  .category .table .content {
    height: 25vw;
    width: 25vw;
  }
  .category .table .content div {
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: start;
    padding: 0.2vw;
    line-height: 12px;
    font-size: 11px;
  }
  .category .table .content img {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    object-fit: contain;
    margin: 0.5rem 0.5rem 0 0;
  }
}
</style>