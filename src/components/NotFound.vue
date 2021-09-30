<template>
  <div class="wrapper">
      <main>
      <h1>Page Not Found</h1>
      <button @click="goHomePage">Return to Home</button> 
      </main> 
      <background/>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'; 
import Background from './common/Background.vue';

export default {
  components: { Background },
    props: {
        message : {
            type: String,
            required : true,
        }
    },
    setup() {
        const router = useRouter();
        const goHomePage = () =>{
            return router.push('/'); 
        }
        return {
            goHomePage 
        }
    }

}
</script>

<style scoped>
.wrapper{
    flex:1;
}
main {
    margin-top: 8rem;
    text-align: center;
}
main h1{
    margin: 0 3rem;
}
main button{
    margin-top: 4rem;
    width: 20rem;
    height: 5rem;
}



</style>