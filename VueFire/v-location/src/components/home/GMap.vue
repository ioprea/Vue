<template lang="pug">
  .map
    .google-map#map
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'GMap',
  data() {
    return {
      currentUser: null
    }
  },
  methods: {
    renderMap () {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.lat || this.currentUser.geolocation.lat || 0, lng: this.lng || this.currentUser.geolocation.lng || 0 },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })

      db.collection('users').get().then(users => {
        console.log('users =>', users)
        users.docs.forEach(doc => {
          let data = doc.data()
          if (data.geolocation) {
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng
              },
              map
            })
            marker.addListener('click', () => {
              this.$router.push({ name: 'ViewProfile', params: {id: doc.id} })
            })
          }
        })
      })
    }
  },
  async mounted () {
    // get current user
    let user = firebase.auth().currentUser
    let snapshot = await db.collection('users').where('user_id', '==', user.uid).get()
    snapshot.forEach(doc => {
      this.currentUser = doc.data()
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude

        // find the user record and then update geo coords
        await snapshot.forEach(doc => {
          db.collection('users').doc(doc.id).update({
            geolocation: { 
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          })
        })
        this.renderMap()
      }, err => {
        console.log(err)
        this.renderMap()
      }, { maximumAge: 60000, timeout: 3000 })
    } else {
      this.renderMap()
    }
  },
}
</script>
<style lang="scss">
  .google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    background: #fff;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>