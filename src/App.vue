<template>
  <div id="app" class="container-fluid mt-2">
    <div class="jumbotron">
      <h1>Trabajo Integrados NT2</h1>
      <hr>


      <!-- <Loginform /> -->
      <Accountstate />
      <!-- <Navbar /> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

// import Navbar from './components/Navbar.vue'
// import Loginform from './components/Loginform.vue'
// import RegisterForm from './components/Registerform.vue'
import Accountstate from './components/Accountstate.vue'

export default {
  name: 'App',
  components: {
    // Navbar,
    Accountstate
  }
}
</script>

<style>
  #app {

  }

  .jumbotron {
    padding: 32px !important;
  }

  h1 {
    color: goldenrod;
  }

</style>
