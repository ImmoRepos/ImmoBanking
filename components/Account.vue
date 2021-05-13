<template>
  <div
    class="box rounded-full py-3 px-6 select-none"
    :class="isActive ? onClasses : offClasses"
    @click="clickHandler"
  >
    {{ name }}<br />
    IBAN: {{ iban }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    iban: {
      type: String,
      default: '',
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      offClasses: [
        'cursor-pointer',
        'border-dashed border-2',
        'border-gray-400',
        'bg-white',
        'hover:border-gray-600',
        'hover:bg-gray-200',
      ],
      onClasses: [
        'cursor-default',
        'border-solid border-2',
        'border-green-400',
        'bg-white',
      ],
    }
  },
  computed: {
    isActive(): boolean {
      return this.active
    },
  },

  methods: {
    clickHandler() {
      if (this.active) return
      window.dispatchEvent(
        new CustomEvent('setActive', {
          detail: {
            iban: this.iban,
            active: true,
          },
        })
      )
    },
  },
})
</script>

<style scoped>
.box {
  margin-top: 3%;
  color: #000;
  font-size: 0.8em;
  line-height: 1em;
  width: 100%;
}
</style>
