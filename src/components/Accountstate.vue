<template>

  <section class="src-components-account">
    <div class="jumbotron">

      <h2 style="text-align-last:center">Cuentas activas</h2>
      <br>

      <div v-if="disabledSpinner" class="spinner-border align-center mt-3" role="status">
        <span class="sr-only">Cargando cuentas...</span>
      </div>

      <div v-if="accounts.length" >
        <div v-for="(account, index) in accounts" :key="index" class="card mt-3" style="width: 18rem;">
          <AccountCard :account="account" />
        </div>
      </div>
      
    </div>

  </section>

</template>

<script>

import AccountCard from './AccountCard.vue'

  export default  {
    name: 'src-components-account',
    props: [],
    components: {
      AccountCard
    },
    mounted () {
      this.getAccountClients()
      this.clearAccountStore()
    },
    data () {
      return {
        url: 'https://618ab08e34b4f400177c4823.mockapi.io/accounts',
        userId: '8690cb36-cf22-461c-9304-434adcca9650',
        disabledSpinner: false,
        accounts : []
      }
    },
    methods: {
      async getAccountClients() {
        this.accounts = []
        this.disabledSpinner = true

        try {
          let response = await this.axios(this.url)
          let data = response.data
          this.accounts = data.filter(account => {
            return account.userId == this.userId
          })
          this.disabledSpinner = false
        }
        catch(error) {
          console.error('Error AXIOS', error)
          this.disabledSpinner = false
        }
      },
      clearAccountStore() {
        this.$store.dispatch('selectAccount', null)
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


</style>
