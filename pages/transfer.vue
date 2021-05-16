<template>
  <div class="cont">
    <div class="bar">
      <MoneyDisplay
        :value="current.toLocaleString('de', { minimumFractionDigits: 0 })"
      ></MoneyDisplay>
      <fa
        class="backbtn cursor-pointer"
        icon="backspace"
        size="lg"
        @click="back"
      ></fa>
    </div>
    <div class="numbers grid grid-cols-3 justify-items-center">
      <div
        v-for="n in 9"
        :key="n"
        class="
          flex
          justify-center
          items-center
          cursor-pointer
          rounded-lg
          bg-gray-400
          select-none
          hover:bg-gray-600
          w-28
          m-2
          text-4xl
        "
        @click="append(n)"
      >
        {{ n }}
      </div>
      <div
        class="
          flex
          justify-center
          items-center
          cursor-pointer
          rounded-lg
          bg-gray-400
          select-none
          hover:bg-gray-600
          w-28
          m-2
          text-4xl
        "
        @click="append(0)"
      >
        0
      </div>
      <div
        class="
          flex
          justify-center
          items-center
          cursor-pointer
          rounded-lg
          col-span-2
          select-none
          bg-yellow-500
          hover:bg-yellow-600
          m-2
          w-10/12
          text-4xl
        "
        @click="submit"
      >
        <fa icon="paper-plane"></fa>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import MoneyDisplay from '~/components/MoneyDisplay.vue'

export default Vue.extend({
  components: { MoneyDisplay },
  data() {
    return {
      current: 0,
    }
  },
  computed: {
    ...mapState(['currentAccount']),
  },
  methods: {
    append(number: number) {
      if (this.current === 0) this.current = number
      else {
        const n = this.current.toString() + number.toString()
        this.current = parseInt(n)
      }
    },
    back() {
      if (this.current !== 0 && this.current > 10) {
        const n = this.current.toString().slice(0, -1)
        this.current = parseInt(n)
      } else {
        this.current = 0
      }
    },

    submit() {
      if (this.current === 0) return
      if (
        this.$route.query.target === undefined ||
        typeof this.$route.query.target !== 'string'
      )
        return
      if (this.currentAccount.restricted) return
      this.$api.transfer(
        this.current,
        this.currentAccount.iban,
        this.$route.query.target
      )
      this.current = 0
      this.$router.push('/')
    },
  },
})
</script>

<style scoped>
.numbers {
  width: 65%;
  height: 60%;
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cont {
  height: 100%;
}
.bar {
  position: relative;
  top: 4%;
}
.backbtn {
  position: absolute;
  top: 30%;
  left: 90%;
}
</style>
