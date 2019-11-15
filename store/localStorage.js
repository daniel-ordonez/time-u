export const state = () => ({
  locales: ['en', 'es'],
  locale: false,
  langs: {
    'en': 'en-US',
    'es': 'es-ES'
  },
  records: []
})
export const mutations = {
  setLocale (state, {locale, i18n}) {
    if (state.locales.includes(locale)) {
      state.locale = locale
      i18n.locale = locale
    }
  },
  toggleLocale (state, i18n) {
    state.locale = state.locale === 'en' ? 'es' : 'en'
    i18n.locale = state.locale
  },
  addRecord (state, record) {
    state.records.push(record)
  }
}
export const getters = {
  lang (state) {
    return state.langs[state.locale]
  },
  timerSet () {
    return [
      { targetTime: 10 },
      { targetTime: 5, rest: true },
      { targetTime: 10 },
      { targetTime: 5, rest: true },
      { targetTime: 10 }
    ]
  }
}