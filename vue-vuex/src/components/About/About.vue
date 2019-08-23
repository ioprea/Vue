<template lang='pug'>
  .about
    h1 This is an about page
    p Counter: {{count}}
    button(@click='increment') Add
    button(@click='incrementBy({amount: 5})') Add 5
    button(@click='incrementAsync') Increment Async
    button(@click='testAction') TestAction
    Counter
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import Counter from '../Counter'

const { mapState, mapMutations } = createNamespacedHelpers('about')
export default {
  name: 'About',
  props: {
    msg: String
  },
  components: {
    Counter
  },
  computed: mapState([
    'count'
  ]),
  methods: {
    ...mapMutations([
      'increment',
      'incrementBy'
    ]),
    incrementAsync () {
      this.$store.dispatch('incrementAsync')
    },
    async testAction () {
      await this.$store.dispatch('actionA')
      this.$store.state.about.count = 66
    }
  }
}
// console.log(this)
</script>
