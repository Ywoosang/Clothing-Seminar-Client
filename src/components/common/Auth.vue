<template>
  <div id="auth">
      <slot/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
*{
  /* border: 1px solid red;  */
}
#auth {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#auth .title {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em 0;
}
#auth .title .logo {
  height: 8vh;
  position: relative;
  margin-bottom: 0.5em;
}
#auth .title .logo .auth-logo{
  height: 8vh;
  top:0; 
  position: absolute;
  object-fit: contain;
}
#auth  .title .des {
  flex:1;
}
#auth  .title .des h1 {
  font-weight: 500;
  font-size: 1em;
}
#auth .content { 
  border: 1px solid #AAAAAA;
  width: 55%;
  position:relative;
  overflow: hidden;
}
#auth img{
  position:absolute;
  left:5%;
  bottom:-20%;
  height: 110%;
}
#auth .content h1 {
    padding: 1.5em;
}
#auth .content form {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 6em;
  padding: 0 1em;
}
#auth .content form .input-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: 3%;
}
#auth .content form .input-wrapper label {
  display: flex !important;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 1rem;
  flex:1;
  line-height: 2rem;
  min-width: 25rem;
  margin-bottom: 1.5em;
  /* min-width: 15em; */
}
#auth .content form .input-wrapper label:last-child {
  margin-bottom: 0;
}
#auth .content form .input-wrapper label input {
  border: 1px solid #AAAAAA;
  height: 2rem;
  margin-left: 0.5em;
  flex: 1;
}
#auth .content form .submit {
    background-color: #AAAAAA;
    padding: 0 1em;
    font-size: 1em;
}
#auth .content form .input-wrapper label .label-text{
  width: 4.3em; 
  text-align: end;
}
 

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
     #auth .content form{
     display: flex;
     flex-direction: column;
   }
    #auth .content form .input-wrapper{
     margin:0 0 3em 0;
   }
    #auth .content form .submit{
       height: 2.5em;
   }
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
@media all and (max-width: 767px) {
  #auth .content{
    width: 90%;
  }
   #auth .content form{
     display: flex;
     flex-direction: column;
   }
   #auth .content form .input-wrapper{
     margin:0 0 3em 0;
   }
     #auth .content form .submit{
       height: 2.5em;
   }

}
</style>