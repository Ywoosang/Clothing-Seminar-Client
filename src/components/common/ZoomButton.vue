<template>
  <div class="btn-wrap">
    <a :href="link">Participate</a>
  </div>
</template>

<script lang="ts">
export default {
    props: {
        link: {
            type: String
        }
    },
    setup(props:any){
        const link = props.link;
        return {
            link
        }
    }

}
</script>

<style scoped>
.btn-wrap {
  width: 70%;
  /* width: 800px; */
  margin-bottom: 81px;
  margin-top: 30px;
  text-align: center;
}
.btn-wrap a {
  background-color: #787878;
  color: white !important;
  border-radius: 15px;
  padding: 25px 90px;
  font-size: 2em;
  font-weight: 800;
}

@media (max-width: 767px) {
  .btn-wrap a {
    padding: 15px 50px;
  }
}
</style>