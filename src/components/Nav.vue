<template>
  <nav>
    <router-link class="home" to="/">홈</router-link>
    <div class ="auth" v-if="!auth">
      <router-link class="signin" to="/login">로그인</router-link>
      <router-link class="signup" to="/register">회원가입</router-link>
    </div>
    <div class="auth" v-if="auth">
      <router-link to="/profile">프로필</router-link> 
      <a href="#" class="nav-link logout" @click="logout">로그아웃</a>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Nav",
  setup() {
    const store = useStore();
    const router = useRouter();
    const auth = store.state.authenticated;
    const logout = async () => {
      const response = await fetch(`${store.state.requestUrl}/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if(response.status == 200){
          await router.push(`/login`);
      }
    }
    return {
      // data 처럼 사용 가능
      auth,
      logout
    }
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #BBBDC0;
  height: 48px !important;
}
nav a {
  color: rgb(44, 44, 44);
  font-weight: 500;
  font-size: 1.3em;
}
nav .home{
}
nav .auth {
}
nav .signup{
}
nav .signin{
  margin-right: 1em;
}
nav .logout{
}
</style>