export const state = () => ({
  pages: [
    {name: 'time', icon: 'stopwatch'},
    {name: 'stats', icon: 'analytics'}
  ],
  pageIndex: 0,
  pageDirection: 1
})
export const mutations = {
  changePage (state, key) {
    if (typeof key === 'number') {
      let index = key
      if (index >= 0 && index < state.pages.length) {
        state.pageDirection = Math.sign(index - state.pageIndex)
        state.pageIndex = index
      }
    } else if (typeof key === 'string') {
      let index = state.pages.findIndex(p => p.name === key )
      if (typeof index === 'number') {
        state.pageDirection = Math.sign(index - state.pageIndex)
        state.pageIndex = index
      }
    }
  }
}
export const getters = {
  activePage (state) {
    return state.pages[state.pageIndex]
  },
  pageName (_, getters) {
    return getters.activePage.name
  }
}
