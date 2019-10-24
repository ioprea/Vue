<template lang="pug">
  .new-message
    form(@submit.prevent='addMessage')
      label(for="newMessage") New Message (enter to add)
      input(type='text' name='new-message' v-model="newMessage")
      p.red-text(v-if="feedback") {{feedback}}
</template>
<script>
import db from '@/firebase/init'
export default {
  name: "NewMessage",
  props: ['name'],
  data() {
    return {
      newMessage: null,
      feedback: null
    }
  },
  methods: {
    async addMessage() {
      if (this.newMessage) {
        try {
          await db.collection('messages').add({
            name: this.name,
            content: this.newMessage,
            timestamp: Date.now()
          })
        } catch(e) {
          console.log(e)
        }
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a message to continue'
      }
    }
  },
}
</script>