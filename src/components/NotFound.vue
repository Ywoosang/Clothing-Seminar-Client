<template>
  <div>
      <h1>페이지가 존재하지 않습니다</h1>
      <button @click="goHomePage">목록으로 돌아가기</button>  
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'; 

export default {
    props: {
        message : {
            type: String,
            required : true,
        }
    },
    setup() {
        const router = useRouter();
        const goHomePage = () =>{
            return router.push('/presentation/poster'); 
        }
        return {
            goHomePage 
        }
    }

}
</script>

<style>

</style>