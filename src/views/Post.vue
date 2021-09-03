<template>

<div class="wrapper"> 
  <h1>카테고리: {{category }}</h1>
  <h1>{{ post.title }}</h1> 
  <div>작성일{{ post.created_at }}</div>
  <div class="file">
      <div> 
      {{ post.filename }}
      </div>
      <a :href="requestUrl"><b>논문 보기</b></a>
  </div>
  <div v-if ="modified">(수정됌)</div>
  <div>{{ post.content }}</div>
  <div>작성자{{ post.username }}({{ post.userid }})</div>
  <button v-if="hasDeleteAuthority" @click="deletePost">삭제하기</button> 
   <button id="show-modal" @click="showModal = true">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
   <Modal v-if="showModal" @close="showModal = false">
       {{ message }}
      <button @click="showModal = false">확인</button>
      <button v-if="isConfirm" @click="showModal = false">취소</button>
  </Modal>
  <Comment :postid="postId"/>
</div> 
</template>

<script lang="ts">
import Comment from '../components/Comment.vue';
import Modal from '../components/common/Modal.vue'; 

import { onMounted,ref,reactive,computed,  } from 'vue';
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router";
 
export default {
    props : {
        name : {
            type : String,
            required : false, 
        }
    },
    // before created 이전 - this 에 접근이 불가
    // props 가 가장 많이 쓰이기 때문에 props 를 제일 첫 번째로 
    setup(props: any){
        const category = computed(()=> props.name); 
      
        const store = useStore();
        const route = useRoute();
        const router = useRouter(); 
        // 
        interface Post {
            title : string,
            content : string,
            userid : string,
            created_at : string,
            updated_at : string,
            filename : string,
        }  
        const postId = reactive<any>(route.query.id);
        const requestUrl = reactive<any>(`${store.state.requestUrl}/post/${ route.query.id }/view`);
        // 모달
        const isConfirm = ref<boolean>(false); 
        const showModal = ref<boolean>(false);  
        const post: any = ref<any>({
            title : "",
            content : "",
            userid : "",
            created_at: "",
            updated_at: "",
            filename : "",
        });
        onMounted(async()=>{
             // 사용자 정보 세팅 
            await store.dispatch('setUserInfo');
            try{
                const response: any = await fetch(`${store.state.requestUrl}/post/${postId}`,{
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials : 'include',
                });
                if(response.status==200){
                    const res = await response.json();
                    console.log('포스트',res.post);
                    post.value = res.post; 
                } else {
                    throw new Error('Page Not Found');
                }
            }catch(error){
                console.log(error);
                await router.push(`/404`); 
            }
        }); 
        // 
        const modified = computed(()=> {
            return post.value.created_at !== post.value.updated_at; 
        })
        const hasDeleteAuthority  = computed(() => {
            const userId = store.state.userId;
            const authority = store.state.authority;
            return authority == "ADMINISTRATOR" || userId == post.value.userid;
        });
        // 
        const deletePost = async() => {
            const data = { postId };
            const comfirmDelete = confirm(`정말로 ${post.value.title} 를 삭제하시겠습니까?`);
            if(!comfirmDelete) return alert('삭제를 취소합니다');
            try{
                let response:any = await fetch(`${store.state.requestUrl}/post/${postId}`,{
                    method: 'DELETE',
                    headers: {'Content-Type' : 'application/json'},
                    credentials : 'include',
                    body : JSON.stringify(data)
                });
                if(response.ok){
                    alert('삭제되었습니다');
                    await router.push(`/presentation/poster/${category.value}`);
                } else if(response.status == 403) {
                    throw new Error('권한이 없습니다');
                } else {
                    throw new Error('올바르지 못한 접근입니다'); 
                }
            } catch (error) {
                alert(error.message);
            }
        }
        console.log(post);
        return {
            post,
            postId,
            modified,
            requestUrl,
            category,
            deletePost,
            hasDeleteAuthority,
            showModal 
        }
    }, 
    // computed: {
    //     createdDate : function(){
    //         const curr = new Date(this.createdAt);
    //         const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    //         const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    //         const kr_curr = new Date(utc + (KR_TIME_DIFF));
    //         const year = kr_curr.getFullYear();
    //         const month = (kr_curr.getMonth() +1);
    //         const day = kr_curr.getDate();
    //         const hours = kr_curr.getHours();
    //         const minutes = kr_curr.getMinutes();
    //         const seconds = kr_curr.getSeconds(); 
    //         return `${ year}-${month}-${ day } ${hours}:${minutes}:${seconds}`;
    //     },
    // },
    components : {
        Comment,
        Modal
    }
}
</script>

<style scoped>
.wrpaper{
    flex:1;
}
</style>
