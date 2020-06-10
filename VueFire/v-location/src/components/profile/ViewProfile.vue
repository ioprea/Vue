<template lang="pug">
  .view-profile.container
    .card(v-if="event")
      h2.deep-purple-text.center {{event.name}}
      ul.comments.collection
        li(v-for="(comment, index) in comments" :key="index")
         .green-text.text-darken-1 {{comment.from}}
         .grey-text.text-darken-2 {{comment.content}}
      form(@submit.prevent="addComment")
        .field
          label(for="comment") Add a comment
          input(type="text" name="comment" v-model="newComment")
          p.red-text.center(v-if="feedback")

</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'ViewProfile',
  data() {
    return {
      profile: null,
      feedback: null,
      newComment: null,
      user: null,
      comments: [],
      event: null
    }
  },
  async created() {
    let ref = db.collection('events')
    let userRef = db.collection('users')
    console.log('ref', this.$route);
    let eventId = this.$route.params.id
    //get current user
    let snapshot = await userRef.where('user_id', '==', firebase.auth().currentUser.uid).get()
    snapshot.forEach(doc => {
      this.user = doc.data()
      this.user.id = doc.id
    })

    let event = await db.collection('events').doc(eventId).get()
    this.event = event.data()
    this.event.id = event.id
    console.log('event', this.event);

    // comments
    db.collection('comments').where('to', '==', this.$route.params.id).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          // console.log('changes', change.doc.data())
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content,
            time: change.doc.data().time
          })
        }
      })
      this.comments.sort(function (a, b) {
        return a.time - b.time
      })
    })
    
  },
  methods: {
    addComment() {
      console.log('thi suer', this.user);
      if (this.newComment) {
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.alias,
          content: this.newComment,
          time: Date.now()
        }).then(() => {
          this.newComment = null
        })
      } else {
        this.feedback = 'You must enter a comment to add it'
      }
    }
  },
}
</script>
<style lang="scss">
  .view-profile {
    .card {
      padding: 20px;
      margin-top: 60px;
    }
    
    h2 {
      font-size: 2em;
      margin-top: 0;
    }

    li {
      padding: 10px;
      border-bottom: 1px solid #eee
    }
  }
</style>