<template lang="pug">
  .navbar
    nav.deep-purple.darken-1
      .container
        router-link.brand-logo.left(:to="{name: 'GMap'}") Location
        ul.right
          li(v-if="!user")
            router-link(:to="{name: 'Signup'}") Signup
          li(v-if="!user")
           router-link(:to="{name: 'Login'}") Login
          li(v-if="user")
           a(@click="logout") Logout
          li(v-if="user" class="logInfo") Logged in as: {{user.email}}
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import './Navbar.css'

export default {
  name: 'Narbar',
  data() {
    return {
      firebase,
      user: null
    }
  },
  methods: {
    async logout() {
      let resp = await firebase.auth().signOut()
      this.$router.push({name: 'Login'})
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
}
</script>
<style lang="scss">
  li {
    margin: 0 5px;
  }
</style>