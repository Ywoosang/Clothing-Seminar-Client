<template>
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
      <h1>로그인</h1>
      <form @submit.prevent="submit">
        <div class="input-wrapper">
          <label for="id"
            ><span style="width: 5em; text-align: end;">아이디</span>
            <input
              v-model="data.userid"
              id="id"
              type="userid"
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
        <button class="submit" type="submit">LOG-IN</button>
      </form>
      <div class="tab">
        <button class="route-tab">회원가입</button>
      </div> 
      <img src="/img/background-logo.png">
    </section>
   </auth>
</template>

<script lang="ts">
import Auth from '../components/common/Auth.vue'; 
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LoginResponse } from '../types/type';

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
      try {
        const response: LoginResponse = await fetch(
          `/api/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
            //receive an http only cookie
            // have to add this option
            // otherwise we won't get that cookie
          }
        );
        if (response.status == 401) {
          // 200 코드일 경우 상태코드만 보내므로
          // json 변환 불가
          const res = await response.json();
          alert(res.message);
        } else if (response.status == 200) {
          await router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    };
    return {
      data,
      submit,
    };
  },
  components: {Auth}
};
</script>
 