<template>
  <BaseButton type="pill" class="button--level" @click="startGame">
    {{ level }}
  </BaseButton>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  methods: {
    startGame() {
      this.$store.dispatch("startGame", this.level);
      this.$router.replace("/game");
    },
  },
};
</script>
