<template>
  <footer>
<<<<<<< HEAD
      <div class="f-left">
=======
      <div class="text-wrapper f-left">
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
          <p>KSC international conferance</p>
          <p>2020. 10. 23</p>
          <p>Copyright ©KSCT. All Right Reserved.</p>
      </div>
<<<<<<< HEAD
      <div class="f-right">
=======
      <div class="text-wrapper f-right">
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
          <p>(사) 한국복식학회 (04175)서울특별시 마포구 마포대로 12(마포동) 한신빌딩 1616호</p>
          <p>사무국 : 02-324-1511 / ksfsm@ksc.or.kr</p>
          <p>학술국 : 070-8289-1712 / ksc@ksc.or.kr</p>
          <p>홈페이지 : <a style="color: white" href="http://www.ksc.or.kr">http://www.ksc.or.kr</a></p>
      </div>
<<<<<<< HEAD
      <div style="width: 15%"></div>
  </footer>
</template>

<script>
export default {

}
</script>

=======
  </footer>
</template>

>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
<style scoped>
footer{
    display: flex;
    justify-content: center;
    background-color: #787878;
    color: white;
<<<<<<< HEAD
    padding: 1em;
}
footer div{
    margin: 0 0.5em;
}
 
footer div p{
    margin:-3px;
=======
    padding: 1em !important;
}
footer .text-wrapper{
    display: flex;
    flex-direction: column;
    margin: 0 0.1em;
}
 
footer .f-right p{
    margin:0;
    padding:0;
    font-size: 0.4em;
    line-height: 2em;
}
footer .f-left{
    margin-right: 1%;;
}
footer .f-left p{
    margin:0;
    padding:0;
    font-size: 0.9em;
    line-height: 1.2em;
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
}

/* 미디어쿼리 사용 */
@media screen and (max-width: 768px) { 
  footer{
      padding:0;
  }
<<<<<<< HEAD
  footer div p{
      font-size: 0.5em;
  }
  .f-right{
=======
  footer .text-wrapper p{
      font-size: 0.5em;
  }
  footer .f-right{
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
      display: none;
  }
}
</style>