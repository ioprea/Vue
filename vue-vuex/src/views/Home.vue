<template lang='pug'>
  .home
    HelloWorld(msg='Hello there!')
    p Counter: {{count}}
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: mapState([
    'count'
  ])
}
</script>
