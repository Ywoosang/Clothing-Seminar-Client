<template>
    <img class="background-logo" src="/img/background-logo.png"> 
</template>

<style scoped>
.wrapper .background-logo, #wrapper .background-logo {
  z-index: -1;
  position: fixed;
  left: 8vw;
  bottom: 0;
  height: 80%;
}
/* 모바일 가로, 모바일 세로(해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
 .wrapper .background-logo, #wrapper .background-logo {
  left: 2rem;
   height: 60%;
  bottom: 0;
}
}
</style>