<template>
  <auth>
    <section class="title">
      <div class="logo">
<<<<<<< HEAD
        <img src="/img/logo.png" />
=======
         <img class="auth-logo" src="/img/logo.png">
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      </div>
      <div class="des">
        <h1>한국복식학회에 오신 것을 환영합니다!</h1>
      </div>
    </section>
    <section class="content">
      <h1>로그인</h1>
      <form @submit.prevent="submit">
        <div class="input-wrapper">
          <label for="id"
<<<<<<< HEAD
            ><span style="width: 5em; text-align: end">아이디</span>
=======
            ><span class="label-text">아이디</span>
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
            <input
              v-model="data.userid"
              id="id"
              type="userid"
              placeholder="10자 이하 영문/숫자"
              required
            />
          </label>
          <label for="password"
<<<<<<< HEAD
            ><span style="width: 5em; text-align: end">비밀번호</span>
=======
            ><span  class="label-text">비밀번호</span>
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
            <input
              v-model="data.password"
              id="password"
              type="password"
              autocomplete="new-password"
              placeholder="15자 이내 영문/숫자/특수문자"
              required
            />
          </label>
        </div>
        <button class="submit" type="submit">LOG-IN</button>
      </form>
<<<<<<< HEAD
      <div class="tab">
        <button class="route-tab">회원가입</button>
      </div>
=======
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      <img src="/img/background-logo.png" />
    </section>
  </auth>
</template>

<script lang="ts">
import Auth from "../components/common/Auth.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LoginResponse } from "../types/type";
import { login } from "../api/auth";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      userid: "",
      password: "",
    });
    const submit = async () => {
      // 폼검증 필요
      try {
         
        const response = await login(data);
        const jwt = response.data.accessToken;  
        if(!jwt){
          return alert('Login Error');
        } 
        localStorage.removeItem("jwt"); 
        localStorage.setItem("jwt",jwt); 
        await router.push("/");
      } catch (error) {
        if (error.response) {
          if (error.response.status == 401) {
            alert(error.response.data.message);
          } else {
            console.log("Error");
          }
        } else {
          console.log("Error", error.message);
        }
      }
    };
    return {
      data,
      submit,
    };
  },
  components: { Auth },
};
</script>
 