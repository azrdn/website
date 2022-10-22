<script setup>
import Button from './button.vue'

let vh = window.innerHeight
document.documentElement.style.setProperty('--vh', `${vh}px`);
</script>

<template>
  <main>
    <picture>
      <source type="image/avif" srcset="../assets/images/me.avif"/>
      <source type="image/png" srcset="../assets/images/me.png"/>
      <img src="../assets/images/me.png" decoding="async" alt="My picture"/>
    </picture>
    <div class="intro">
      <h1 class="greet">Hi There. 👋</h1>
      <h1>I'm Azis Ramadhan</h1>
      <p>Digital Technology Enthusiast & Developer</p>
      <Button text="Contact Me" link='#'/>
    </div>
  </main>
</template>

<style scoped lang="sass">
@use '../assets/styles/colors' as *

main
  display: flex
  height: var(--vh) //fallback
  height: 100dvh
  gap: 2rem
  flex-direction: column
  align-items: center
  justify-content: center
  color: $text-dark
  background-color: $bg-dark

.intro
  .greet
    font-size: 1.5rem
    font-weight: 200
    margin: 0 0 0.5rem
  h1
    font-size: 2.25rem
    font-weight: 700
    letter-spacing: -0.04em
  p
    font-weight: 200
    color: $text-dark
    margin: 1rem 0 1.75rem

img
  background-color: #101010 //temporary
  height: 12.5rem
  width: auto
  border-radius: 9999px
  filter: saturate(0%)

  transition: .5s ease
  &:hover
    filter: saturate(100%)

@media screen and (min-width: 768px)
  main
    flex-direction: row-reverse
    justify-content: space-evenly
    padding: 0 5rem
    gap: 3rem
  .intro
    h1
      font-size: 3.5rem
  img
    height: 17.5rem
    width: auto
</style>