<template>

  <section class="src-components-account-card">
    <div class="card-body">
      <h5 class="card-title"> {{ account.accountName }} </h5>
      <h6 class="card-subtitle mb-2 text-muted"> {{ account.accountNumber }} </h6>
      <p class="card-text">{{ account.amount | currency(account.currency) }} </p>
      <div>
        <a href="#" class="card-link ml-3" @click="redirectToStatements()">Ver movimientos</a>
        <a href="#" class="card-link ml-3" @click="redirectToTransfer()">Transferir</a>
      </div>
    </div>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-account-card',
    props: ['account'],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      redirectToStatements(){
        this.$store.dispatch('selectAccount', this.account)
        this.$router.push({
          path: '/statements',
          name: 'statements'
        })
      },
      redirectToTransfer() {
        this.$store.dispatch('selectAccount', this.account)
        this.$router.push({
          path: '/transfer',
          name: 'transfer'
        })
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-account-card {

  }

  .card-text {
    font-size: xx-large;
    text-align-last: center;
  }

  .card-body {
    background-color: rgba(68, 62, 55, 0.452);
  }

  .card-title {
    text-align: center
  }
</style>
