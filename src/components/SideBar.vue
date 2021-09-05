<template>
   <section class="category">
      <h1>포스터 발표</h1>
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
        const currentCategory = computed(()=>store.state.category);
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-right: 3px solid #a1a1a1;
  margin: 2rem 0;
}

.category h1 {
  margin-top: 4em;
  margin-bottom: 1em;
  width: 13.5rem;
}

.category article {
  width: 13.5rem;
}
.category article a {
  display: block;
  color: #787878;
  margin: 1em 0;
}
.category article .curr {
  color: #ea2d2e;
}
</style>