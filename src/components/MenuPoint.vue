<template>
  <div class="sections-menu">
    <span
      class="menu-point"
      v-bind:class="{ active: active === index - 1 }"
      v-on:click="scrollToRoute(index - 1)"
      v-for="index in length"
      v-bind:key="index"
    >
    </span>
  </div>
</template>

<script>
export default {
  emits: ['changeRoute'],
  props: {
    active: Number,
    length: Number,
  },
  methods: {
    scrollToRoute: function(ndx) {
      this.$emit('changeRoute', 'menu', ndx)
    },
  },
}
</script>

<style scoped>
.sections-menu {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.sections-menu .menu-point {
  width: 10px;
  height: 10px;
  background-color: #fff;
  display: block;
  margin: 1rem 0;
  opacity: 0.6;
  transition: 0.4s ease all;
  cursor: pointer;
}

.sections-menu .menu-point.active {
  opacity: 1;
  transform: scale(1.5);
}
</style>
