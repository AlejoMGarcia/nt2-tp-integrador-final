<template>
  <div id="app" >
    <div class="jumbotron">
      <Navbar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
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
