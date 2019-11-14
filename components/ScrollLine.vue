<template>
  <div class="scroll-line">
    <slot/>
  </div>
</template>

<script>
import ScrollBooster from 'scrollbooster'
export default {
  name: 'ScrollLine',
  data: () => ({
    scroll: null
  }),
  mounted () {
    const viewport = this.$el
    const content = this.$el
    const sb = new ScrollBooster({
      viewport,
      content,
      onUpdate: (data)=> {
        viewport.scrollLeft = data.position.x
      }
    })
    this.scroll = sb
  }
}
</script>

<style>
.scroll-line {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  grid-auto-columns: min-content;
  overflow-x: scroll;
  height: 100%;
  padding: 1rem 0;
  box-sizing: content-box;
  margin-bottom: 2rem;
}
.scroll-line>*:first-child {
  margin-left: 2rem;
}
.scroll-line>*:last-child {
  margin-right: 2rem;
}
</style>