<template>
  <nav>
    <router-link class="home" to="/">
      <img src="/img/header-logo.png" />
    </router-link>
    <div class="sign-in" v-if="!auth">
      <router-link class="signin" to="/login">관리자 로그인</router-link>
    </div>
    <div class="auth" v-if="auth">
      <router-link class="profile" to="/profile">내 프로필</router-link>
      <a class="nav-link logout" @click="clearCookie">로그아웃</a>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { logout } from "../api/auth";

export default {
  name: "Nav",
  setup() {
    const store = useStore();
    const router = useRouter();
    const auth = computed(() => store.state.authenticated);
    const clearCookie = async () => {
      try {
        await logout();
        localStorage.removeItem("jwt");
        await store.dispatch("setUserInfo");
        await router.push(`/login`);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      // data 처럼 사용 가능
      auth,
      logout,
      clearCookie
    };
  }
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #bbbdc0;
  height: 48px;
  min-height: 48px;
}
nav a {
  color: rgb(44, 44, 44);
  font-weight: 500;
  font-size: 1.3em;
}
nav .home {
  height: 48px;
}
nav .home img {
  height: 30px;
  margin-top: 5px;
  object-fit: contain;
}
nav .auth,nav.sign-in {
  display: flex;
}

nav .auth a:first-child {
  margin-right: 0.5em;
  position: relative;
}

nav .auth a:first-child::after {
  display: inline-block;
  content: "";
  position: absolute;
  right: -0.3em;
  top: -2px;
  width: 2px;
  height: 20px;
  vertical-align: middle;
  display: block;
  background: rgb(52, 52, 52);
}

nav .signup {
}
nav .logout {
  cursor: pointer;
}
/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  nav .auth a {
    font-size: 0.7rem;
  }
  nav .home img{
  height: 20px;
  margin-top: 13px;
  object-fit: contain;
}
  nav .auth a:first-child {
    margin-right: 0.4em;
    position: relative;
  }

  nav .auth a:first-child::after {
    display: inline-block;
    content: "";
    position: absolute;
    right: -3px;
    top: 2px;
    width: 1px;
    height: 10px;
    vertical-align: middle;
    display: block;
    background: rgb(52, 52, 52);
  }
}
</style>