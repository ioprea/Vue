<template lang="pug">
  .signup.container
    form.card-panel(@submit.prevent="signup")
      h2.center.deep-purple-text Signup
      .field
        label(for="email") Email:
        input(type="email" name="email" v-model="email")
      .field
        label(for="password") Password:
        input(type="password" name="password" v-model="password")
      .field
        label(for="alias") Alias:
        input(type="text" name="alias" v-model="alias")
        p.red-text.center(v-if="feedback") {{feedback}}
      .field.center
        button.btn.deep-purple Signup
</template>
<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    async signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc()
        let resp = await ref.get()
        if (resp.exists) {
          this.feedback = 'Already exists!'
        } else {
          try {
            let cred = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            await ref.set({
              alias: this.alias,
              geolocation: null,
              user_id: cred.user.uid,
              email: this.email
            })
            this.$router.push({name: 'GMap'})
          } catch (error) {
            console.log(error)
            this.feedback = error.message
          }
        }
      } else {
        this.feedback = 'You must enter all fields'
      }
    }
  },
}
</script>
<style lang="scss">
  .signup {
    max-width: 400px;
    margin-top: 40px;
    h2 {
      font-size: 2.4em
    }
    .field {
      margin-bottom: 16px;
    }
  }
</style>