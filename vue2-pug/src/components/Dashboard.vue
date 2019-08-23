<template lang="pug">
.card.border-success.mb3.mx-5
  .card-header header
  .card-body.text-success
    h5.card-title title
    p.card-text This is a paragraph {{msg}}
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Random message'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
