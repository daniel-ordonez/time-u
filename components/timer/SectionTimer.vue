<template>
  <section id="section-timer" :resting="timerStateRest">
    <div class="timer-tools">

      <div class="timer-option">
        <transition name="button-pop">

          <button v-if="timerStateRest"
            key="button-play"
            class="btn--icon" @click="resumeTimer">
            <i class="uil uil-pause"></i>
          </button>
          <button v-else-if="timerStatePlay"
            key="button-pause"
            class="btn--icon" @click="pauseTimer">
            <i class="uil uil-pause"></i>
          </button>
          <button v-else-if="timerStatePause"
            key="button-play"
            class="btn--icon" @click="resumeTimer">
            <i class="uil uil-play"></i>
          </button>
          
        </transition>
      </div>

      <div class="timer-count" >
        <transition name="button-pop">
          <heart v-if="timerStateRest" 
            key="heart"
            :style="`--heart-size: ${knobSize}px`"
          >
            <stack>
              <small>{{$t('timer.label')}}</small>
              <strong>{{timeLabel}}</strong>
            </stack>
          </heart>
          <knob v-else ref="knob" 
            key="knob"
            :style="`--knob-size: ${knobSize}px`"
            :size.sync="knobSize" 
            @click="startTimer"
          >
            <stack>
              <small>{{$t('timer.label')}}</small>
              <strong>{{timeLabel}}</strong>
            </stack>
          </knob>
        </transition>
      </div>

      <div class="timer-option">
        <transition name="button-pop">
          
          <button v-if="timerStateRest"
            key="button-play"
            class="btn--icon" @click="resumeTimer">
            <i class="uil uil-skip-forward-alt"></i>
          </button>
          <button v-else-if="timerStatePlay"
            class="btn--icon" @click="stopTimer">
            <i class="uil uil-square"></i>
          </button>
          <button v-else-if="timerStatePause"
            class="btn--icon" @click="stopTimer">
            <i class="uil uil-redo"></i>
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
const TIMER_STATES = {
  'IDLE': null,
  'PLAY': 1,
  'PAUSE': 2,
  'STOP': 0,
  'REST': -1
}
export default {
  name: 'SectionTimer',
  components: { Knob, Heart },
  props: {
    timerSet: { type: Array, default: () => [] }
  },
  data: () => ({
    knobSize: 200,
    secondsCount: 0,
    timerIndex: 0,
    timer: null,
    timerState: null
  }),
  computed: {
    currentTimer () {
      let {timerSet} = this
      let {timerIndex} = this.$data
      return this.timerSet.length && timerIndex < timerSet.length
        ? timerSet[timerIndex] : {}
    },
    targetTime () { return this.currentTimer.targetTime || 0 },
    timerStateIdle () { return this.timerState === TIMER_STATES.IDLE },
    timerStatePlay () { return this.timerState === TIMER_STATES.PLAY },
    timerStatePause () { return this.timerState === TIMER_STATES.PAUSE },
    timerStateRest () { return this.timerState === TIMER_STATES.REST },
    countdown () { return Math.max(0, this.targetTime - this.secondsCount) },
    timeLabel () {
      return this.timerStateIdle
        ? this.targetTime : this.countdown
    }
  },
  mounted () {
    const timer = new Timer()
    timer.addEventListener('secondsUpdated', e => {
      let {seconds} = timer.getTimeValues()
      this.countSeconds(seconds)
    })
    this.timer = timer
  },
  methods: {
    addTime (t) {
      this.targetTime = Math.max(0, this.targetTime + t)
    },
    timeout () {
      this.$emit('timeout')
      this.timerState = TIMER_STATES.REST
    },
    countSeconds (seconds) {
      let {targetTime} = this
      this.secondsCount = seconds
      if (seconds >= targetTime) {
        this.timer.stop()
        setTimeout(this.timeout, 1000)
      }
      this.$emit('countdown', this.countdown)
      let percent = 1.0 - ((1.0 / Math.max(targetTime, 1)) * seconds)
      this.updateKnob(percent)
    },
    updateKnob (percent) {
      this.$refs.knob.updateArc(percent)
    },
    startTimer () {
      if (this.targetTime > 0 && this.timer) {
        this.$emit('start')
        this.timerState = TIMER_STATES.PLAY
        this.secondsCount = 0
        this.updateKnob(1)
        setTimeout(() => {
          this.timer && this.timer.start()
        }, 1000)
      }
    },
    pauseTimer () {
      if (this.timer) {
        this.timer.pause()
        this.timerState = TIMER_STATES.PAUSE
        this.$emit('pause')
      }
    },
    resumeTimer () {
      if (this.timer) {
        this.timerState = TIMER_STATES.PLAY
        this.$emit('resume')
        setTimeout(() => {
          this.timer.start()
        }, 1000)
      }
    },
    stopTimer () {
      this.timer && this.timer.stop()
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
  grid-auto-flow: column;
  grid-template-areas: "opl time opr"
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
    opacity: .5;
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