<template>
  <Page name="auth" id="login" heading="Log in to start the game">
    <form :class="classes" @submit.prevent="submitHandler">
      <input
        v-model.trim="formData.email"
        class="form__input"
        type="email"
        placeholder="Email Address"
        required
      />
      <input
        v-model.trim="formData.password"
        class="form__input"
        type="password"
        placeholder="Password"
        required
      />
      <BaseButton type="fill">Enter</BaseButton>
    </form>
    <p class="auth__switch">
      Don't have an account yet?
      <BaseButton type="unite" link="/signup">Sign Up</BaseButton>
    </p>
    <BaseSpinner v-if="loading" />
  </Page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      loading: false,
      error: false,
    };
  },
  computed: {
    classes() {
      let classes = "form";
      if (this.error) classes += " error";
      return classes;
    },
  },
  methods: {
    async submitHandler() {
      this.loading = true;
      this.error = false;
      try {
        await this.$store.dispatch("login", this.formData);
        this.$router.replace("/levels");
      } catch {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>
