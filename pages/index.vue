<template>
  <div class="container">
    <page-timer>
      <template v-slot:title>
        <section id="section-title">
          <h1>Timer</h1>
          <button @click="toggleLocale">
            {{locale}}
          </button>
        </section>
      </template>
    </page-timer>
    <tab-menu></tab-menu>
  </div>
</template>

<script>
import TabMenu from '~/components/TabMenu'
import PageTimer from '~/components/timer/PageTimer'
export default {
  name: 'App',
  components: {
    TabMenu,
    PageTimer
  },
  data: () => ({

  }),
  computed: {
    locale () { return this.$store.state.localStorage.locale.toUpperCase() }
  },
  methods: {
    toggleLocale () {
      this.$store.commit('localStorage/toggleLocale', this.$i18n)
    },
  }
}
</script>

<style>
.container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: grid;
}
#section-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 2rem;
}

#tab-menu {
  grid-area: tools;
}
@media screen and (max-width: 500px){
  .container {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "content"
    "tools";
  }
}
@media screen and (min-width: 500px){
  .container {
    grid-auto-columns: row;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    grid-template-areas: "tools content";
  }
}
</style>
