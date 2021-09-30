<template>
<div id="wrapper"> 
    <title-message/>
    <special-1 v-if="sort == 'special1'"/>
    <special-2 v-if="sort == 'special2'"/>
    <key-note-1 v-if="sort == 'keynote1'"/>
    <key-note-2 v-if="sort == 'keynote2'"/>
    <background/>
</div>
</template>

<script lang="ts">
import TitleMessage from '../components/common/Title.vue'
import KeyNote1 from '../components/KeyNote1.vue';
import KeyNote2 from '../components/KeyNote2.vue';
import Special1 from '../components/Special1.vue';
import Special2 from '../components/Special2.vue'; 
import Background from '../components/common/Background.vue';
import {useRoute} from 'vue-router'; 
import { computed, onMounted } from 'vue';
export default {
    setup() {
        const route = useRoute();
        const sort = route.query.sort as string;
        onMounted(()=>{
          if(sort){
             const title = sort.charAt(0).toUpperCase() + sort.slice(1)
             document.title = `KSCIC > ${title}`
          }
        })
        return {
            sort
        }
    },
    components : {
        KeyNote1,
        KeyNote2,
        Special1,
        Special2,
        TitleMessage,
        Background 
    }

}
</script>

<style>
#wrapper{
    flex:1;
}
#wrapper header{
    background:transparent;
}
#wrapper article{
  display: flex;
  flex-direction: column;
  align-items: center;
}
#wrapper article>header{
  width: 70%;
}
#wrapper article>header p{
  padding: 10px;
  font-size: 2em;
  font-weight: 800;
}
#wrapper .speakers-list{
  margin-top: 2em;
  margin-bottom: 2em;
  width: 70%;
}
#wrapper .speaker{
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 1em;
}
#wrapper .speaker h3{
margin-bottom: 1rem;
line-height: 4rem;
}
#wrapper .speaker p{
   font-size: 20px;
  line-height: 30px;
}
#wrapper .speaker-img{
  flex: 1;
  margin-right: 2em;
}
#wrapper .speaker-img img{
  width: 180px;
}
#wrapper .speaker-body{
  flex: 4;
}
#wrapper .speaker-body h3 {
  /* font-weight: 600; */
}
#wrapper .speaker-body p {
  text-align: justify;
}
#wrapper .btn-wrap{
  width: 70%;
  margin-bottom: 81px;
  text-align: center;
}
#wrapper .btn-wrap button {
  background-color: #787878;
  color: white;
  border-radius: 15px;
  padding: 25px 90px;
  font-size: 2em;
  font-weight: 800;
}

@media (min-width: 768px) and (max-width: 1024px) {
    #wrapper .speaker{
        width: 100%
    }
}

@media (max-width: 767px) {
    #wrapper  header p{
        margin:0;
    }
    #wrapper .speakers-list{    
        margin-top:0;
    }
    #wrapper .speaker{
        flex-direction: column;
        width: 100%
    }    
    #wrapper .speaker-img{
        width: 100%;
        text-align: center;
    }
    #wrapper .speaker-img img{
        width: 80%;
    }
    #wrapper .speaker-body h3{
        margin-top: 1em;
        font-size: 16px;
        line-height: 20px;
    }
    #wrapper .btn-wrap button{
      padding: 15px 50px;
    }
    #wrapper .speaker-body p {
        font-size: 11px;
        line-height: 20px;
    }
}
 
</style>