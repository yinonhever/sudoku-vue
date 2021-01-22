<template>
  <Transition name="logout">
    <button v-if="isLoggedIn" class="button button--logout" @click="logout">
      <i class="fas fa-sign-out-alt" />
    </button>
  </Transition>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
.logout-enter-from,
.logout-leave-to {
  transform: scale(0);
  opacity: 0;
}

.logout-enter-active,
.logout-leave-active {
  transition: all 0.6s;
}

.logout-leave-from,
.logout-enter-to {
  transform: scale(1);
  opacity: 1;
}
</style>
