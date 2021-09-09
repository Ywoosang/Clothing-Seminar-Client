<template>
  <!-- 페이지 새로고침 방지 -->
<<<<<<< HEAD
 <auth>
      <section class="title">
      <div class="logo">
        <img src="/img/logo.png" />
=======
  <auth>
    <section class="title">
      <div class="logo">
        <img class="auth-logo" src="/img/logo.png" />
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      </div>
      <div class="des">
        <h1>한국복식학회에 오신 것을 환영합니다!</h1>
      </div>
    </section>
    <section class="content">
      <h1>회원가입</h1>
      <form @submit.prevent="submit">
        <div class="input-wrapper">
<<<<<<< HEAD
          <label for="name"
            ><span style="width: 5em; text-align: end;">이름</span>
=======
          <label for="name">
            <span class="label-text">이름</span>
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
            <input
              v-model="data.username"
              id="name"
              type="text"
              placeholder="10자 이하 영문/숫자"
              required
            />
          </label>
<<<<<<< HEAD
          <label for="id"
            ><span style="width: 5em; text-align: end;">아이디</span>
            <input
              v-model="data.userid"
              id="id"
              type="text"
              placeholder="10자 이하 영문/숫자"
              required
            />
          </label>

           <label for="email"
            ><span style="width: 5em; text-align: end;">이메일</span>
            <input
              v-model="data.email"
              id="id"
              type="email"
              placeholder="10자 이하 영문/숫자"
              required
            />
          </label>
          
          <label for="password"
            ><span style="width: 5em; text-align: end;">비밀번호</span>
=======
          <label for="id">
            <span  class="label-text">아이디</span>
            <input v-model="data.userid" id="id" type="text" placeholder="10자 이하 영문/숫자" required />
          </label>

          <label for="email">
            <span  class="label-text">이메일</span>
            <input v-model="data.email" id="id" type="email" placeholder="10자 이하 영문/숫자" required />
          </label>

          <label for="password">
            <span class="label-text">비밀번호</span>
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
        <button class="submit" type="submit">SIGN-UP</button>
      </form>
<<<<<<< HEAD
      <div class="tab">
        <button class="route-tab">로그인</button>
      </div> 
      <img src="/img/background-logo.png">
    </section>
 </auth>
=======
      <img src="/img/background-logo.png" />
    </section>
  </auth>
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
</template>

<script>
import Auth from "../components/common/Auth.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useeStore, useStore } from "vuex";
<<<<<<< HEAD
import { register } from '../api/auth';
=======
import { register } from "../api/auth";
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
export default {
  name: "Register",
  setup() {
    const router = useRouter();
<<<<<<< HEAD
    const store = useStore(); 
=======
    const store = useStore();
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
    // form 과 양방향 바인딩
    const data = reactive({
      username: "",
      userid: "",
      email: "",
<<<<<<< HEAD
      password: "",
    });
    const submit = async () => {
      try{
        await register(data);
        await router.push("/login"); 
      }catch (error) {
        console.log(error);
        alert("입력에 오류가 있습니다"); 
=======
      password: ""
    });
    const submit = async () => {
      try {
        await register(data);
        await router.push("/login");
      } catch (error) {
        if (error.response) {
          if (error.response.status == 416) {
            alert(error.response.data.errorMessage);
          } else {
            alert("Error");
          }
        }
        console.log(error);
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      }
    };
    return {
      data,
<<<<<<< HEAD
      submit,
    };
  },
  components: { Auth },
=======
      submit
    };
  },
  components: { Auth }
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
};
</script>