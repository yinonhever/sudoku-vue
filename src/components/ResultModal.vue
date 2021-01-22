<template>
  <div :class="classes">
    <div class="modal__content">
      <h2 class="modal__heading heading--secondary">{{ title }}</h2>
      <BaseButton type="unite" class="modal__button" @click="restartGame">
        Play Again
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    gameFinished() {
      return this.$store.getters.finished;
    },
    success() {
      return this.$store.getters.success;
    },
    classes() {
      let classes = "modal";
      if (this.gameFinished) classes += " display";
      return classes;
    },
    title() {
      return this.success ? "You won!" : "You failed";
    },
  },
  methods: {
    restartGame() {
      this.$store.dispatch("restartGame");
      this.$router.replace("/levels");
    },
  },
};
</script>
