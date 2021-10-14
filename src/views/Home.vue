<template>
  <div class="wrapper">
    <title-message />
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
          <router-link class="content l-p" to="/info/welcome">
            <img src="/img/zoom.png" />
            <div>
              <p>Welcome</p>
              <p>Message</p>
            </div>
          </router-link>
          <router-link to="/live/session?sort=keynote1" class="content l-p">
            <img src="/img/zoom.png" />
            <div>
              <p>Keynote</p>
              <p>Talks 1</p>
            </div>
          </router-link>
          <router-link to="/live/session?sort=special1" class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Special</p>
              <p>Topic</p>
              <p>Session 1</p>
            </div>
          </router-link>
          <a href="https://us06web.zoom.us/j/85364532741?pwd=VWFXTjQxRml3TzN5QXhLY29PTEl3QT09" class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Research</p>
              <p>Ethics</p>
              <p>Seminar</p>
            </div>
          </a>
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
          <router-link to="/live/session?sort=special2" class="content d-p">
            <img src="/img/zoom.png" />
            <div>
              <p>Special</p>
              <p>Topic</p>
              <p>Session 2</p>
            </div>
          </router-link>
          <router-link to="/live/session?sort=keynote2" class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Keynote</p>
              <p>Talks 2</p>
            </div>
          </router-link>
          <a href="https://us06web.zoom.us/j/86080844864?pwd=TTF0R2Y0NGVJV2duSFlSaU15OUdqUT09" class="content">
            <img src="/img/zoom.png" />
            <div>
              <p>Awards</p>
              <p>Ceremony</p>
            </div>
          </a>
          <router-link to="/review?page=1" class="content">
            <div>
              <p>Comments</p>
              <p>on</p>
              <p>KSCIC</p>
              <p>2021</p>
            </div>
          </router-link>
        </div>
      </section>
    </main>
    <div class="banner">
      <div id="slider" class="sponsors">
        <a href="https://www.mcst.go.kr/kor/main.jsp" target="_blank">
          <img src="/img/banner/banner1.png" alt />
        </a>
        <a href="https://kofst.or.kr/intro.jsp" target="_blank">
          <img src="/img/banner/banner2.png" alt />
        </a>
       <div>
          <img src="/img/banner/banner3.png" alt />
        </div>
           <a href="http://www.apparelbase.com/" target="_blank">
          <img src="/img/banner/banner4.png" alt />
           </a>
        <a href="http://www.dnastudio.co.kr/" target="_blank">
          <img src="/img/banner/banner5.png" alt />
        </a>
      </div>
    </div>
    <background/>
  </div>
</template>

<script lang="js">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import TitleMessage from '../components/common/Title.vue';
import Background from '../components/common/Background.vue'; 

export default {
  name: "Home",
  setup()  {
    const store = useStore();
    onMounted(async () => {
        await store.dispatch("setUserInfo");
    });
    const prevImg = () => {
      document.querySelector('.slick-prev').click()
    }
     const nextImg = () => {
      document.querySelector('.slick-next').click()
    }

    setTimeout(() => {
      $('#slider').slick({
          dots: false,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: false
        });
    },0);
   
    return {
      prevImg,
      nextImg
    }
  },
  components : {
    TitleMessage,
    Background
  }
}
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.wrapper {
  background-color: #fff;
  z-index: 1;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
main {
  width: auto;
  display: inline-block;
  padding: 0 0 5rem 10vw;
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
  margin: 0.4vw 0.4vw 0 0;
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

.banner {
}
.banner .sponsors {
  padding: 0 25vw 3rem 20vw;
}
.banner .sponsors a,.banner .sponsors div{
  height: 6rem;
  border: none;
  text-align: center;
  box-sizing: border-box;
}
.banner .sponsors a img,.banner .sponsors div img{
  padding: 0 0.1rem;
  object-fit: contain;
  display: inline-block;
  height: 4rem;
  box-sizing: border-box;
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
  .category .table .content {
    width: 12vw;
    height: 12vw;
  }
  .banner .sponsors {
  padding: 3rem 10vw;
}
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .wrapper > img{
  left: 2rem;
      height: 70%;
  }
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
    padding: 0.5rem;
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
  .banner .sponsors {
  padding: 3rem ;
}
.banner .sponsors div img{
  height: 1.7rem;
  box-sizing: border-box;
}
}
</style>