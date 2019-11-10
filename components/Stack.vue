<template>
  <div class="stack">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Stack'
}
</script>

<style>
.stack {
  display: grid;
  grid-auto-flow: row;
}
.stack.gap-s {
  grid-row-gap: .618rem;
}
.stack.gap-m {
  grid-row-gap: 1rem;
}
.stack.gap-l {
  grid-row-gap: 1.618rem;
}
</style>