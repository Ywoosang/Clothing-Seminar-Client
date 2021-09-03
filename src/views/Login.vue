<template>
<div class="wrapper"> 
    <form @submit.prevent="submit">
        <h1>로그인</h1>
        <input v-model="data.userid" type="userid" placeholder="아이디 입력" required>
        <input v-model="data.password" type="password" autocomplete="new-password" placeholder="비밀번호 입력" required>
        <button type="submit">로그인</button>
    </form>   
    </div>
</template>

<script lang="ts">
import {reactive} from 'vue'; 
import { useRouter } from 'vue-router';
import { useStore  } from 'vuex';
export default {
    name : "Login",
    setup() {
        const store = useStore();
        const router = useRouter();
        const data = reactive({
            userid : '',
            password : ''
        });
        interface LoginResponse extends Response {
            message? : string;
        }
                // because when we send the request to the backend
                // we wil
        const submit = async() => {
            try{
            const response: LoginResponse= await fetch(`${store.state.requestUrl}/login`,{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                credentials : 'include',
                body :  JSON.stringify(data),
                //receive an http only cookie 
                // have to add this option 
                // otherwise we won't get that cookie
            });
            if(response.status == 401){
                // 200 코드일 경우 상태코드만 보내므로
                // json 변환 불가
                const res = await response.json();
                alert(res.message); 
            } else if(response.status == 200){
                await router.push('/'); 
            }
            }catch(e){
                console.log(e);
            }
        }; 
        return {
            data,
            submit 
        }

    }
}
</script>

<style>

</style>