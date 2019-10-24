<template lang="pug">
  .welcome.container
    .card
      .card-content.center-aligned
        h2.teal-text Welcome
        form(@submit.prevent="enterChat")
          label(for="name") Enter your name:
          input(type="text" name="name" v-model="name")
          p.red-text(v-if="feedback") {{feedback}}
          button.btn.teal Enter Chat
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: null,
      feedback: null
    }
  },
  methods: {
    enterChat () {
      if (this.name) {
        this.$router.push({name: 'Chat', params: { name: this.name }})
      } else {
        this.feedback = 'You must enter a name to join'
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .welcome {
    max-width: 400px;
    margin-top: 100px;
    h2 {
      font-size: 3em;
    }
    button {
      margin: 30px;
    }
  }
</style>
