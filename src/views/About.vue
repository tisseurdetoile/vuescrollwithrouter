<template>
  <section>
    <h1>Inspired by</h1>
    <p class="badge">
      by
      <a href="https://webdeasy.de/?referer=cp-NVOEBL" target="_blank"
        >WebDEasy</a
      >
    </p>
  </section>
</template>

<script>
export default {
  name: 'About',
  components: {},
  methods: {
    onIntersectionElement(value) {
      // value will be true when the component is visible on the page
      console.log(value)

      // you can do whatever you want
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  background-color: blue;
}
</style>
