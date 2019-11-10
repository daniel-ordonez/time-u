<template>
  <div id="tab-menu">
    <div class="tab-menu_bg">
      <div class="tab-menu_bg_rect"/>
      <div class="tab-menu_bg_mark" 
        :style="`--mark-offset-x: ${markOffset.x}; --mark-offset-y: ${markOffset.y}`"
      />
    </div>
    <nav class="tab-menu">
      <button v-for="(item, index) in options" 
        :key="`option-${index}`"
        :active="item === activePage"
        class="tab-btn"
        @click="changePage(index)"
      >
        <div class="tab-btn_icon">
          <i :class="`uil uil-${item.icon}`"></i>
        </div>
      </button>
    </nav>
    <svg class='filter' xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id='goo'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur'/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -3" result="goo" />
          <feBlend in='SourceGraphic' in2='goo' operator="atop"/>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
export default {
  name: 'NavMenu',
  data: () => ({
    markOffset: {
      x: 0,
      y: 0
    }
  }),
  watch: {
    activePage () {
      this.updateTabMark()
    }
  },
  computed: {
    options () { return this.$store.state.pages },
    activePage () { return this.$store.getters.activePage }
  },
  mounted () {
    this.updateTabMark()
    const ro = new ResizeObserver((entries, observer) => {this.updateTabMark()})
    ro.observe(this.$el)
  },
  methods: {
    changePage (index) {
      this.$store.commit('changePage', index)
    },
    updateTabMark () {
      let buttons = this.$el.querySelectorAll('button')
      let index = this.$store.state.pageIndex
      let activeBtn = buttons[index]
      if (activeBtn) {
        let box = activeBtn.getBoundingClientRect()
        this.markOffset = {x: `${box.left}px`, y: `${box.top}px`}
      }
    }
  }
}
</script>

<style>
#tab-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--menu-color, rgba(0,0,0,.06));
  position: relative;
  --offset: 8px;
}
.tab-menu_bg {
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  filter: url("#goo");
}
.tab-menu_bg_rect {
  position: absolute;
  top: 0;
  background-color: var(--bg-color);
}
.tab-menu_bg_mark {
  position: absolute;
  width: calc(var(--button-size) - var(--offset));
  height: calc(var(--button-size) - var(--offset));
  background: var(--bg-color);
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.44, -0.35, 0.48, 1.5);
}
.tab-menu {
  z-index: 1;
  display: grid;
  grid-auto-flow: row;
  grid-gap: .618rem;
}
.tab-btn {
  width: var(--button-size);
  height: var(--button-size);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--icon-size);
}
.tab-btn_icon {
  position: relative;
}
.tab-btn_icon>i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all .1s cubic-bezier(0.47, 0, 0.745, 0.715);
}
svg.filter {
  display: none;

}
@media screen and (max-width: 500px){
  #tab-menu {
    --button-size: 4rem;
    --icon-size: 1.618rem;
    padding-top: var(--offset);
  }
  .tab-menu_bg_rect {
    width: 100%;
    height: var(--offset);
    left: 0;
  }
  .tab-menu_bg_mark {
    top: calc(var(--offset) * -1);
    left: calc((var(--offset) * .5) + var(--mark-offset-x));
  }
  .tab-menu {
    grid-auto-flow: column;
  }
  
  .tab-btn[active] i {
    top: calc(50% - calc(2 * var(--offset)));
  }
}
@media screen and (min-width: 500px){
  #tab-menu {
    height: 100%;
    position: relative;
    padding-right: var(--offset);
    --button-size: 6rem;
    --icon-size: 2rem;
  }
  .tab-menu_bg_rect {
    height: 100%;
    width: var(--offset);
    right: 0;
  }
  .tab-menu_bg_mark {
    right: calc(var(--offset) * -1);
    top: calc((var(--offset) * .5) + var(--mark-offset-y));
  }
  .tab-menu {
    grid-auto-flow: row;
  }
  .tab-btn[active] i {
    left: calc(50% + calc(2 * var(--offset)));
  }
}
</style>