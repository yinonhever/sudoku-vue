<template>
  <Page name="level-choice" :heading="`Hello, ${name}`">
    <div class="level-choice__content">
      <h3 class="level-choice__subheading">Pick a level:</h3>
      <div class="level-choice__buttons">
        <LevelButton :level="1" />
        <LevelButton :level="2" />
        <LevelButton :level="3" />
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
  },
};
</script>
