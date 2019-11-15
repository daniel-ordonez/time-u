<template>
  <div id="page-stats">
    <stack class="gap-l">
      <slot name="title"/>
      <div id="heatmap">
        <div v-for="(item, index) in weekdays" 
          :key="`label-${index}`"
          class="heatmap-label"
        >
          {{item}}
        </div>
        <div v-for="(item, index) in monthDays" 
          :key="`item-${index}`"
          :class="{'heatmap-cell': item}"
          :active="stats[item]"
          :today="item === today"
          :style="`--t:${stats[item] ? percent(stats[item]) : ''}`"
        >
        </div>
      </div>
    </stack>
  </div>
</template>

<script>
const { DateTime, Info } = require('luxon')
export default {
  name: 'PageStats',
  data: () => ({
    monthDays: []
  }),
  computed: {
    weekdays () {
      return this.$store.state.localStorage.locale === 'es' 
        ? ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
        : ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
    },
    records () { return [...this.$store.state.localStorage.records] },
    monthRecords () {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      return (this.records || []).filter(i => i.date.year === year && i.date.month === month)
    },
    stats () {
      return this.monthRecords.reduce((list, item) => {
        let k = item.date.day
        list[k] = list[k] ? list[k] + 1 : 1
        return list
      }, {})
    },
    max () { return Object.values(this.stats || {}).reduce((max, value) => value > max ? value : max, 0) },
    today () {
      return new Date().getDate()
    }
  },
  mounted () {
    this.fillMonth()
  },
  methods: {
    percent (v) {
      return (1.0 / this.max) * v
    },
    fillMonth () {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = DateTime.fromObject({year, month, day: 1}).setLocale(this.locale)
      let firstDay = date.weekday
      let daysInMonth = date.daysInMonth
      let d = 1
      this.monthDays = []
      for(let i = 1; i <= 42; i++) {
        if (i < firstDay ||  i > daysInMonth + firstDay - 1) this.monthDays.push(null)
        else {
          this.monthDays.push(d)
          d++
        }
      }
    }
  }
}
</script>

<style>
#page-stats {
  background: var(--bg-color);
  overflow: auto;
  height: 100%;
  --row-size: 3rem;
}
#heatmap {
  display: grid;
  grid-template-columns: repeat(7, minmax(var(--row-size, 3rem), 1fr));
  grid-template-rows: repeat(7, var(--row-size, 3rem));
  margin: auto;
  grid-gap: 2px;
}
.heatmap-cell {
  background: var(--text-color--t05);
  margin: 2px;
  position: relative;
}
.heatmap-cell[active]::after {
  position: absolute;
  content: "";
  background: var(--color-accent);
  opacity: var(--t, 0);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.heatmap-cell[today] {
  border: 2px solid var(--color-accent);
}
.heatmap-cell[today]::before {
  position: absolute;
  content: "";
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 4px solid var(--color-accent);
}
.heatmap-label {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>