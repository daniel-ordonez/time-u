<template>
  <div class="heart">
    <div class="heart_content">
      <slot/>
    </div>
    <div class="heart_shape"/>
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
.heart_shape {
  background-color: var(--bg-color);
  display: inline-block;
  height: var(--size);
  position: absolute;
  top: 25%;
  transform: rotate(-45deg);
  width: var(--size);
  border-radius: 8px;
  filter: drop-shadow(0 2px 4px var(--color-accent--t5))
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

.heart_shape:before {
  top: calc( var(--size) * -0.5);
  left: 0;
}

.heart_shape:after {
  left: calc( var(--size) * 0.5);
  top: 0;
}
</style>