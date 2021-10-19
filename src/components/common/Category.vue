<template>
  <li class="category" v-for="category in categories" :key="category">
    <router-link
      :class="{ curr: category == currentCategory }"
      :to="'/presentation/poster/' + category + '?page=1'"
      >{{ category }}</router-link
    >
  </li>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();
    let currentCategory = computed(() => store.state.category);
    const categories = store.state.categories;
    return {
      currentCategory,
      categories,
    };
  },
};
</script>
<style scoped>
.curr {
  color: #ea2d2e;
}
</style>