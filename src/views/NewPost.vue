<template>
  <div class="wrapper">
    <side-bar></side-bar>
    <section class="content">
      <h1>게시글 작성</h1>
      <div class="register">
        <button @click="postPost">작성 완료</button>
      </div>
      <div class="input-wrapper">
        <label class="des" for="title">제목</label>
        <input
          type="text"
          id="title"
          v-model="title"
          placeholder="제목을 입력해 주세요"
          required
        />
      </div>
        <div class="input-wrapper">
        <label class="des" for="owner">작성자</label>
        <input
          type="text"
          id="owner"
          v-model="copyrightHolder"
          placeholder="작성자를 입력해 주세요"
          required
        />
      </div>
      <div class="category">
        <label class="des" for="title">게시판</label>
        <select id="title" v-model="selected">
          <option disabled value="">카테고리를 선택해 주세요</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="attach">
        <div class="attach-des">파일 첨부</div>
        <div class="attach-wrapper">
          <div class="buttons">
            <button @click="imageAttach">이미지 첨부</button>
            <button @click="pdfAttach">PDF 첨부</button>
          </div>
          <ul class="filename">
            <li>{{ filename }}</li>
            <li>{{ imageFileName }}</li>
          </ul>
        </div>
      </div>
      <input
        type="file"
        style="display: none"
        accept=".pdf"
        id="file"
        @change="handleFileChange"
        required
      />
      <form method="post">
        <textarea id="summernote" name="editordata"></textarea>
      </form>
    </section>
  </div>
</template>


<script lang='ts'>
import { onMounted, ref, toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { uploadPost,uploadPostImage,uploadPostPdf } from "../api/upload";
import SideBar from "../components/SideBar.vue";

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
    const title = ref<string>("");
    const selected = ref<string>(""); 
    const filename = ref<string>("");
    const imageFileName = ref<string>("");
    const copyrightHolder = ref<string>(""); 
    const attachedFile = ref<any>();

    function handleFileChange(e: any) {
      filename.value = e.target.files[0].name;
      attachedFile.value = e.target.files[0] as File;
    }
    store.commit("SET_CATEGORY", category);
    const categories = store.state.categories;
    async function postPost() {
      try {
        const accept: boolean = confirm(
          `정말로 논문을 투고 하시겠습니까?`
        );
        if (!accept) return;
        const content = (document.getElementById("summernote") as HTMLTextAreaElement).value;
        const data = {
          title : title.value,
          content : content,
          category : selected.value,
          copyrightHolder: copyrightHolder.value
        }

        const response: any = await uploadPost(data);
        const postId = response.data.postId;
        if(attachedFile.value){
            const data = new FormData();
            data.append('file',attachedFile.value); 
            data.append('postId',postId); 
            await uploadPostPdf(data);
            alert('논문 투고가 완료 되었습니다');
            await router.push(`/post/${category.value}?id=${postId}`);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.stauts == 400) {
            alert(error.response.data.message);
          } else {
            alert(error.response.status)
          }
        }
      }
    }
    onMounted(() => {
      ($("#summernote") as any).summernote({
        height: 500,
        toolbar: [
          ["fontname", ["fontname"]],
          ["fontsize", ["fontsize"]],
          ["style", ["bold", "italic", "underline", "strikethrough", "clear"]],
          ["color", ["forecolor", "color"]],
          // ['para', ['ul', 'ol', 'paragraph']],
          // ['height', ['height']],
          ["insert", ["picture"]],
        ],
        callbacks: {
          onImageUpload: async function (files: File[]) {
            // upload image to server and create imgNode...
            try{
              console.log(files);
              const data = new FormData();
              data.append('file',files[0]);
              const response = await uploadPostImage(data); 
              const imgNode = `<p><img style="object-fit:contain;" src="${response.data.url}"></p>`;
              imageFileName.value = files[0].name;
              const editor = document.querySelector('.note-editable')
              if(editor){
                editor.innerHTML += imgNode; 
              } 
            } catch(error){
              alert('이미지 업로드에 문제가 발생했습니다');
            }
          },
        },
      });
    });
    const imageAttach = () => {
      const imageButton = document.querySelector(
        ".note-insert button"
      ) as HTMLButtonElement;
      imageButton.click();
    };
    const pdfAttach = () => {
      const pdfButton = document.querySelector("#file") as HTMLButtonElement;
      pdfButton.click();
    };
    return {
      handleFileChange,
      postPost,
      imageAttach,
      pdfAttach,
      filename,
      imageFileName,
      categories,
      selected,
      title,
      copyrightHolder
    };
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.wrapper {
  flex: 1;
  display: flex;
}
.content {
  margin: 2em 10vw 0 0;
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-left: 3em;
}
.content .register {
  height: 2em;
  margin-bottom: 1em;
  border-bottom: 2px solid #a1a1a1;
}
.content .register button {
  padding: 5px;
  box-sizing: border-box;
  float: right;
}

.content .input-wrapper,
.content .category {
  display: flex;
  align-items: center;
}
.content .input-wrapper {
  margin-bottom: 0.3em;
}
.content .des {
  width: 4.5em;
  font-weight: 500;
}
.content div input,
.content div select {
  background: #ffffff;
  border: 1px solid #000000;
  flex: 1;
}
.content .attach {
  display: flex;
  margin: 0.5em 0;
}
.content .attach .attach-des {
  width: 4.5em;
  font-weight: 500;
}
.content .attach .attach-wrapper {
  flex: 1;
}
.content .attach .attach-wrapper .buttons {
}
.content .attach .attach-wrapper .buttons button {
  margin: 0 0.5em 0 0;
  background-color: #ebebeb;
  padding: 5px;
}
.content .attach .attach-wrapper .filename {
  border: 1px solid #000000;
  margin: 0.5em 0;
  padding:0 0.5em;
  height: 3em;
}
.content .attach .attach-wrapper .filename li{
  margin: 0.3em 0;
}


/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  .category{
    display: none;
  }
}
</style>