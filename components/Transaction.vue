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
    <h1 class="text-sm">{{ getFromName }}</h1>
    <hr />
    <h1 :class="positiv ? 'text-green-300' : 'text-red-300'">
      {{ positiv ? '+' : '-' }} {{ money }}€
    </h1>
    <p class="text-xs text-gray-200">{{ date }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
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
  computed: {
    ...mapState(['saved']),
    getFromName() {
      const val: any = Array.from(this.saved).find((el: any) => {
        return el.iban === this.from
      })
      return val === undefined ? this.from : val.name
      // return this.from
    },
  },
})
</script>
