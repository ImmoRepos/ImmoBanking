<template>
  <div class="wrapper" :style="visible ? 'display:block' : 'display:none'">
    <div class="grid-container">
      <div class="Main">
        <div class="grid-container2">
          <div class="X flex justify-center items-center pt-1">
            <fa
              v-if="showBack"
              icon="home"
              class="close cursor-pointer mr-2"
              @click="$router.push('/')"
            ></fa>
            <fa
              icon="times"
              size="lg"
              class="close cursor-pointer"
              @click="exit"
            ></fa>
          </div>
          <div class="Money pt-9">
            <MoneyDisplay
              class="counter"
              :value="currentAccount.balance.toString()"
            ></MoneyDisplay>
          </div>
          <div class="Title pt-5"><Logo></Logo></div>
          <div class="Content"><Nuxt /></div>
        </div>
      </div>
      <div class="Side-Select">
        <p>Kontoauswahl</p>
        <hr class="line" />
        <Account
          v-for="account in accounts"
          :key="account.iban"
          :active="account.active"
          :iban="account.iban"
          :name="account.name"
        ></Account>
      </div>
      <div class="Recent">
        <p><fa icon="history" /> Letzte Transaktionen</p>
        <hr class="line" />
        <div class="overflow-auto scrool">
          <Transaction
            v-for="transaction in Array.from(
              currentAccount.transactions
            ).reverse()"
            :key="transaction.id"
            :from="transaction.from"
            :money="transaction.money"
            :date="transaction.date"
            :positiv="transaction.positiv"
          ></Transaction>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Account from '~/components/Account.vue'
import Logo from '~/components/Logo.vue'
import MoneyDisplay from '~/components/MoneyDisplay.vue'
import Transaction from '~/components/Transaction.vue'

export default Vue.extend({
  components: { Account, Logo, MoneyDisplay, Transaction },
  computed: {
    ...mapState(['accounts', 'visible', 'currentAccount']),
    showBack() {
      return this.$route.path !== '/'
    },
  },
  mounted() {
    // Account switch logic
    window.addEventListener('setActive', (event: any) => {
      const acc = this.accounts.find(
        (obj: { iban: String }) => obj.iban === event.detail.iban
      )
      this.$store.dispatch('setActive', acc)
    })

    window.addEventListener('setAccounts', (event: any) => {
      this.$store.commit('SET_ACCOUNTS', event.detail.accounts)
      this.$store.dispatch('setActive', event.detail.accounts[0])
    })

    // Show and hide logic
    window.addEventListener('hide', () => {
      this.$store.commit('SET_VISIBLE', false)
    })
    window.addEventListener('show', () => {
      this.$store.commit('SET_VISIBLE', true)
    })
    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' && this.visible) {
        this.$api.hide()
      }
    })
  },
  methods: {
    exit() {
      this.$api.hide()
    },
  },
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 10px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  transition-duration: 200ms;
}

.wrapper {
  height: 600px;
  width: 900px;
  margin: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  height: 100%;
  width: 100%;
  grid-template-areas:
    'Side-Select Main Main Recent'
    '. Main Main Recent'
    '. Main Main Recent';
}

.Main {
  grid-area: Main;
  background: #252525;
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 15px 15px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  color: #fff;
  position: relative;
}

.Side-Select {
  grid-area: Side-Select;
  background: #757575;
  color: #fff;
  height: 100%;
  width: 100%;
  border-radius: 15px 0px 0px 15px;
  padding: 10px;
  /*box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; */
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.Recent {
  grid-area: Recent;
  background: #585858;
  color: #fff;
  height: 70%;
  width: 100%;
  border-radius: 0px 15px 15px 0px;
  padding: 10px;
  /*box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; */
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.line {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0.1rem 0;
  padding: 0;
}

/*.close {
  position: absolute;
  top: 1%;
  left: 97%;
}*/

.grid-container2 {
  display: grid;
  grid-template-columns: 1fr 1fr 0.1fr 1fr 0.1fr;
  grid-template-rows: 0.01fr 0.6fr 0.3fr 3.5fr;
  height: 100%;
  gap: 0px 0px;
  padding: 0px 8px;
  grid-template-areas:
    'Title Title Money Money X'
    'Title Title Money Money .'
    'Content Content Content Content Content'
    'Content Content Content Content Content';
}

.X {
  grid-area: X;
}

.Money {
  grid-area: Money;
}

.Title {
  grid-area: Title;
}

.Content {
  grid-area: Content;
}

.scrool {
  height: 88%;
  scrollbar-width: thin;
  scrollbar-color: dark;
}
</style>
