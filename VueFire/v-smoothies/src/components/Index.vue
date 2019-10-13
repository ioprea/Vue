<template lang="pug">
  .index.container
    .card(v-for="cocktail in cocktails" :key="cocktail.id")
      .card-content 
        i.material-icons.delete(@click="deleteCocktail(cocktail.id)") delete
        h2.indigo-text {{cocktail.title}}
        ul.ingredients
          li(v-for="(ingredient, index) in cocktail.ingredients" :key="ingredient.id") 
            span.chip {{ingredient}}
</template>
<script>
import db from '@/firebase/init.js'
export default {
  name: 'Index',
  data () {
    return {
      cocktails: []
    }
  },
  methods: {
    async deleteCocktail(id) {
      await db.collection('cocktails').doc(id).delete()
      this.cocktails = this.cocktails.filter(item => item.id !== id)
    }
  },
  async created() {
    // get firestore data
    let res = await db.collection('cocktails').get()
    res.forEach(doc => {
      let cocktail = doc.data()
      cocktail.id = doc.id
      this.cocktails.push(cocktail)
    })
  }
}
</script>
<style scoped>
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
  .index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0px;
  }
  .index .ingredients {
    margin: 30px;
  }
  .index .ingredients li {
    display: inline-block
  }
  .index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
</style>
