<template>
   <div class="wrapper">
      <presentation-title>
           <h1>Comments on KSCIC 2021</h1>
      </presentation-title>
      <main>
          <section class="register">
              <div class="input-wrapper">
                  <div class="des">
                      <input type="text" v-model="name" placeholder="이름"> 
                      <input type="text" v-model="password" placeholder="비밀번호 (4자리 숫자)">
                  </div>
                      <textarea v-model="content" class="content" placeholder="학술대회에 대한 의견들을 자유롭게 남겨주세요."></textarea>
              </div>
              <button class="submit-review" @click="postReview">후기<br>작성</button>
          </section>

          <section class="reviews">
            <div class="review" v-for="(review,index) in reviews" :key="index">
                <div class="des">
                    <h3>윤우상 2020.11.29 12:12</h3>
                    <button class="delete" @click="deleteReview(index)">삭제</button>
                </div>
                <div class="content">
                    <pre>{{review.content}}</pre>
                </div>
            </div>
          </section>
          <nav class="pagination">
                <router-link :class="{ selected: page == currentPage }" :to="'/review' + '?page=' + page" v-for="page in pages" :key="page">
                    {{ page }} 
                </router-link>
          </nav>
      </main>
      <background/>
  </div>
</template>

<script lang="ts">
import Background from '../components/common/Background.vue'
import PresentationTitle from '../components/common/PresentationTitle.vue'
import {computed, onMounted, ref, watch } from 'vue';
import {useStore } from 'vuex';
import { useRoute} from 'vue-router'; 
import * as request from '../api/review';

export default {
  components: { PresentationTitle, Background },
  setup(){
      const route = useRoute();
      const name = ref<string>("");
      const password = ref<any>();
      const content = ref<string>("");
      const totalReviews = ref<any[]>([]);
      const pages = ref<any[]>([]);
      const reviewsPerPage:number = 5;
      const postReview = async() => {
          if(!name.value || !password.value || !content.value){
              return alert('정보를 모두 입력해주세요'); 
          }
          const review = {
              name: name.value,
              password: password.value,
              content: content.value
          }
          try{
            const response = await request.postReview(review);
            totalReviews.value.unshift(review); 
            setPageNumber(); 
            setPageReviews(); 
          } catch(error){
              if(error.response){
                  if(error.response.status == 400){
                      alert(error.response.data.message); 
                  } else {
                      alert(error.response.status); 
                  }
              }
          }
        
      }
      // 후기 가져오기
      const reviews = ref<any[]>(); 
      const currentPage = computed(()=> route.query.page);
      const setPageReviews = () =>{
            const pageNumber = currentPage.value as any;
            const startIndex: number = reviewsPerPage*( pageNumber-1);
            const endIndex: number = reviewsPerPage*pageNumber;
            reviews.value=  totalReviews.value.slice(startIndex,endIndex);   
      }
      watch(currentPage,(oldValue,newValue) => {
            setPageReviews();
      });

      const setPageNumber = () => {
          const tmpNumber: number = totalReviews.value.length/reviewsPerPage;
          const numberOfPages =  Math.floor(tmpNumber) == tmpNumber ? Math.floor(tmpNumber) : Math.floor(tmpNumber)+ 1;
          pages.value = Array(numberOfPages|| 1).fill(0).map((el,index)=> index +1);
      }
      
      
      const deleteReview = async(index:number) => {
          const clientPassword = prompt('비밀번호를 입력해 주세요');
          try{
          console.log(totalReviews.value[index].id);
          const response = await request.deleteReview({
              reviewId: totalReviews.value[index].id,
              password: clientPassword,
          });
          alert(response.data.message);
          totalReviews.value.splice(index,1); 
          // 제거한 요소를 담은 배열. 하나의 요소만 제거한 경우 길이가 1인 배열을 반환합니다. 아무 값도 제거하지 않았으면 빈 배열을 반환합니다. 
          setPageNumber();
          setPageReviews();
          }catch(error){
              if(error.response){
                  if(error.response.status == 401){
                    alert(error.response.data.message); 
                  }
              }
          }
      }

      onMounted(async ()=> {
          const response = await request.getReviews();
          totalReviews.value = response.data.reviews;
          setPageReviews();
          setPageNumber();
      });
      return {
          name,
          password,
          content,
          reviews,
          postReview,
          pages,
          totalReviews,
          currentPage,
          deleteReview
      }
  }
}
</script>

<style scoped> 
.wrapper{
    flex:1;
}
.title h1{
    text-align: center;
    font-size: 2.5rem;
}
/* 컴포넌트 */
main{
    min-height: 40rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.register{
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    width:60%;
}
.register .input-wrapper{
    flex:1;
}
.register .input-wrapper .des{
    display: flex;
     padding-bottom: 1rem;
     flex:1;
}
.register .input-wrapper .des input{
    flex:1;
    flex-basis: 0;
    min-width: none;
    border: 1px solid #787878;
}
.register .input-wrapper .des input:first-child{
    margin-right: 10px;
}
.register .input-wrapper .content{
    width: 100%;
    height: 8rem;
    resize:none;
    border: 1px solid #787878;
}
.register .submit-review{
    margin-left: 2rem;
    background: #787878;
    color: white;
    line-height: 1.65rem;
    width: 6.5rem;
}
/*  */
.reviews{
    width:60%;
    overflow-x: auto;
}
.review{
    background: #EBEBEB;
    padding: 1rem;
    border-radius: 8px;
    display: grid;
    width: max-content;
    height:auto; 
    margin-bottom: 1rem;
}
.review .des{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.review .des h3{
    font-size: 1.5rem;
    margin-right: 1rem;
}
.review .des .delete{
    background-color: #DCDCDC;
    height: 3rem;
}
.review .content{
    width: 100%;
}
.review .content pre{
    background: transparent;
    font-family: 'Noto Sans', sans-serif;
    font-size: 1.5rem;
    padding:0;
    width: 100%;
}

/* 페이지 기능 */
.pagination{
    margin-top: auto;
}
.pagination{
    display: flex;
}
.pagination a{
    width: 2rem;
    height:2rem;
    font-size: 2rem;
    text-align: center;
    line-height: 2rem;
    margin: 0 0.5rem 0 0;
}
.pagination a:last-child{
    margin:0; 
}
.pagination a.selected{
    color:red !important; 
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
  
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
   .register{
       width: 90%;
   }
   .reviews{
        width: 90%;
   }
   .register .input-wrapper .des input{
    /* width:0; */
    width:0;
    border: 1px solid #787878;
}
}
</style>
 