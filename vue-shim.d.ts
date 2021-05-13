import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

interface API {
  post(method: string, data: object): void
  hide(): void
  withdraw(amount: number, iban: string): void
  deposit(amount: number, iban: string): void
  transfer(amount: number, iban: string, target: string): void
}

declare module '@nuxt/types' {
  interface Context {
    $api: API
  }

  interface NuxtAppOptions {
    $api: API
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: API
  }
}
