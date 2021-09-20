<template>
  <div class="select-lang">
    <router-link to="/info/program?lang=ko">Ko</router-link>
    <router-link to="/info/program?lang=en">En</router-link>
  </div>
</template>
<style>
.select-lang {
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -40px;
  border: 1px solid black;
  border-radius: 5px;
  right: 0;
}
.select-lang a {
  font-size: 20px;
  padding: 5px;
}
.select-lang a:first-child {
  border-right: 1px solid black;
}
</style>