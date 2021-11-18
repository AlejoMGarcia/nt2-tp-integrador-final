<template>

  <section class="src-components-navbar">
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">    
      <router-link to="/">
        <a class="navbar-brand" href="#">Inicio</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/account-state">
              <a class="nav-link" href="#">Estado de Cuenta</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/statements">
              <a class="nav-link" href="#">Movimientos de Cuenta</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/transfer">
              <a class="nav-link" href="#">Transferencias</a>
            </router-link>
          </li>
          
        </ul>
      </div>
    </nav>


  </section>

</template>

<script>

  export default  {
    name: 'src-components-navbar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-navbar {

  }
</style>
