<template>

  <section class="src-components-statements">


    <h3 v-if="!accountWasSelected()" class="alert alert-warning mt-4">Debe seleccionar una cuenta</h3>
    <h2 v-else class="mt-4" style="text-align-last:center">Movimiento de cuenta: {{ getSelectedAccount().accountName }}</h2>
    <br>

    <div v-if="disabledSpinner" class="spinner-border align-center mt-3" role="status">
      <span class="sr-only">Cargando movimientos...</span>
    </div>
    
    <div v-if="statemenst.length" class="list-group">
      <div v-for="(statement, index) in statemenst" :key="index">
        <a @click="openDetail(statement)" :class="getClassItem(statement)" data-toggle="modal" data-target="#staticBackdrop">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"> {{ getStatementTitle(statement) }} </h5>
            <small style="font-weight: bold;"> {{ statement.createdAt }} </small>
          </div>
          <p class="mb-1"> {{ statement.amount | currency(statement.currency) }} </p>
          <!-- <small> {{  }} </small> -->
        </a>
      </div>      
    </div>
    <h3 v-else-if="statemenst.length == 0 && accountWasSelected()" class="alert alert-info">No hay movimientos para esta cuenta</h3>

    <div v-if="statementDetail" class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"> {{ statementDetail.type | toUpper }} </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6>
              Referencia: {{ statementDetail.reference }}
            </h6>
            <h6>
              Importe: {{ statementDetail.amount | currency(statementDetail.currency) }}
            </h6>
            <h6> Razón: </h6>
            <small> {{ statementDetail.reason }} </small>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeDetail()">Close</button>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-statements',
    props: [],
    mounted () {
      this.getStatementsForAccount()
    },
    data () {
      return {
        url: 'https://618ab08e34b4f400177c4823.mockapi.io/statements',
        statemenst: [],
        disabledSpinner: false,
        statementDetail: null,
        showStatementDetail: false,
        statementIdDetail: null,
      }
    },
    methods: {
      async getStatementsForAccount() {
        let selectedAccount = this.getSelectedAccount()
        if(selectedAccount == null) return 
        
        this.statemenst = []
        this.disabledSpinner = true

        try {
          let response = await this.axios(this.url)
          let data = response.data
          this.statemenst = data.filter(statement => {
            return statement.accountOrigin == selectedAccount.accountId
          })
          this.disabledSpinner = false
        }
        catch(error) {
          console.error('Error AXIOS', error)
          this.disabledSpinner = false
        }
      },
      openDetail(statement) {
        this.statementIdDetail = statement.id
        this.statementDetail = statement
        this.showStatementDetail = true
      },
      closeDetail(){
        this.statementDetail = null,
        this.showStatementDetail = false
      },
      getStatementTitle(statement) {
        return `${statement.type.toUpperCase()}: ${statement.reference}` 
      },
      getClassItem(statement){
        let itemClass = 'list-group-item list-group-item-action'

        if(this.statementIdDetail == statement.id)
          itemClass += ' active'

        return itemClass
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-statements {

  }

  .list-group-item {
    background-color: blanchedalmond;
  }

  .active {
    background-color: blue;
  }
</style>
