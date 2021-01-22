<template>
  <RouterLink v-if="link" :to="link" :class="classes">
    <slot />
  </RouterLink>
  <button v-else :class="classes">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    link: String,
  },
  computed: {
    classes() {
      let classes = "button bttn-primary";
      if (this.type) classes += ` bttn-${this.type}`;
      return classes;
    },
  },
};
</script>
