<template>
<!-- 페이지 새로고침 방지 -->
<div class="wrapper"> 
    <form @submit.prevent="submit">
        <h1>회원가입</h1>
        <input v-model="data.username" class="name" type="text" placeholder="이름 입력" required>
        <input v-model="data.userid" class="id" type="text" placeholder="아이디 입력" autocomplete="false" required>
        <input v-model="data.email" class="email" type="email" placeholder="이메일 입력" autocomplete="false" required>
        <input v-model="data.password" class="password" type="password" placeholder="비밀번호 입력" autocomplete="current-password" required>
        <button type="submit">회원가입</button>
    </form>   
</div>
</template>

<script>
import {reactive} from 'vue'; 
import {useRouter } from 'vue-router'; 
import {useeStore, useStore} from 'vuex';
export default {
    name: "Register",
    setup(){
        // form 과 양방향 바인딩
        const data = reactive({
            username : '',
            userid: '',
            email : '',
            password: ''
        });
        const router = useRouter();
        const store = useStore();
        const submit = async() => {
            const response = await fetch(`${store.state.requestUrl}/register`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify(data),
            }); 
            if(response.status ==200 ){
                await router.push('/login');
            } else {
                alert('입력에 오류가 있습니다');
            }
        };
        return {
            data,
            submit
        };
    }
}
</script>

<style>

</style>