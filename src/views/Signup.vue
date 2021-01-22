<template>
  <Page name="auth" id="signup" heading="Sign Up">
    <form :class="classes" @submit.prevent="submitHandler">
      <input
        v-model.trim="formData.name"
        class="form__input"
        type="text"
        placeholder="Name"
        required
        maxlength="15"
      />
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
        minlength="6"
      />
      <input
        v-model.trim="formData.confirmPassword"
        class="form__input"
        type="password"
        placeholder="Confirm Password"
        required
        minlength="6"
      />
      <BaseButton type="fill">Register</BaseButton>
    </form>
    <p class="auth__switch">
      Already have an account?
      <BaseButton type="unite" link="/login">Log in</BaseButton>
    </p>
    <BaseSpinner v-if="loading" />
  </Page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    classes() {
      let classes = "form";
      if (this.error) classes += " error";
      if (this.error === "fail") classes += " fail";
      return classes;
    },
  },
  methods: {
    async submitHandler() {
      if (this.formData.password !== this.formData.confirmPassword) {
        this.error = "error";
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        await this.$store.dispatch("signup", this.formData);
        this.$router.replace("/levels");
      } catch {
        this.error = "fail";
        this.loading = false;
      }
    },
  },
};
</script>
