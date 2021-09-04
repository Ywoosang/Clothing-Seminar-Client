<template>
  <Nav/>
  <router-view/>
  <Footer/>
</template>

<script>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
export default {
  components: { Nav, Footer },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* Reset CSS */
* {
  font-family: 'Noto Sans', sans-serif;
}
html {
  height:100%;
}

body{
  height:100%;
  display: flex;
  flex-direction: column;
  font-size : 15px;
  margin : 0;
  color : #222;
  line-height: 1.5rem; 
  font-weight : normal;
}

a {
  text-decoration: none;
  color : #222;
}

h1,h2,h3,h4,h5,h6{
  margin : 0;
  font-weight: normal;
}

input, button, textarea {
  outline: none;
}

button {
  border: none;
  cursor : pointer; 
}

ul{
  list-style : none;
}

/* vue app */
#app{
  height:100%;
  display: flex;
  flex-direction: column;
}
</style>