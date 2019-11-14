<template>
  <div class="knob">
    <div class="knob_content">
      <slot/>
    </div>
    <canvas 
      :width="`${size}px`" 
      :height="`${size}px`"
    />
  </div>
</template>

<script>
import Timer from 'easytimer.js'
export default {
  name: 'Knob',
  props: {
    size: { type: Number, default: 200 }
  },
  data: () => ({
    arcPercent: 0
  }),
  mounted () {
    this.$el.querySelector('.knob_content').addEventListener('click', e => {
      this.$emit('click', e)
    })
  },
  computed: {
    canvas () { return this.$el.querySelector('canvas') },
    style () { return getComputedStyle(this.$el) },
    percent: {
      get () { return this.arcPercent },
      set (percent) {
        let {canvas, style, size} = this
        let ctx = canvas.getContext('2d')
        let strokeColor = style.getPropertyValue('--color-accent')
        let s = size
        let w = s * .1
        let p = percent * 2
        // Setup canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (p < 2 && p > 0) ctx.lineCap = 'round'
        else ctx.lineCap = 'butt'
        // Draw arc
        ctx.beginPath()
        ctx.arc(s/2, s/2, (s - w)/2, 0, p * Math.PI)
        ctx.lineWidth = w
        ctx.strokeStyle = strokeColor
        ctx.stroke()
        this.arcPercent = percent
      } 
    }
  },
  methods: {
    getRGBA (str, a = 0) {
      let rgb = str.match(/\d+/g)
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`
    }
  }
}
</script>

<style>

.knob {
  height: var(--knob-size, 200px);
  width: var(--knob-size, 200px);
  border-radius: 50%;
  background: var(--color-accent--t2);
  position: relative;
}
.knob_content:hover {
  cursor: pointer;
  z-index: 1;
}
.knob_content>* {
  pointer-events: none;
  user-select: none;
}
.knob_content {
  position: absolute;
  content: "";
  left: 10%;
  top: 10%;
  right: 10%;
  bottom: 10%;
  border-radius: 50%;
  box-shadow: 0 12px 24px -4px var(--color-accent--t2);
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}
.knob canvas {
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transform: rotate(-90deg);
  pointer-events: none;
  user-select: none;
}
</style>