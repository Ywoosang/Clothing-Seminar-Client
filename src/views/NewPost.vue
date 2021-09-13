<template>
  <div class="wrapper">
    <side-bar></side-bar>
     <section class="content"> 
    <!-- <div>카테고리: {{ category }}</div> -->
    
    <input
      class="title"
      :class="{ required: required.title }"
      type="text"
      v-model="data.title"
      placeholder="제목을 입력해 주세요"
      required
    />
    <input type="file" accept=".pdf" @change="handleFileChange" required />
    <textarea
      class="content"
      :class="{ required: required.content }"
      v-model="data.content"
      placeholder="투고 내용을 입력해 주세요"
    ></textarea>
      <div id="summernote"></div> 
    <button @click="postPost">글 등록</button>
     </section>
  </div>
</template>


<script lang='ts'>
import { onMounted, ref, toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { uploadPost } from "../api/upload";
import SideBar from '../components/SideBar.vue';


export default {
  components: { SideBar },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  setup(props: any) {
    const router = useRouter();
    const store = useStore();
    const { category } = toRefs(props);
    const data = reactive({
      content:"" as any,
      title: ""  as any,
    });
    const required = computed(() => {
      return {
        content: data.content == "",
        title: data.title == "",
      };
    });
    const attachedFile = ref<any>();
    function handleFileChange(e: any) {
      attachedFile.value = e.target.files[0] as File;
    }
    async function postPost() {
      try {
        if (data.title.trim() == "" && data.content.trim() == "") {
          return alert("투고 제목과 투고 내용을 입력해 주세요");
        } else if (data.title.trim() == "" && data.content.trim() !== "") {
          return alert("투고 제목을 입력해 주세요");
        } else if (data.content.trim() == "" && data.title.trim() !== "") {
          return alert("투고 내용을 입력해 주세요");
        }
        if (!attachedFile.value) {
          return alert("투고할 파일을 첨부해 주세요");
        }
        const accept: boolean = confirm(
          `정말로 ${attachedFile.value.name}논문을 투고 하시겠습니까?`
        );
        if (!accept) return;
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("file", attachedFile.value as string | Blob);
        formData.append("category", category.value);
        const response: any = await uploadPost(formData);
        await router.push(`/post/${category.value}?id=${response.data.postId}`);
      } catch (error) {
        if(error.response){
          if(error.response.stauts == 400){
            alert('입력 폼에 오류가 있습니다');
          }
        }
        alert(error);
      }

    }
    onMounted(()=>{
       ($('#summernote') as any).summernote();
    })
    return {
      data,
      category,
      handleFileChange,
      postPost,
      required,
    };
  },
};
</script>

<style scoped>
.required {
  border: 2px solid red;
}
.wrapper {
  flex: 1;
  display: flex;
}
.content {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-left: 3em;
}
.title {
  display: flex;
  align-items: center;
  flex: 1;
  width: 95%;
}
.title h1 {
  font-size: 2.3em;
  font-weight: 500;
}
.title .write{
  margin-left:auto;
  padding: 0.5em 1em;
  background: #ddd;
}

.posts {
  flex: 6;
}
.posts table {
  border: none;
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0 10px;
  table-layout: fixed;
}
.posts table thead tr:first-child {
  background-color: #dcdcdc;
}
.posts table tr {
  border-bottom: 1px solid rgb(119, 119, 119, 0.7);
}
.posts table tr td,
.posts table tr th {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  text-align: center;
  height: 40px;
}
.posts table tr .post-title {
  width: 40%;
}

.pagination {
  flex: 1;
}
.pages {
  margin-top: 2em;
  text-align: center;
}
.pages .page {
  width: 1.1rem;
  display: inline-block;
  margin: 0.2rem;
  height: 1.4rem;
  text-align: center;
  cursor: pointer;
  color: #787878;
}
/* 현재 위치한 페이지 */
.pages .curr {
  color: #000000;
  font-weight: 600;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .category {
    display: none;
  }
  .content {
    padding: 0;
  }
  .posts table {
    width: 100%;
  }
}
</style>