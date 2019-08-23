<template lang='pug'>
  .about
    p Input 1
    input(:value='message' @input='e => updateMessageAction(e.target.value)')
    br
    p Input 2
    input(v-model='message2')
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Form',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      message: state => state.form.message
    }),
    message2: {
      get () {
        return this.$store.state.form.message2
      },
      set (value) {
        this.$store.commit({
          type: 'form/updateMessage2',
          message: value
        })
      }
    }
  },
  methods: {
    ...mapActions('form', [
      'updateMessageAction'
    ])
  }
}
// console.log(this)
</script>
