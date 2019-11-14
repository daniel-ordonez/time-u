<template>
  <section id="section-timer" :resting="timerRest">
    <div class="timer-tools">

      <div class="timer-option">
        <transition name="button-pop">

          <button v-if="timerActive"
            key="button-pause"
            class="btn--icon" @click="pauseTimer">
            <i class="uil uil-pause"></i>
          </button>
          <button v-else-if="timerPaused"
            key="button-play"
            class="btn--icon" @click="resumeTimer">
            <i class="uil uil-play"></i>
          </button>
          
        </transition>
      </div>

      <div class="timer-count" >
        <transition name="button-pop">
          <heart v-if="timerRest" 
            key="heart"
            :style="`--heart-size: ${knobSize}px`"
          >
            <slot/>
          </heart>
          <knob v-else ref="knob" 
            key="knob"
            :style="`--knob-size: ${knobSize}px`"
            :size.sync="knobSize"
            @click="$emit('click')"
          >
            <slot/>
          </knob>
        </transition>
      </div>

      <div class="timer-option">
        <transition name="button-pop">
          
          <button v-if="timerActive"
            key="button-pause"
            class="btn--icon" @click="skipTimer">
            <i class="uil uil-skip-forward-alt"></i>
          </button>
          <button v-else-if="timerPaused"
            key="button-play"
            class="btn--icon" @click="stopTimer">
            <i class="uil uil-square"></i>
          </button>

        </transition>
      </div>

    </div>
  </section>
</template>

<script>
import Knob from './Knob'
import Heart from './Heart'
import Timer from 'easytimer.js'
export default {
  name: 'SectionTimer',
  components: { Knob, Heart },
  props: {
    timerOptions: { type: Object, default: () => ({}) }
  },
  data: () => ({
    knobSize: 200,
    secondsCount: 0,
    timer: null,
    timerActive: false,
    timerPaused: false
  }),
  computed: {
    currentTimer () { return this.timerOptions },
    timerRest () { return this.currentTimer.rest },
    targetTime () { return this.currentTimer.targetTime || 0 },
    countdown () { return Math.max(0, this.targetTime - this.secondsCount ) }
  },
  mounted () {
    const timer = new Timer()
    timer.addEventListener('started', e => { this.timerActive = true; this.timerPaused = false; })
    timer.addEventListener('paused', e => { this.timerActive = false; this.timerPaused = true; })
    timer.addEventListener('stopped', e => { this.timerActive = false; this.timerPaused = false; })
    timer.addEventListener('secondsUpdated', e => {
      let {seconds} = timer.getTimeValues()
      this.countSeconds(seconds)
    })
    this.timer = timer
  },
  methods: {
    startTimer () {
      if (this.timer) {
        this.secondsCount = 0
        let {knob} = this.$refs
        knob && (knob.percent = 1)
        this.$emit('started', this.currentTimer)
        setTimeout(() => {
          this.timer && this.timer.start()
        }, 1000)
      }
    },
    pauseTimer () {
      if (this.timer) {
        this.timer.pause()
        this.$emit('paused')
      }
    },
    resumeTimer () {
      if (this.timer) {
        this.$emit('resumed')
        setTimeout(() => {
          this.timer.start()
        }, 1000)
      }
    },
    timeout () {
      this.$emit('timeout')
    },
    countSeconds (seconds) {
      let {targetTime} = this
      this.secondsCount = seconds
      if (seconds >= targetTime) {
        this.timer.stop()
        setTimeout(this.timeout, 1000)
      }
      let percent = 1.0 - ((1.0 / Math.max(targetTime, 1)) * seconds)
      this.$emit('countdown', {countdown: this.countdown, percent})
      this.updateKnob(percent)
    },
    updateKnob (percent) {
      let {knob} = this.$refs
      knob && createjs.Tween.get(knob).to({percent}, 500, createjs.Ease.linear)
    },
    stopTimer () {
      if (this.timer) {
        this.timer.stop()
        this.$emit('stopped')
      }
    },
    skipTimer () {
      if (this.timer) {
        this.timer.stop()
        this.$emit('skip')
      }
    }

  }
}
</script>

<style>
#section-timer {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}
#section-timer[resting] {
  --color-accent: rgb(255, 64, 129);
  --color-accent--t2: rgba(255, 64, 129, .2);
  --color-accent--t5: rgba(255, 64, 129, .5);
  --color-accent--t8: rgba(255, 64, 129, .8);
}
.timer-tools {
  --button--size: 3rem;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr;
  grid-template-areas: "opl time opr";
  grid-auto-flow: column;
}
@media screen and (max-width: 500px){
  .timer-tools {
    grid-template-areas: "time time"
    "opl opr";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
  }
}
.timer-count {
  grid-area: time;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow: visible;
  flex-grow: 1;
}
.timer-count strong {
  font-size: 3rem;
}
.timer-option {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--button--size);
}
.button-pop-enter-active {
  animation: button-pop .5s cubic-bezier(0.215, 0.610, 0.355, 1);
}
.button-pop-leave-active {
  position: absolute;
  opacity: 0;
}
.btn--icon {
  border-radius: 50%;
  height: var(--button--size, 2rem);
  width: var(--button--size, 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-accent--t2);
}
.btn--icon i {
  font-size: calc(var(--button--size, 2rem) * .618);
  opacity: .5;
  color: var(--color-accent);
}
@keyframes button-pop {
  from {
    transform: scale(.9);
    opacity: 0;
  }
  90% {
    transform: scale(1.1);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>