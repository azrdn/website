<script setup>
import WipLabel from './components/wip.vue'
import Landing from './components/landing.vue'
// TODO : Use Vue Router
</script>

<template>
  <WipLabel/>
  <Landing/>
</template>

<style lang="sass">
@use './assets/styles/css-reset' as *
@use './assets/styles/font' as *

:root
  font-family: 'Inter', sans-serif
</style>
