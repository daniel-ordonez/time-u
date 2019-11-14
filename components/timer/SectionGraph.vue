<template>
  <section id="section-graph">
    <scroll-line>
      <div v-for="(item, index) in timerSet" 
        :key="`item-${index}`"
        class="bar"
        :style="`--h: ${item.percent}%`"
      >
        <div
          :rest="item.rest"
          :style="`--p: ${index < itemIndex ? '100' : index === itemIndex ? itemPercent : 0}%`"
        />
      </div>
    </scroll-line>
  </section>
</template>

<script>
import ScrollLine from '~/components/ScrollLine'
export default {
  name: 'SectionGraph',
  components: {ScrollLine},
  props: {
    itemIndex: { type: Number, default: -1 },
    itemPercent: { type: Number, default: 0 }
  },
  computed: {
    timerSet () {
      let set = this.$store.getters['localStorage/timerSet']
      let max = set.reduce((max, item) => item.targetTime > max ? item.targetTime : max, 0)
      return set.map(item => {
        let val = item.targetTime
        let percent = (100.0/max) * val
        return {...item, percent, max}
      })
    },
  }
}
</script>

<style>
#section-graph {
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  height: 200px;
}
#section-graph .bar {
  display: flex;
  align-items: flex-end;
}
#section-graph .bar>div {
  width: 3rem;
  min-height: var(--h, 100%);
  background: var(--text-color--t05);
  position: relative;
}
.bar>div[rest] {
  --color-accent: var(--heart-color, rgb(255, 64, 129));
}
#section-graph .bar>div::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--p, 100%);
  background: var(--color-accent);
  transition: height .6s cubic-bezier(0.39, 0.575, 0.565, 1);
  opacity: .5;
}
</style>