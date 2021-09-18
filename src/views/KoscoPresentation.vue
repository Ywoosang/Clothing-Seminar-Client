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
            <video controls>
                <source :src="requestUrl + '/api/media/'+video +'/?token='+jwt" type="video/mp4" />
            </video>
         </section>
        <img class="background-logo" src="/img/background-logo.png"> 
    </div>  

</template>

<script lang="ts">
import { ref,onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const store = useStore(); 
        const router = useRouter();
        const video = "한국의상디자인학회 구두발표_이하은.mp4";
        const requestUrl = process.env.VUE_APP_BASE_URL; 
        const jwt = ref<string>();
        onMounted(async()=> {
          const token = localStorage.getItem('jwt');
          if(token){
            jwt.value = token;
          }
        });
        return {
            video,
            requestUrl,
            jwt 
        }
    }
}
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
  flex: 1;
}
.title article {
  margin: 0 auto;
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
  height: 80%;
  object-fit: contain;
}
/* 구두발표 */
.title article h1 {
  flex: 2;
  text-align: center;
  font-weight: 500;
  font-size: 1.4em;
  margin-top:0.5em;
}
.video-container {
    width: 100%;
    flex: 2;
    display: flex;
    justify-content: center;
}
.video-container video{
    max-width:800px;
    border: 1em solid #787878; 
    margin-bottom: 3em;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
  .video-container{
      max-width: 500px;
  }
  video {
      width: 500px;
  }
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
      .video-container{
      max-width: 500px;
  }
  video {
      width: 400px;
  }
  
}
</style>