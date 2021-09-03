<template>
  <div class="wrapper">
    <div>카테고리: {{ category }}</div>
    <input class="title" :class="{ required : required.title }" type="text" v-model="data.title" placeholder="제목을 입력해 주세요" required />
    <input type="file" accept=".pdf" @change="handleFileChange" required/>
    <textarea class="content"  :class="{ required : required.content }" v-model="data.content" placeholder="투고 내용을 입력해 주세요"></textarea>
    <button @click="postPost">글 등록</button>
  </div>
</template>


<script lang='ts'>
import { onMounted, ref,toRefs,reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  // category, title, content,created_at
  props: {
      category : {
          type: String,
          required: true
      }
  },  setup(props :any){
        const router = useRouter();
        const store = useStore();
        const { category } = toRefs(props);
        
        const data = reactive({
            content : '',
            title : ''
        })
        const required = computed(()=> {
            return {
                content : data.content == '',
                title:  data.title == ''
            }
        })
        const attachedFile = ref<any>();
        function handleFileChange(e: any) {
            attachedFile.value = e.target.files[0] as File;
        }
        async function postPost() {
            if(!attachedFile.value) {
                alert('투고할 파일을 첨부해 주세요');
            };
            const accept: boolean = confirm(
                `정말로 ${attachedFile.value.name  }논문을 투고 하시겠습니까?`
            );
            if (!accept) return;
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("file", attachedFile.value as string | Blob);
            formData.append("category", category.value  );
            let response: any = await fetch(`${store.state.requestUrl}/post`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            if(response.ok) response = await response.json();
            router.push(`/post/${category.value}?id=${response.id}`); 
        }
        return {
            data,
            category,
            handleFileChange,
            postPost,
            required
        };
  }
  
};
</script>

<style scoped>
.wrapper {
  flex: 1;
}
.title{

}
.content{

}
.required{
    border:2px solid red;

}
</style>