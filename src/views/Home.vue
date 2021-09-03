<template>
  <!-- <div class="user" v-if="admin">
    <div class="authority"><b>{{message}}</b> <br>사용자 권한: <b>{{authority}}</b></div>
    <div> <router-link v-if="authority==='ADMINISTRATOR'" class="admin" to="/admin">멤버 관리</router-link></div>
  </div>  -->
  <div class="wrapper">
    <main>
      <section class="banner">
        <img :src="currentImg" />
      </section>
      <section class="category">
        <div class="table top">
          <div class="content">
            <div>
              개회사/<br />
              연구 윤리 세미나
            </div>
          </div>
          <div class="content">
            <div>
              기조강연<br />
              <span class="sub-text">:지구와 공생하는 삶</span>
            </div>
          </div>
          <div class="content">
            <div>
              초청강연<br />
              <span class="sub-text"
                >:Fashion Textile & TEchnology Ecosystem</span
              >
            </div>
          </div>
        </div>
        <div class="table middle">
          <router-link to="/presentation/kosco" class="content">
            <div>
              2021<br />
              KOSCO전<br />
              <span class="sub-text">:Oneness for fashion</span>
            </div>
          </router-link>
          <div class="content">
            <div>
              청년 취업/창업<br />
              프로그램<br />
              <span class="sub-text">:글로벌 패션플랫폼 청년 창업 세미나</span>
            </div>
          </div>
          <div class="content">
            <div>
              이공계 대학원생을 위한<br> 워크샵 
              <br>
              <span class="sub-text"
                >:Rhino를 활용한 <br>3D 패션제품 개발 워크샵</span
              >
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
    <!-- <div class="top"> 
    <a class="session" href="">개회식/연구 윤리 세미나 (줌)</a>
    <a class="session" href="">기조 강연 (줌)</a>
    <router-link class="session" to="/presentation/special">초청 강연</router-link>
    </div> 
    <div class="bottom">
    <router-link class="session" to="/presentation/oral">구두 발표</router-link>
    <router-link class="session" to="/presentation/poster">포스터 발표</router-link>
    <a class="session" href="">폐회식 (줌)</a>
    </div> -->
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  setup() {
    const message = ref<string>("로그인하지 않은 사용자");
    const admin = ref<string | boolean>(false);
    const store = useStore();
    const authority = ref<string>("MEMBER");
    const currentImg = ref("img/Asset1.png");
    // ref 와 reactive 의 차이점은
    onMounted(async () => {
      await store.dispatch("setUserInfo");
      // to asign use value
      message.value = `안녕하세요 ${store.state.username} 님`;
      admin.value = store.state.authenticated;
      authority.value = store.state.authority;
    });
    setInterval(() => {
      currentImg.value =
        currentImg.value == "img/Asset2.png"
          ? "img/Asset1.png"
          : "img/Asset2.png";
    }, 3500);
    return {
      message,
      admin,
      authority,
      currentImg,
    };
  },
};
</script>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  display: flex;
  width: 60%;
  margin: 3rem 0;
}
.banner {
  flex: 3;
  padding-bottom: 4%;
  position: relative;
  overflow: hidden;
}
.banner img {
  object-fit: contain;
  width: 100%;
}

.category {
  flex: 5;
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
  width: 26%;
  padding-bottom: 26%;
  margin: 0 3%;
  background-color: #dcdcdc;
  font-weight: bold;
  cursor: pointer;
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
  transform: translate(-50%, -50%);
}
.category .table .content .sub-text {
  font-size: 0.6em;
  padding: -0.5em;
  font-weight: normal;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
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