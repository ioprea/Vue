<template lang='pug'>
  .about
    h3 This is a counter
    h5 Counter Component: {{count}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'About',
  props: {
    msg: String
  },
  computed: mapState([
    'count'
  ]),
  methods: {
    addOne () {
      this.$store.commit('increment')
    }
  }
}
</script>
