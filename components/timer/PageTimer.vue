<template>
  <div id="page-timer">
    <stack class="gap-l">
      <slot name="title"/>
      <section-timer 
        ref="timer"
        :timerOptions="timerOptions"
        @countdown="countdown" 
        @started="started" 
        @paused="paused"
        @resumed="resumed"
        @timeout="nextTimer"
        @click="!targetTime && nextTimer()"
      >
        <transition name="button-pop">
          <stack v-if="timerRunning">
            <small>{{$t('timer.label')}}</small>
            <strong>{{timerLabel}}</strong>
          </stack>
          <div v-else>
            {{timerCompleted ? this.$t('timer.completed') : this.$t('timer.cta')}}
          </div>
        </transition>
      </section-timer>
    </stack>
  </div>
</template>

<script>
import Speech from 'speak-tts'
import SectionTimer from './SectionTimer'
const TIMER_STATES = {
  'IDLE': false,
  'RUNNING': 1,
  'COMPLETED': 2
}
export default {
  name: 'PageTimer',
  components: { SectionTimer },
  data: () => ({
    speech: null,
    timerIndex: -1,
    timerState: null
  }),
  watch: {
    lang (lang) {
      this.speech.setLanguage(lang)
    }
  },
  computed: {
    timerIdle () { return this.timerState === TIMER_STATES.IDLE },
    timerRunning () { return this.timerState === TIMER_STATES.RUNNING },
    timerCompleted () { return this.timerState === TIMER_STATES.COMPLETED },
    lang () { return this.$store.getters['localStorage/lang'] },
    timerSet () { return this.$store.getters['localStorage/timerSet'] },
    timerOptions () {
      let i = this.timerIndex
      let {timerSet} = this
      return i >= 0 && timerSet.length > 0 && timerSet.length > i ? timerSet[i] : {}
    },
    targetTime () {
      return this.timerOptions.targetTime
    },
    timerLabel () {
      let {timer} = this.$refs
      return timer ? timer.countdown : 0
    }
  },
  mounted () {
    const speech = new Speech()
    if (speech.hasBrowserSupport()) {
      speech.init({lang: this.lang})
      this.speech = speech
    } else {
      console.log('No speech synthesis support!')
    }
    createjs.Sound.registerSound('./beep.wav', 'beep')
  },
  methods: {
    async nextTimer () {
      if (this.timerCompleted) return
      this.timerIndex += 1
      await this.$nextTick()
      if (this.timerIndex < this.timerSet.length) {
        this.startTimer()
      } else {
        let {timer} = this.$refs
        timer && timer.stopTimer()
        this.completed()
      }
    },
    async startTimer () {
      let {timer} = this.$refs
      timer.startTimer()
    },
    started (timer) {
      this.timerState = TIMER_STATES.RUNNING
      let {speech} = this.$data
      speech && timer.rest 
        ? speech.speak({text: this.$t('timer.rest')}) 
        : speech.speak({text: this.$t('timer.start')})
    },
    paused () {
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.pause')})
    },
    resumed () {
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.resume')})
    },
    completed () {
      this.timerState = TIMER_STATES.COMPLETED
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.completed')})
    },
    countdown (v) {
      if (v <= 5 && v >= 0) {
        createjs.Sound.play('beep')
      }
    }
  }
}
</script>

<style>
#page-timer {
  background: var(--bg-color);
}
</style>