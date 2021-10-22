<template>
  <div class="wrapper">
    <section class="title">
      <article>
        <div class="image-wrapper">
          <img src="/img/logo.png" />
        </div>
        <h1>International KOSCO EXHIBITION 2021</h1>
      </article>
    </section>
    <section class="video-container">
      <video id="video" controls></video>
    </section>
    <background />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Background from "../components/common/Background.vue";
import Hls from "hls.js";

export default {
  components: { Background },
  setup() {
    onMounted(() => {
      const video: any = document.getElementById("video")!;
      const videoSrc = process.env.VUE_APP_STREAMING_URL;
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      } else if (Hls.isSupported()) {
        const hls = new Hls(); 
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      }
    });
  },
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

/* 타이틀 */
.title{
  flex: 2;
  display: flex;
  box-sizing: border-box;
  padding-top: 3rem;
}
.title article {
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 이미지 */
.title article .image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.title article .image-wrapper img {
  height: 12rem;
}
/* 글  */
.title article h1 {
  text-align: center;
  font-weight: 500;
  font-size: 1.4em;
  margin-top: 0.5em;
}

/* 비디오 */
.video-container {
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
  padding-top: 5rem;
}
.video-container video {
  border: 1em solid #787878;
  height: 80%;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1024px) {
 .video-container video {
  max-width: 95vw;
}
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .video-container {
    max-width: 500px;
  }
  video {
    width: 400px;
  }
.video-container {
  flex:6;
  align-items: flex-start;
  padding-top: 5rem;
  overflow: hidden;
}
 .video-container video {
  max-width: 95vw;
}
}
</style>