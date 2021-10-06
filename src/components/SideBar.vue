<template>
   <section class="category">
      <h1>Poster Session</h1>
      <article>
        <router-link
          v-for="category in categories"
          :key="category"
          :class="{ curr: category == currentCategory }"
          :to="'/presentation/poster/' + category+'?page=1'"
          >{{ category }}</router-link
        >
      </article>
    </section>
</template>

<script lang="ts">
import { useStore } from 'vuex'; 
import {computed} from 'vue';

export default {
    setup(){
        const store = useStore();
        let currentCategory = computed(()=> store.state.category);
        const categories = store.state.categories; 
        return {
            currentCategory,
            categories
        }
    }
}
</script>

<style scoped>
.category {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 3px solid #a1a1a1;
  margin: 2rem 0;
  padding: 0 1em 0 5vw;
  box-sizing: border-box;
}

.category h1 {
  margin-top: 2em;
  margin-bottom: 1em;
}

.category article {
  max-width: 200px;
}
.category article a {
  display: block;
  color: #787878;
  margin: 1em 0;
}
.category article .curr {
  color: #ea2d2e !important;
}
</style>