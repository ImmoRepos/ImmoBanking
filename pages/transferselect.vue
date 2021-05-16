<template>
  <div style="height: 100%">
    <div class="removeable sticky flex justify-center items-center mb-5 w-full">
      <input
        v-model="input"
        class="
          block
          appearance-none
          placeholder-gray-500
          border border-green-400
          rounded-md
          py-3
          px-4
          w-4/6
          text-gray-700
          leading-5
          focus:outline-none
          focus:ring-2 focus:ring-green-200
        "
        placeholder="IBAN"
      />
      <fa
        icon="paper-plane"
        class="plus hover:text-green-700 text-green-500 cursor-pointer"
        size="1x"
        @click="select(input)"
      ></fa>
    </div>
    <div
      class="
        flex flex-col
        justify-start
        items-center
        content-around
        overflow-auto
        scrool
      "
      style="height: 84%"
    >
      <div
        v-for="contact in saved"
        :key="contact.iban"
        class="
          removeable
          cursor-pointer
          rounded-lg
          bg-gray-500
          hover:bg-gray-600
          h-20
          w-5/6
          m-1
          mt-4
          p-1.5
          text-xl
        "
        @click.self="select(contact.iban)"
      >
        <span class="text-2xl">{{ contact.name }}</span> <br />
        IBAN: {{ contact.iban }}
        <fa
          icon="trash"
          class="delete hover:text-red-700"
          size="1x"
          @click="remove(contact.iban)"
        ></fa>
      </div>
      <div
        class="
          flex flex-col
          justify-center
          items-left
          removeable
          rounded-lg
          bg-gray-500
          h-20
          w-5/6
          m-1
          pl-2
          pr-2
          pt-16
          pb-16
          h-28
          text-xl
        "
      >
        <input
          v-model="name"
          class="
            block
            appearance-none
            placeholder-gray-500
            border border-green-400
            rounded-md
            py-3
            px-4
            w-5/6
            text-gray-700
            leading-5
            focus:outline-none
            focus:ring-2 focus:ring-green-200
          "
          placeholder="Name"
        />
        <input
          v-model="iban"
          class="
            block
            appearance-none
            placeholder-gray-500
            border border-green-400
            rounded-md
            py-3
            px-4
            w-5/6
            mt-1
            text-gray-700
            leading-5
            focus:outline-none
            focus:ring-2 focus:ring-green-200
          "
          type="number"
          placeholder="Iban"
        />
        <fa
          icon="plus"
          class="delete hover:text-green-500 cursor-pointer"
          size="1x"
          @click="add"
        ></fa>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      name: '',
      iban: '',
      input: '',
    }
  },
  computed: {
    ...mapState(['currentAccount', 'saved']),
  },
  methods: {
    select(iban: string) {
      if (isNaN(parseInt(iban))) return
      this.$router.push(`/transfer?target=${iban}`)
    },
    remove(iban: string) {
      this.$store.dispatch('removeSaved', iban)
    },
    add() {
      if (this.name === '' || this.iban === '' || isNaN(parseInt(this.iban)))
        return
      this.$store.dispatch('addSaved', { name: this.name, iban: this.iban })
    },
  },
})
</script>

<style scoped>
.removeable {
  position: relative;
}
.delete {
  position: absolute;
  top: 40%;
  left: 90%;
}
.plus {
  position: absolute;
  top: 30%;
  left: 80%;
}
</style>
