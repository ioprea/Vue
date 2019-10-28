<template lang="pug">
  .login.container
    form.card-panel(@submit.prevent='login')
      h2.center.deep-purple-text Login
      .field
        label(for="email") Email:
        input(type="email" name="email" v-model="email")
      .field
        label(for="password") Password:
        input(type="password" name="password" v-model="password")
      p.red-text.center(v-if="feedback") {{feedback}}
      .field.center
        button.btn.deep-purple Login
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    async login () {
      if (this.email && this.password) {
        let cred
        try {
          let cred = await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
          console.log(cred.user)
          this.$router.push({ name: 'GMap' })
        } catch (e) {
          this.feedback = e.message
        }
        this.feedback = null
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}

</script>
<style lang="scss">
  .login {
    max-width: 400px;
    margin-top: 40px;
    h2 {
      font-size: 2.4em;
    }
    .field {
      margin-bottom: 16px;
    }
  }
</style>