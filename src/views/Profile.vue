<template>
  <div class="wrapper">
    <router-link v-if="admin" to="/admin">멤버 관리</router-link>
    <div>사용자 이름: {{ username }}</div>
    <div>사용자 아이디: {{ userId }}</div>
    <div>권한: {{ authority }}</div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const username = ref<string>();
    const authority = ref<string>();
    const userId = ref<string>();
    const admin = computed(() => authority.value == "ADMINISTRATOR");
    onMounted(async () => {
      await store.dispatch("setUserInfo");
      username.value = store.state.username;
      userId.value = store.state.userId;
      authority.value = store.state.authority;
    });

    return {
      admin,
      username,
      authority,
      userId,
    };
  },
};
<<<<<<< HEAD
</script>
=======
</script>
<style scoped> 
.wrapper{
  flex:1;
}
</style> 
>>>>>>> 3cd0120336db02c9e633af1078963de10d85cfa0
