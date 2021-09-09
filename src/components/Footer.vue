<template>
  <footer>
      <div class="text-wrapper f-left">
          <p>KSC international conferance</p>
          <p>2020. 10. 23</p>
          <p>Copyright ©KSCT. All Right Reserved.</p>
      </div>
      <div class="text-wrapper f-right">
          <p>(사) 한국복식학회 (04175)서울특별시 마포구 마포대로 12(마포동) 한신빌딩 1616호</p>
          <p>사무국 : 02-324-1511 / ksfsm@ksc.or.kr</p>
          <p>학술국 : 070-8289-1712 / ksc@ksc.or.kr</p>
          <p>홈페이지 : <a style="color: white" href="http://www.ksc.or.kr">http://www.ksc.or.kr</a></p>
      </div>
  </footer>
</template>

<style scoped>
footer{
    display: flex;
    justify-content: center;
    background-color: #787878;
    color: white;
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
}

/* 미디어쿼리 사용 */
@media screen and (max-width: 768px) { 
  footer{
      padding:0;
  }
  footer .text-wrapper p{
      font-size: 0.5em;
  }
  footer .f-right{
      display: none;
  }
}
</style>