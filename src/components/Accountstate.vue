<template>

  <section class="src-components-account">
    <div class="jumbotron">

      <h2 class="mt-4">Cuentas activas</h2>
      <br>

      <div v-if="disabledSpinner" class="spinner-border align-center mt-3" role="status">
        <span class="sr-only">Loading Axios...</span>
      </div>

      <div v-if="accounts.length" >
        <div v-for="(account, index) in accounts" :key="index" class="card mt-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title"> {{ account.name }} </h5>
            <h6 class="card-subtitle mb-2 text-muted"> {{ account.accountNumber }} </h6>
            <p class="card-text">{{ account.amount | currency(account.currency) }} </p>
            <div>
              <a href="#" class="card-link ml-3" @click="redirectToStatements()">Ver movimientos</a>
              <a href="#" class="card-link ml-3" @click="redirectToTransfer()">Transferir</a>
            </div>
          </div>
        </div>

      </div>

      
    </div>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-account',
    props: [],
    filters : {
      currency: function(amount, currency) {
        console.log(currency)
        let sign = currency == 'pesos' ? '$ ':'U$S '
        return sign + amount
      }
    },
    mounted () {
      this.getAccountClients()
    },
    data () {
      return {
        disabledSpinner: false,
        accounts : [ {
          name: 'Cuenta corriente en pesos',
          accountNumber : 'ad21231 ',
          currency: 'pesos',
          amount: 3964.10
        },
        {
          name: 'Cuenta corriente en dólares',
          accountNumber : 'CC-D-0123 ',
          currency: 'dolar',
          amount: 4750.10
        }]
      }
    },
    methods: {
      redirectToStatements(){
        // this.$router.push({
        //   path: '/statements'
        // })
      },
      redirectToTransfer() {
        // this.$router.push({
        //   path: '/trasnfer'
        // })
      },
      async getAccountClients() {
        // this.accounts = []
        this.disabledSpinner = true

        try {
          let response = await this.axios(this.url)
          this.resourcesAxios = response.data
          this.disabledSpinner = false
        }
        catch(error) {
          console.error('Error AXIOS', error)
          this.disabledSpinner = false //Para poder volver a ejecutarlo en caso de error
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-account {

  }

  .jumbotron {
    background-color: rgba(255, 136, 0, 0.253);
    color: rgb(0, 0, 0);
  }

  hr {
    background-color: #bbb;
  }

  .card-text {
    font-size: xxx-large;
    text-align-last: center;
  }

  .card-body {
    background-color: rgba(68, 62, 55, 0.452);
  }
</style>
