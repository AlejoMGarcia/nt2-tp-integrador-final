<template>

  <section class="src-components-loginform">
    <div class="wrapper fadeInDown">
      <div id="formContent">

        <div class="fadeIn first">
          <img src="./../../public/login-icon.png" id="icon" alt="User Icon" />
        </div>

        <!-- Login Form -->
        <form>
          <input type="text" id="email" class="fadeIn second ml-3" name="email" placeholder="email">
          <input type="text" id="password" class="fadeIn third ml-3" name="login" placeholder="password">
          <input type="submit" class="fadeIn fourth ml-3" value="Log In" @click=login()>
        </form>

        <div id="formFooter">
          <a class="underlineHover" href="#" @click="register()">Registrarse</a>
        </div>

      </div>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-loginform',
    props: [],
    mounted () {

    },
    data () {
      return {
        token: null,

      }
    },
    methods: {
      async login() {
        await this.axios.post();
        
        this.peticion = true

        try {
          let respuesta = await this.axios(this.url)
          this.token = respuesta.data
          this.peticion = false
          
        }
        catch(error) {
          console.error('Error en login', error)
        }
        
      },
      regiter() {

      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-loginform {

  }

  img {
    max-width:20%;
    height:24px;
  }
  

</style>
