<template lang="pug">
  div
    Navbar
    router-view 
</template>
<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: { Navbar }
}
</script>
<style lang="scss">
  body {
    background-color: #ddd
  }
</style>
