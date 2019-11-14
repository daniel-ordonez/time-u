<template>
  <div id="page-stats">
    <stack class="gap-l">
      <slot name="title"/>
    </stack>
  </div>
</template>

<script>
export default {
  name: 'PageStats'
}
</script>

<style>
#page-stats {
  background: var(--bg-color);
  overflow: auto;
  height: 100%;
}
</style>