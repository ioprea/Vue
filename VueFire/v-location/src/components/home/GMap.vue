<template lang="pug">
  .map
    .google-map#map
    button.btn-floating.btn-large.waves-effect.waves-light.green.add-button(v-on:click="addMarker")
      i.material-icons add
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'
import './GMap.css'
import Materialize from 'materialize-css/dist/js/materialize'

export default {
  name: 'GMap',
  data() {
    return {
      currentUser: null,
      marker: false
    }
  },
  methods: {
    renderMap () {
      console.log('user ', this.currentUser);
      let center = { lat: 44.427968, lng: 26.103211 }
      if(this.currentUser.geolocation && this.currentUser.geolocation.lat && this.currentUser.geolocation.lng) {
        center = { lat: this.currentUser.geolocation.lat, lng: this.currentUser.geolocation.lng }
      }
      const map = new google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 10,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })
      let pressTimer
      map.addListener('click', (e) => {
        console.log('clicked', this.marker);
        if(this.marker) {
          await db.collection('events').add({name: 'Custom event', geolocation: {lat: e.latLng.lat(), lng: e.latLng.lng()}})
          let marker = new google.maps.Marker({
            position: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            },
            map
          })
          marker.addListener('click', () => {
            this.$router.push({ name: 'ViewProfile', params: {id: doc.id} })
          })
        }
        this.marker = false
      })

      db.collection('events').get().then(event => {
        console.log('events =>', event)
        event.docs.forEach(doc => {
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

    },
    addMarker () {
      console.log('markeer');
      this.marker = true
      Materialize.toast({html: '<i>Click on the map to add a new marker</i>'});
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
        this.lat = pos.coords.latitude || 44.427968
        this.lng = pos.coords.longitude || 26.103211

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