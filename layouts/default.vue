<template>
  <div id="app">
    <nuxt />
  </div>
</template>

<script>
export default {
  created () {
    let localStorage = this.$store.state.localStorage
    let locale = localStorage.locale 
      ? localStorage.locale : navigator.language.substring(0, 2)
    let i18n = this.$i18n
    this.$store.commit('localStorage/setLocale', {locale, i18n})
  }
}
</script>

<style>
html {
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
:root {
  --color-pruple: rgb(91, 60, 196);
  --color-yellow: #F0FF24;
  --color-pink: #FC0866;
  --color-cyan: #24F0FF;
  --color-light: white;
  --color-dark: rgb(33, 33, 39);

  --bg-color: var(--color-light);
  --bg-color--t2: rgba(255, 255, 255, 0.2);
  --bg-color--t5: rgba(255, 255, 255, 0.5);
  --bg-color--t8: rgba(255, 255, 255, 0.8);
  --text-color--t05: rgba(0, 0, 0, 0.05);
  --text-color--t2: rgba(0, 0, 0, 0.2);
  --text-color--t5: rgba(0, 0, 0, 0.5);
  --text-color--t8: rgba(0, 0, 0, 0.8);
  --text-color: var(--color-dark);
  --color-primary: var(--color-dark);
  --color-accent: var(--color-pruple);
  --color-accent--t2: rgba(91, 60, 196, .2);
  --color-accent--t5: rgba(91, 60, 196, .5);
  --color-accent--t8: rgba(91, 60, 196, .8);
}
[theme="dark"] {
  --bg-color: black;
  --text-color--t05: rgba(255, 255, 255, 0.05);
  --text-color--t2: rgba(255, 255, 255, 0.2);
  --text-color--t5: rgba(255, 255, 255, 0.5);
  --text-color--t8: rgba(255, 255, 255, 0.8);
  --bg-color--t2: rgba(0, 0, 0, 0.2);
  --bg-color--t5: rgba(0, 0, 0, 0.5);
  --bg-color--t8: rgba(0, 0, 0, 0.8);
  --text-color: var(--color-light);
  --color-primary: var(--color-light);
  --color-accent: var(--color-pink);
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
body {
  padding: 0;
  margin: 0;
}
button {
  color: var(--text-color);
  background: none;
  outline: none;
  border: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}
button:hover {
  cursor: pointer;
}
#app {
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr;
  z-index: 100;
}
h1 {
  font-size: 4rem;
  line-height: 1;
  margin: 0;
  user-select: none;
  opacity: .3;
}
</style>
