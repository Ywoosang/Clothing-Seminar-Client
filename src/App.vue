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
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fahkwang:wght@600;700&display=swap');
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
a{
  color:#222;
}
a:hover{
  color: #222;
}
a:focus{
  color: #222;
  text-decoration: none;
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
  margin:0;
  madding:0;
}

/* vue app */
#app{
  height:100%;
  width:100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
 
button.slick-prev, button.slick-next{
  display: none !important;
}

.content .post-content p img{
  object-fit: contain;
  width: 90%;
}

@media (max-width: 767px) {
 .content .post-content p img{
  object-fit: contain;
  width: 100%;
}

}
</style>