<template>
   <article class="title">
      <h1>
        <span style="color: #ff0000">KSC</span> International Conference (KSCIC)
        2021
      </h1>
      <h3>'Fashion for Human, Peace and the Future'</h3>
      <p>October 23, 2021 International Peace Center(and virtual Jeju)</p>
    </article>
</template>

<script>
export default {

}
</script>

<style scoped>
.title {
  font-family: "Heebo", sans-serif;
  white-space: nowrap;
}
.title h1 {
  font-weight: bold;
  font-size: 2.5vw;
  padding: 0.5rem 0;
}
.title h3 {
  font-size: 2vw;
  font-weight: 400;
  color: #c00000;
  padding: 0.5rem 0;
}
.title p {
  font-size: 1.2vw;
  padding: 0.5rem 0;
}
@media all and (max-width: 767px) {
    .title{
        display: none;
    }
}
</style>