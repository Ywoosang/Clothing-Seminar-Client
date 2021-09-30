<template>
  <div class="wrapper">
    <welcom-msg-ko v-if="lang == 'ko'" />
    <welcom-msg-en v-if="lang == 'en'" />
    <background/>
  </div>
</template>

<script lang="ts">
import WelcomMsgEn from "../components/Program.en.vue";
import WelcomMsgKo from "../components/Program.kr.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Background from '../components/common/Background.vue';

export default {
  setup() {
    const route = useRoute();
    const lang = computed(() => route.query.lang);
    return {
      lang,
    };
  },
  components: {
    WelcomMsgEn,
    WelcomMsgKo,
    Background,
  },
};
</script>
<style scoped>
.wrapper {
  flex:1;
}

/* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
@media all and (min-width: 768px) and (max-width: 1023px) {
}
/* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
</style>