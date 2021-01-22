<template>
  <Transition name="scorebox">
    <div v-if="isLoggedIn" class="score-box">
      <div class="score-box__main">
        <h4 class="score-box__title">Score</h4>
        <span class="score-box__score">{{ user.score }}</span>
      </div>
      <div class="score-box__username">
        <i class="fas fa-user"></i>
        <span> {{ user.name }}</span>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss">
.scorebox-enter-from,
.scorebox-leave-to {
  opacity: 0;
  transform: translate(-100%, -50%);

  @media only screen and (max-width: 900px) {
    transform: translateX(-100%);
  }
}

.scorebox-enter-active,
.scorebox-leave-active {
  transition: all 0.6s;
}

.scorebox-enter-to,
.scorebox-leave-from {
  opacity: 1;
  transform: translate(0, -50%);

  @media only screen and (max-width: 900px) {
    transform: translateX(0);
  }
}
</style>
