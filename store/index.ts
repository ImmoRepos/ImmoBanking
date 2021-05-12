export const state = {
  accounts: [{}],
  visible: false,
  currentAccount: {},
}

export const mutations = {
  setAccounts(state: { accounts: Object[] }, accounts: Object[]) {
    state.accounts = accounts
  },
  setVisible(state: { visible: boolean }, visible: boolean) {
    state.visible = visible
  },
  setCurrentAccount(state: { currentAccount: Object }, currentAccount: Object) {
    state.currentAccount = currentAccount
  },
  setAccountActive(state: { currentAccount: any }) {
    state.currentAccount.active = true
  },
  disableAllAccounts(state: { accounts: any[] }, newAccount: any) {
    state.accounts.forEach((obj) => {
      if (obj.iban !== newAccount.iban) obj.active = false
    })
  },
}

export const actions = {
  setActive({ commit }: any, newAccount: any) {
    commit('disableAllAccounts', newAccount)
    commit('setCurrentAccount', newAccount)
    commit('setAccountActive')
  },
}

if (process.env.NODE_ENV === 'development') {
  state.accounts = [
    {
      name: 'Polizei Dortmund',
      iban: '11111',
      active: true,
      balance: 2000,
      transactions: [
        {
          from: 'Rettungsdienst Dortmund',
          money: '20000',
          date: '19.09.2020 11:22',
          id: 2,
          positiv: true,
        },
      ],
    },
    {
      name: 'Falk von Mümmelstein',
      iban: '2222',
      active: false,
      balance: 20000000,
      transactions: [
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 3,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 4,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 5,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 6,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 7,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 8,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 9,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 10,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 11,
        },
        {
          from: 'Kachi',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 12,
        },
      ],
    },
  ]
  state.currentAccount = state.accounts[0]
  state.visible = true
}
