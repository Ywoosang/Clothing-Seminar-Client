<template>
  <header>
    <nav>
      <div class="logo">
        <router-link class="home" to="/">
          <img src="/img/header-logo.png" />
        </router-link>
      </div>
      <button class="menu-btn" @click="toggleSideBar">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="gnb" :class="{ active: isActive }">
        <button class="toggle-btn" @click="toggleSideBar">
          <img src="/img/cancel.png"/>
        </button>
        <li class="auth-btn" v-if="!auth">
          <router-link class="signin" to="/login"><i class="fas fa-sign-in-alt"></i></router-link>
        </li>
        <li class="auth" v-if="auth">
          <button class="auth-btn" @click="logout"><i class="fas fa-sign-out-alt"></i></button>
        </li>
         <h1>Poster Session</h1>
        <Category />
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import Category from "../components/common/Category.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { logout } from "../api/auth";

export default {
  name: "Nav",
  setup() {
    const store = useStore();
    const router = useRouter();
    const auth = computed(() => store.state.authenticated);
    const isActive = ref<boolean>(false);
    const logout = async () => {
      try {
        await logout();
        localStorage.removeItem("jwt");
        await store.dispatch("setUserInfo");
        await router.push(`/login`);
      } catch (error) {
        console.log(error);
      }
    };
    const toggleSideBar = () => {
      isActive.value = !isActive.value;
    };
    return {
      // data 처럼 사용 가능
      auth,
      logout,
      isActive,
      toggleSideBar
    };
  },
  components: {
    Category,
  },
};
</script>

<style>
header {
  padding: 0 4rem;
  background: #bbbdc0;
  position: relative;
  width: inherit;  
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 81px;
}
nav .menu-btn{
  width: 50px;
  height: 50px;
  padding:0;
  background-color:transparent;
}
nav .menu-btn i{
  font-size: 30px;
  pointer-events: none;
}
.logo a {
  display: block;
  height: 4.5rem;
}
.logo a img {
  height: 3.5rem;
  width: auto;
  object-fit: contain;
}
.gnb {
  display: flex;
}
.gnb li {
}
.gnb li a {
  margin: 15px;
}
.gnb li a:last-child {
  margin-right: 0;
}
nav .auth{

}
nav .auth i{
  font-size: 30px;
}
/* PC */
 {
  display: none;
}

nav button,.gnb .category,.gnb h1{
  display: none;
}

/* .gnb .toggle-btn {
  display: none;
} */

/* nav .auth a:first-child {
  margin-right: 0.5em;
  position: relative;
}

nav .auth a:first-child::after {
  display: inline-block;
  content: "";toggle-btn
  top: -2px;
  width: 2px;
  height: 20px;
  vertical-align: middle;
  display: block;
  background: rgb(52, 52, 52);
} */

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  
  nav button{
    display: inline-block;
  }
  .gnb h1{
    display: block;
    margin: 0 0 1rem 1.5rem;
    font-size: 20px;
    font-weight: bold;
  }
  *{
    /* border: 1px solid red; */
  }
  .gnb {
    z-index: 1001;
    flex-direction: column;
    background-color: #fff;
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100vh;
    padding-top: 80px;
    box-sizing: border-box;
    box-shadow: 0 0 1rem rgb(34, 33, 33);
    transition: 0.5s;
    padding: 10rem 0 0 1rem;
  }
  .gnb.active {
    right: 0;
  }

  .gnb li,
  .gnb .category {
    display: block;
    width: 210px;
    margin: 0.5rem 1em;
  }
  .gnb .category a {
    float:left;
    text-align: start;
    word-break: break-all;
    line-height: 2rem;
    margin:0;
    word-wrap: normal;
  }
  .gnb li.auth{
    margin: 0 0 4rem 0;
  }
  /* .gnb li.auth  */
  .gnb li.auth .auth-btn{
    margin-left: 15px;
    background:transparent;
  }
  .gnb .toggle-btn {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 1001;
    padding: 0;
    background: #fff;
  }
  .gnb button img {
    width: 40px;
    object-fit: cover;
  }
}
</style>