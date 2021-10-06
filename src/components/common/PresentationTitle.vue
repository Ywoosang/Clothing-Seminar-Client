<template>
   <section class="title">
      <article>
        <div class="image-wrapper">
          <img src="/img/logo.png" />
        </div>
        <slot></slot>
      </article>
    </section>
</template>

<style scoped>
.title {
  flex:2;
  margin: 5rem 0;
  padding-top: 2rem;
}
.title article {
  height: 15rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
/* 이미지 */
.title article .image-wrapper {
  width: 100%;
  padding:0;
  height: 80%;
  position: relative;
}
.title article .image-wrapper img {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  height: 100%;
  object-fit: contain;
}
</style>