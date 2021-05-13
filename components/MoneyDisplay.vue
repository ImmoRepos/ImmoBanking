<template>
  <div
    class="
      flex
      justify-center
      items-center
      money-bg
      text-green-700 text-4xl
      rounded-lg
      filter
      brightness-200
      object-right-top
    "
  >
    {{ value }} €
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '0',
    },
  },
})
</script>

<style>
.money-bg {
  background-color: #1d1d1d;
  padding: 1rem;
  margin: 1rem;
}
</style>
