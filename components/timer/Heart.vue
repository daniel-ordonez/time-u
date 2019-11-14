<template>
  <div class="heart">
    <div class="heart_content">
      <slot/>
    </div>
    <div class="heart-wrapper">
      <div class="heart_shape"/>
      <div class="heart_shape"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Heart',
}
</script>

<style>
.heart {
  height: var(--heart-size, 200px);
  width: var(--heart-size, 200px);
  --size: calc( var(--heart-size, 200px) * .65);
  --bg-color: var(--heart-color, var(--color-accent, rgb(255, 64, 129)));
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;
  user-select: none;
  color: var(--heart-color--contrast, var(--color-accent--contrast, white));
}
.heart_content {
  position: absolute;
  content: "";
  left: 10%;
  top: 10%;
  right: 10%;
  bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}
.heart-wrapper {
  animation: 1.6s infinite heartbeat;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}
.heart_shape {
  background-color: var(--bg-color);
  display: inline-block;
  height: var(--size);
  position: absolute;
  top: 25%;
  transform: rotate(-45deg);
  width: var(--size);
  border-radius: 8px;
  filter: drop-shadow(0 2px 4px var(--color-accent--t5));
}
.heart_shape:before,
.heart_shape:after {
  content: "";
  background-color: var(--bg-color);
  border-radius: 50%;
  height: var(--size);
  position: absolute;
  width: var(--size);
}
.heart-wrapper>.heart_shape:nth-child(2) {
  transform: rotate(-45deg) scale(1.05);
  animation: heartFade .8s infinite both;
  --min-t: .2;
  --max-t: .1;
  opacity: var(--max-t);
}

.heart_shape:before {
  top: calc( var(--size) * -0.5);
  left: 0;
}

.heart_shape:after {
  left: calc( var(--size) * 0.5);
  top: 0;
}
 @keyframes heartFade {
  0% {
    opacity: var(--min-t);
  }
  14% {
    opacity: var(--min-t);
  }
  28% {
    opacity: var(--max-t);
    transform: rotate(-45deg) scale(1.15);
  }
  42% {
    opacity: var(--max-t);
    transform: rotate(-45deg) scale(1.15);
  }
  70% {
    opacity: var(--max-t);
    transform: rotate(-45deg) scale(1.15);
  }
}
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>