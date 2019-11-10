export const state = () => ({
  pages: [
    {name: 'Settings', icon: 'cog'},
    {name: 'Time', icon: 'stopwatch'},
    {name: 'Analytics', icon: 'analytics'},
    {name: 'Saved', icon: 'star'}
  ],
  pageIndex: 1
})
export const mutations = {
  changePage (state, index) {
    if (index >= 0 && index < state.pages.length) {
      state.pageIndex = index
    }
  }
}
export const getters = {
  activePage (state) {
    return state.pages[state.pageIndex]
  }
}
