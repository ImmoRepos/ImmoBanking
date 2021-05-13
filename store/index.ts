export const state = {
  accounts: [{}],
  visible: false,
  currentAccount: {
    name: 'Polizei Dortmund',
    iban: '11111',
    active: true,
    restricted: true,
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
  saved: JSON.parse(window.localStorage.ib_saved || '[]'),
}

export const mutations = {
  SET_ACCOUNTS(state: { accounts: Object[] }, accounts: Object[]) {
    state.accounts = accounts
  },
  SET_VISIBLE(state: { visible: boolean }, visible: boolean) {
    state.visible = visible
  },
  SET_CURRENT(state: { currentAccount: Object }, currentAccount: Object) {
    state.currentAccount = currentAccount
  },
  SET_ACTIVE(state: { currentAccount: any }) {
    state.currentAccount.active = true
  },
  DISABLE_ALL(state: { accounts: any[] }, newAccount: any) {
    state.accounts.forEach((obj) => {
      if (obj.iban !== newAccount.iban) obj.active = false
    })
  },
  SET_SAVED(state: { saved: Object[] }, newSaved: Object[]) {
    state.saved = newSaved
  },
}

export const actions = {
  setActive({ commit }: any, newAccount: any) {
    commit('DISABLE_ALL', newAccount)
    commit('SET_CURRENT', newAccount)
    commit('SET_ACTIVE')
  },
  addSaved({ commit, state }: any, { name, iban }: any) {
    const newArr = Array.from(state.saved)
    newArr.push({ name, iban })
    window.localStorage.ib_saved = JSON.stringify(newArr)
    commit('SET_SAVED', newArr)
  },
  removeSaved({ commit, state }: any, iban: String) {
    const newArr = state.saved.filter(
      (el: { iban: String }) => el.iban !== iban
    )
    window.localStorage.ib_saved = JSON.stringify(newArr)
    commit('SET_SAVED', newArr)
  },
}

if (process.env.NODE_ENV === 'development') {
  state.accounts = [
    {
      name: 'Polizei Dortmund',
      iban: '11111',
      active: true,
      restricted: true,
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
          from: 'Stahl',
          money: '500000000',
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
          from: 'Laa',
          money: '3300000',
          date: '19.09.2020 11:22',
          positiv: false,
          id: 12,
        },
      ],
    },
  ]
  state.currentAccount = {
    name: 'Polizei Dortmund',
    iban: '11111',
    active: true,
    restricted: true,
    balance: 2000,
    transactions: [
      {
        from: '1234',
        money: '20000',
        date: '19.09.2020 11:22',
        id: 2,
        positiv: true,
      },
    ],
  }
  state.visible = true
  // state.saved = [
  //  { iban: '123213', name: 'Opfer' },
  //  { iban: '454564', name: 'Opfer2' },
  //  { iban: '884512', name: 'Opfer3' },
  // ]
}
