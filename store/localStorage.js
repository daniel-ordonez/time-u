export const state = () => ({
  locales: ['en', 'es'],
  locale: false,
  langs: {
    'en': 'en-US',
    'es': 'es-ES'
  }
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
  }
}
export const getters = {
  lang (state) {
    return state.langs[state.locale]
  },
  timerSet () {
    return [
      { targetTime: 10 },
      { targetTime: 5, rest: true }
    ]
  }
}