<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  }
})</script>

<template>
<a class="button" :href=link>{{text}}</a>
</template>

<style scoped lang="sass">
@use '../assets/styles/colors' as *
.button
  display: flex
  width: fit-content
  font-weight: 700
  text-decoration: none
  padding: 0.65em 1rem
  color: $bg-dark
  background-color: $text-dark
  border-radius: 9999px
</style>