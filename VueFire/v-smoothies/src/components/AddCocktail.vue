<template lang="pug">
  .add-cocktail.container
    h2.center-align.indigo-text Add new cocktail recipe
    form(@submit.prevent="addCocktail")
      .field.title
        label(for='title') Cocktail Title 🍹:
        input(type='text' name='title' v-model="title")
      .flex
        .ingredient-comp(v-for="(ing, i) in ingredients" :key="i")
          //- label(for="ingredient") Ingredient:
          span.chip.ingredient(type='text' name='ingredient') {{ingredients[i]}}
            i.material-icons.delete-ing(@click="deleteIng(ing)") cancel
      .field.add-ingredients
        p.red-text(v-if="feedback") {{feedback}}
        label(for='add-ingredient') Cocktail Ingredients 🍌🍋🍉 (press tab to add):
        input(type='text' name='title' @keydown.tab.prevent="addIng" v-model="another")
      .field.center-align
        button.btn.pink Add Cocktail
</template>
<script>
import slugify from 'slugify'
import db from '../firebase/init'
export default {
  name: 'AddCocktail',
  data () {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slub: null
    }
  },
  methods: {
    async addCocktail () {
      if (this.title) {
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+()'"!\-:@]/g,
          lower: true
        })
        console.log(this.slug);
        try {
          await db.collection('cocktails').add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
        } catch(err) {
          console.log(err)
        }
        this.$router.push({ name:'Index' })
      } else {
        this.feedback = 'You must enter a title'
      }
    },
    addIng () {
      if (this.another && this.another.trim()) {
        this.ingredients.push(this.another.trim())
        console.log(this.ingredients)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value'
      }
    },
    deleteIng (ingredient) {
      this.ingredients = this.ingredients.filter(ing => ing !== ingredient)
    }
  }
}
</script>
<style lang="scss">
  .add-cocktail {
    margin-top: 20px;
    padding: 20px;
    max-width: 80%;

    h2 {
      font-size: 2em;
      margin: 20px auto;
    }

    .field {
      position: relative;
      margin: 20px auto;
      label {
        font-size: 1.4em;
      }
    }


    .chip.ingredient {
      position: relative;
      padding-right: 35px;
    }

    .delete-ing {
      cursor: pointer;
      top: 15%;
      padding-left: 5px;
      position: absolute
    }

    .flex {
      display: flex;
      .ingredient-comp {
        display: inline-flex;
      }
    }
  }
</style>