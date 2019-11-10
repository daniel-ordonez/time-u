<template>
  <div id="page-timer">
    <stack class="gap-l">
      <slot name="title"/>
      <section-timer 
        :timerSet="timerSet"
        @countdown="countdown" 
        @start="start" 
        @pause="pause"
        @resume="resume"
        @timeout="timeout"
      />
    </stack>
  </div>
</template>

<script>
import Speech from 'speak-tts'
import SectionTimer from './SectionTimer'
export default {
  name: 'PageTimer',
  components: { SectionTimer },
  data: () => ({
    speech: null
  }),
  watch: {
    lang (lang) {
      this.speech.setLanguage(lang)
    }
  },
  computed: {
    timerSet () { return [
        {targetTime: 30, type: 'countdown'},
        {targetTime: 10, type: 'rest'}
      ]
    },
    lang () { return this.$store.getters['localStorage/lang'] },
  },
  mounted () {
    const speech = new Speech()
    if (speech.hasBrowserSupport()) {
      speech.init({
        lang: this.lang
      })
      this.speech = speech
    } else {
      console.log('No speech synthesis support!')
    }
    createjs.Sound.registerSound('./beep.wav', 'beep')
  },
  methods: {
    start () {
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.start')})
    },
    pause () {
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.pause')})
    },
    resume () {
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.resume')})
    },
    timeout () {
      let {speech} = this.$data
      speech && speech.speak({text: this.$t('timer.rest')})
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