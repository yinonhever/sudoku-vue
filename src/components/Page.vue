<template>
  <main class="main">
    <section :class="name" :id="id">
      <div :class="`container ${name}__container`">
        <PageHeading :class="`${name}__heading`">
          {{ heading }}
        </PageHeading>
        <slot />
      </div>
    </section>
  </main>
</template>

<script>
import PageHeading from "./PageHeading";

export default {
  components: { PageHeading },
  props: {
    name: String,
    id: String,
    heading: String,
  },
};
</script>
