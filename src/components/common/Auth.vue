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
#auth {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#auth .title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em 0;
}
#auth .title .logo {
  margin-top: 2vh;
}
#auth .title .logo img {
  object-fit: contain;
  height: 8vh;
}
#auth  .title .des {
}
#auth  .title .des h1 {
  font-weight: 500;
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
    padding: 2em;
}
#auth .content form {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 1em 0;
}
#auth .content form .input-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: 3%;
  width: 40%;
}
#auth .content form .input-wrapper label {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  line-height: 2rem;
  margin-bottom: 2em;
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
#auth .content .tab {
    display: flex;
    justify-content: center;
    margin: 4em 0 3em 0;
}
#auth .content .tab .route-tab {
    outline: none;
    background-color: #AAAAAA;
    padding: 0.4em 0;
    font-size: 1.2em;
    width: 28%;
}
</style>