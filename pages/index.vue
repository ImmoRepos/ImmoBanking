<template>
  <div style="height: 100%">
    <div class="text-base">Willkommen, {{ currentAccount.name }}</div>
    <div
      class="
        flex
        justify-center
        items-center
        cursor-pointer
        rounded-lg
        bg-green-500
        hover:bg-green-600
        h-40
        m-9
      "
    >
      <h1 class="text-5xl">Einzahlen</h1>
    </div>
    <div
      class="
        flex
        justify-center
        items-center
        cursor-pointer
        rounded-lg
        bg-red-500
        hover:bg-red-600
        h-40
        m-9
      "
    >
      <h1 class="text-5xl">Abheben</h1>
    </div>
    <div
      class="
        flex
        justify-center
        items-center
        cursor-pointer
        rounded-lg
        bg-yellow-500
        hover:bg-yellow-600
        h-40
        m-9
      "
    >
      <h1 class="text-5xl">Überweisen</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['accounts', 'visible', 'currentAccount']),
  },
  mounted() {},
})
</script>

<style scoped></style>
