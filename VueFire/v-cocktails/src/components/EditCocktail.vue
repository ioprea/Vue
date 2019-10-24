<template lang="pug">
  .edit-cocktail.container(v-if="cocktail")
    h2 Edit cocktail
    form(@submit.prevent="updateCocktail")
      .field.title
        label(for='title') Cocktail Title 🍹:
        input(type='text' name='title' v-model="cocktail.title")
      .flex
        .ingredient-comp(v-for="(ing, i) in cocktail.ingredients" :key="i")
          //- label(for="ingredient") Ingredient:
          span.chip.ingredient(type='text' name='ingredient') {{cocktail.ingredients[i]}}
            i.material-icons.delete-ing(@click="deleteIng(ing)") cancel
      .field.add-ingredients
        p.red-text(v-if="feedback") {{feedback}}
        label(for='add-ingredient') Cocktail Ingredients 🍌🍋🍉 (press tab to add):
        input(type='text' name='title' @keydown.tab.prevent="addIng" v-model="another")
      .field.center-align
        button.btn.pink Update Cocktail
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditCocktail',
  data () {
    return {
      cocktail: null,
      another: null,
      feedback: null
    }
  },
  async created () {
    let ref = await db.collection('cocktails').where('slug', '==' , this.$route.params.slug).get()
    ref.forEach(cocktail => {
      console.log(cocktail.data())
      this.cocktail = cocktail.data()
      this.cocktail.id = cocktail.id
    })
  },
  methods: {
    async updateCocktail () {
      if (this.cocktail.title) {
        this.feedback = null
        this.cocktail.slug = slugify(this.cocktail.title, {
          replacement: '-',
          remove: /[$*_+()'"!\-:@]/g,
          lower: true
        })
        try {
          await db.collection('cocktails').doc(this.cocktail.id).update(this.cocktail)
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
        this.cocktail.ingredients.push(this.another.trim())
        console.log(this.ingredients)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value'
      }
    },
    deleteIng (ingredient) {
      this.cocktail.ingredients = this.cocktail.ingredients.filter(ing => ing !== ingredient)
    }
  },
}

</script>
<style lang="scss">
  .edit-cocktail {
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
      .ingredient-comp {
        display: inline-flex;
      }
    }
  }
</style>