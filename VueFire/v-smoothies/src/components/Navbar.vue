<template lang="pug">
    .navbar
        nav.nav-extended.indigo.darken-2
            .nav-content
                router-link(:to="{ name: 'Index' }")
                    span.nav-title Ninja Smoothies
                a.btn-floating.btn-large.halfway-fab.pink(href="")
                    router-link(:to="{ name: 'AddCocktail' }")
                        i.material-icons add
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  }
}
</script>
<style>
  .navbar nav {
    padding: 0 20px;
  }
</style>
