const BASE_URL = 'http://ImmoBanking/'

class API {
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
