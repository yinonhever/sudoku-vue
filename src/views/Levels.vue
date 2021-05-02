<template>
  <Page name="level-choice" :heading="`Hello, ${name}`">
    <div class="level-choice__content">
      <h3 class="level-choice__subheading">Pick a level:</h3>
      <div class="level-choice__buttons">
        <LevelButton v-for="level in levels" :key="level" :level="level" />
      </div>
    </div>
  </Page>
</template>

<script>
import LevelButton from "../components/LevelButton";

export default {
  components: { LevelButton },
  computed: {
    name() {
      return this.$store.getters.user.name;
    },
    levels() {
      return Array.from({ length: 3 }, (_, i) => i + 1);
    },
  },
};
</script>
