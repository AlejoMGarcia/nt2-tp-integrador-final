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
      <div class="remove-account" style="">
        <a href="#" class="card-link warning" data-toggle="modal" data-target="#delteModal">Eliminar cuenta</a>
      </div>
    </div>

   <div class="modal fade" id="delteModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"> Eliminación de cuenta </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4>
              Esta seguro que quiere eliminar la cuenta {{ account.accountName }}
            </h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="removeAccount()">Aceptar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeDeleteModal()">Cancelar</button>          
          </div>
        </div>
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
        showDeleteModal: false,
        urlDeleted: 'https://618ab08e34b4f400177c4823.mockapi.io/accounts/',
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
      closeDeleteModal(){
        this.showDeleteModal = false
      },
      async removeAccount() {
        let { data: deletedAccount } = await this.axios.delete(this.urlDeleted + this.account.id);
        console.log("AXIOS DELETE ACCOUNT", deletedAccount);
      }
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

  .remove-account {
    text-align-last: center;
  }

  .card-link {
    color: #000;
    font-weight: bold;
  }

  .warning {
    color: rgb(128, 0, 0);
  }
</style>
