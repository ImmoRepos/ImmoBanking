const BASE_URL = 'http://immobanking/'

export class API {
  constructor() {
    window.addEventListener('message', (event) => {
      const eventType = event.data.event
      if (
        eventType !== undefined &&
        typeof this['on' + eventType] === 'function'
      ) {
        this['on' + eventType](event.data)
      }
    })
  }

  async post(method, data) {
    const ndata = data === undefined ? '{}' : JSON.stringify(data)
    const response = await window.jQuery.post(BASE_URL + method, ndata)
    return JSON.parse(response)
  }

  hide() {
    window.dispatchEvent(new CustomEvent('hide'))
    this.post('hide')
  }

  withdraw(amount, iban) {
    this.post('withdraw', { amount, iban })
  }

  deposit(amount, iban) {
    this.post('deposit', { amount, iban })
  }

  transfer(amount, iban, target) {
    this.post('transfer', { amount, iban, target })
  }

  onShow() {
    window.dispatchEvent(new CustomEvent('show'))
  }

  onAccounts(data) {
    window.dispatchEvent(
      new CustomEvent('setAccounts', { detail: { accounts: data.accounts } })
    )
  }
}

export default (_, inject) => {
  const wraper = new API()
  inject('api', wraper)
}
