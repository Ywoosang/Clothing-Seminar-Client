<template>
<div class="wrapper"> 
    <section class="title">
      <div class="logo">
         <img class="auth-logo" src="/img/logo.png">
      </div>
      <div class="des">
        <h1>한국복식학회에 오신 것을 환영합니다!</h1>
      </div>
    </section>
    <section class="content">
      <h1 class="des">관리자 로그인</h1>
      <form @submit.prevent="submit">
        <div class="input-wrapper">
          <label for="id"
            ><span class="label-text">아이디</span>
            <input
              v-model="data.userId"
              id="id"
              type="userid"
              placeholder="발급받은 아이디"
              required
            />
          </label>
          <label for="password"
            ><span  class="label-text">비밀번호</span>
            <input
              v-model="data.password"
              id="password"
              type="password"
              autocomplete="new-password"
              placeholder="발급받은 비밀번호"
              required
            />
          </label>
        </div>
        <button class="submit" type="submit">LOG-IN</button>
      </form>
      <div class="space"></div>
      <img src="/img/background-logo.png" />
    </section>
  </div>
</template>

<script lang="ts">
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
      userId: "",
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
          if (error.response.status == 401 || error.response.status == 400) {
            alert(error.response.data.message);
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
};
</script>
<style scoped>
.wrapper{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em 0;
}
.title .logo {
  height: 8vh;
  position: relative;
  margin-bottom: 0.5em;
}
.title .logo .auth-logo{
  height: 8vh;
  top:0; 
  position: absolute;
  object-fit: contain;
}
 .title .des {
  flex:1;
}
 .title .des h1 {
  font-weight: 500;
  font-size: 1em;
}
.content { 
  border: 1px solid #AAAAAA;
  width: 55%;
  position:relative;
  overflow: hidden;
}
img{
  position:absolute;
  left:5%;
  bottom:-20%;
  height: 110%;
}
.content h1 {
  box-sizing: border-box;
  padding: 3rem;
  height: 11rem;
}
.content form {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
}
.content form .input-wrapper {
  display: flex;
  flex:1;
  max-width: 60%;
  flex-direction: column;
  margin-right: 3%;
}
.content form .input-wrapper label {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 2rem;
  flex:1;
  line-height: 3.5rem;
  min-width: 25rem;
  margin-bottom: 1.5em;
  /* min-width: 15em; */
}
.content form .input-wrapper label:last-child {
  margin-bottom: 0;
}
.content form .input-wrapper label input {
  border: 1px solid #AAAAAA;
  height: 3.5rem;
  margin-left: 0.5em;
  font-weight: normal;
  font-size: 1.5rem;
  flex: 1;
}
.content form .submit {
    background-color: #AAAAAA;
    padding: 0 1em;
    font-size: 1em;
}
.content form .input-wrapper label .label-text{
  width: 4.3em; 
  text-align: end;
}
.content .space{
  box-sizing: border-box;
  height: 11rem;
}
 

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
    .content form{
     display: flex;
     flex-direction: column;
   }
    .content form .input-wrapper{
     margin:0 0 3em 0;
      max-width: none;
   }
    .content form .submit{
       height: 2.5em;
   }
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .content{
    width: 90%;
  }
  .content form{
     display: flex;
     flex-direction: column;
   }
  .content form .input-wrapper{
     margin:0 0 3em 0;
      max-width: none;

   }
    .content form .submit{
       height: 2.5em;
   }

}
</style>
 