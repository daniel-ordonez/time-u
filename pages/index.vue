<template>
  <div class="container">
    <tab-menu/>
    <div id="page-wrapper" :style="`--transition-direction: ${pageDirection}`">
      <transition name="page-slide">
        <page-timer v-if="pageName === 'time'" :key="'page-index'">
          <template v-slot:title>
            <section id="section-title">
              <h1>{{$t(`page.${pageName}`)}}</h1>
              <button @click="toggleLocale">
                {{locale}}
              </button>
            </section>
          </template>
        </page-timer>
        <page-stats v-else :key="'page-stats'">          
          <template v-slot:title>
            <section id="section-title">
              <h1>{{$t(`page.${pageName}`)}}</h1>
              <button @click="toggleLocale">
                {{locale}}
              </button>
            </section>
          </template>
        </page-stats>
      </transition>
    </div>
  </div>
</template>

<script>
import TabMenu from '~/components/TabMenu'
import PageTimer from '~/components/timer/PageTimer'
import PageStats from '~/components/stats/PageStats'
export default {
  name: 'App',
  components: {
    TabMenu,
    PageTimer,
    PageStats
  },
  data: () => ({

  }),
  computed: {
    locale () { return this.$store.state.localStorage.locale.toUpperCase() },
    pageName () { return this.$store.getters.pageName },
    pageDirection () { return this.$store.state.pageDirection }
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
#page-wrapper {
  position: relative;
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
    grid-template-rows: auto 1fr;
    grid-template-areas: "tools"
    "content";
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
.page-slide-enter-active {
  animation: page-slide .5s cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
  z-index: 1000;
}
.page-slide-leave-active {
  --direction: -1;
  animation: page-slide .2s cubic-bezier(0.215, 0.610, 0.355, 1) reverse;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@keyframes page-slide {
  from {
    transform: translateY(calc( var(--transition-direction, 1) * var(--direction, 1) *  20vh ));
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media screen and (max-width: 500px) {
  @keyframes page-slide {
    from {
      transform: translateX(calc( var(--transition-direction, 1) * var(--direction, 1) *  20vh ));
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
