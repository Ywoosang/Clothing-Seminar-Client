<template>
  <!-- 페이지 새로고침 방지 -->
 <auth>
      <section class="title">
      <div class="logo">
        <img src="/img/logo.png" />
      </div>
      <div class="des">
        <h1>한국복식학회에 오신 것을 환영합니다!</h1>
      </div>
    </section>
    <section class="content">
      <h1>회원가입</h1>
      <form @submit.prevent="submit">
        <div class="input-wrapper">
          <label for="name"
            ><span style="width: 5em; text-align: end;">이름</span>
            <input
              v-model="data.username"
              id="name"
              type="text"
              placeholder="10자 이하 영문/숫자"
              required
            />
          </label>
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
      <div class="tab">
        <button class="route-tab">로그인</button>
      </div> 
      <img src="/img/background-logo.png">
    </section>
 </auth>
</template>

<script>
import Auth from "../components/common/Auth.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useeStore, useStore } from "vuex";
import { register } from '../api/auth';
export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const store = useStore(); 
    // form 과 양방향 바인딩
    const data = reactive({
      username: "",
      userid: "",
      email: "",
      password: "",
    });
    const submit = async () => {
      try{
        await register(data);
        await router.push("/login"); 
      }catch (error) {
        console.log(error);
        alert("입력에 오류가 있습니다"); 
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