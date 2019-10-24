<template lang="pug">
  .chat.container
    h2.center Chat
    .card
      .card-content
        ul.messages(v-chat-scroll)
          li(v-for="message in messages" :key="message.id")
            span.teal-text {{message.name}} 
            span.grey-text.text-darken-3 {{message.content}}
            span.grey-text.time {{moment(message.timestamp).format('lll')}} 
      .card-action
        NewMessage(:name="name")
</template>
<script>
import NewMessage from './NewMessage.vue'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: "Chat",
  components: { NewMessage },
  props: ['name'],
  data() {
    return {
      moment,
      messages: []
    }
  },
  created() {
    let ref = db.collection('messages').orderBy('timestamp')
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let doc = change.doc
          console.log('doc ->', doc)
          this.messages.push({id: doc.id, ...doc.data()})
          console.log(this.messages)
        }
      })
    })
  },
}
</script>
<style lang="scss">
  .chat {
    text-align: left;
    h2 {
      font-size: 2.6em;
      margin-bottom: 40px;
    }
    span {
      font-size: 1.4em;
    }
    .time {
      font-size: 1em;
      display: block;
    }
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>