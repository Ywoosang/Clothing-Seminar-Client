<template>
  <div class="wrapper">
       <div>카테고리: {{ category }}</div>
      <input type="text" v-model="title" required> 
      <input type="file" accept=".pdf" 
      @change="handleFileChange" required>
      <textarea  v-model="content"></textarea>
      <button @click="postPost">글 등록</button>
  </div>
</template>

<script>
export default {
    // category, title, content,created_at
    props : ['name'],
    data(){
        return {
            category: this.name,
            file : "",
            title: "",
            content : "",
        }
    },
    methods: {
        postPost(){
            const accept = confirm(`정말로 ${this.file.name}논문을 투고 하시겠습니까?`);
            if(!accept) return;
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('content',this.content)
            formData.append('file',this.file);
            formData.append('category',this.name);
            fetch(`${this.$store.state.requestUrl}/post`,{
        method: 'POST',
                body : formData,
                 credentials : 'include',        
            })
            .then(response=> response.json())
            .then(res=> {
                this.$router.push(`/post/${this.name}?id=${res.id}`);
            })
            .catch(error=> console.log(error)); 
        },
        handleFileChange(e){
            this.file = e.target.files[0];
        }
    }
    

}
</script>

<style scoped>
.wrapper{
    flex:1;
}

</style>