<template>
  <div
    class="
      text-white text-base
      border-solid border-2
      rounded-lg
      p-1
      m-2
      select-text
    "
  >
    <h1 class="text-sm">{{ from }}</h1>
    <hr />
    <h1 :class="positiv ? 'text-green-300' : 'text-red-300'">
      {{ positiv ? '+' : '-' }} {{ money }}€
    </h1>
    <p class="text-xs text-gray-200">{{ date }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    money: {
      type: String,
      default: '0',
    },
    from: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    positiv: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style></style>
