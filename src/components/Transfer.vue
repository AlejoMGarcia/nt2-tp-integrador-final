<template lang="html">

  <section class="src-components-transfer">
    <div class="jumbotron">
      <h3 v-if="!accountWasSelected()" class="alert alert-warning mt-4">Debe seleccionar una cuenta</h3>
      <h3 v-else-if="!selectedAccountHasFounds()" class="alert alert-info mt-4">No cuenta con fondos en esta cuenta para realizar transferencias.</h3>

      <vue-form v-else :state="formstate" @submit.prevent="transfer()">
        <h3> Transferencia desde: {{ getSelectedAccount().accountName }} </h3>
        <h4> Fondos actuales: {{ getSelectedAccount().amount | currency(getSelectedAccount().currency) }} </h4>
        <h4> Fondos luego de transferir: {{ calculateFoundsAfterTransfer | currency(getSelectedAccount().currency) }} </h4>

        <hr>

        <label for="targetAccount">Cuenta destino:</label>
        <div v-if="targetAccounts.length">
          <select id="targetAccount" name="targetAccount" class="btn btn-secondary dropdown-toggle" v-model="formData.accountTarget">
            <option v-for="(targeAccount, index) in targetAccounts" :key="index" 
              v-bind:value="targeAccount.accountId"> {{ getFieldText(targeAccount)  }} 
            </option>
          </select>
        </div>
        <br>

        <validate tag="div">
          <label for="amount">Importe</label>
          <input type="number" id="amount" v-model.number="formData.amount" required name="amount" 
            autocomplete="off" class="form-control"/>
    
          <field-messages name="amount" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">El importe a transferir es requerido.</div>
          </field-messages>
        </validate>
        <br>
        <h3 v-if="!isValidAmountToTransfer()" class="alert alert-warning">El monto a transferir no esta permitido</h3>


        <validate tag="div">
          <label for="reference">Referencia</label>
          <input type="text" id="reference" name="reference" class="form-control"
            v-model="formData.reference" required
            :maxlength="maxlength" autocomplete="off">

          <field-messages name="reference" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">
              La referencia de la operación es requerida.
            </div>
          </field-messages>
          <div v-if="referenceHasMaxLength()" class="alert alert-danger mt-2">
              La referencia debe tener como máximo {{maxlength}} caracteres.
          </div>
        </validate>
        <br>

        <validate tag="div">
          <label for="reason">Razón</label>
          <input type="text" id="reason" name="reason" 
              class="form-control"
              v-model="formData.reason" 
              required
              autocomplete="off">

          <field-messages name="reason" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">
              La razón de la operación es requerida.
            </div>
          </field-messages>
        </validate>
        <br>

        <button class="btn btn-success my-4" :disabled="formstate.$invalid ||!isValidAmountToTransfer()" type="submit">Transferir</button>
      </vue-form>

    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-transfer',
    props: [],
    mounted () {
      this.getAccountsTargetList()
    },
    data () {
      return {
        maxlength : 20,
        url: 'https://618ab08e34b4f400177c4823.mockapi.io/accounts',
        urlPostStatement: 'https://618ab08e34b4f400177c4823.mockapi.io/statements',
        targetAccounts: [],
        formstate : {},
        formData : this.getInitialData(),
      }
    },
    methods: {
       getInitialData(){
        return {
          accountTarget: null,
          amount: 0,
          reason: null,
          reference: null
        }
      },
      async getAccountsTargetList() {
        this.targetAccounts = []
        
        let selectedAccount = this.getSelectedAccount()
        if(selectedAccount == null) return 

        try {
          let response = await this.axios(this.url)
          let data = response.data
          this.targetAccounts = data.filter(account => {
            return account.userId != this.userId && account.currency == selectedAccount.currency
          })
        }
        catch(error) {
          console.error('Error AXIOS', error)
        }

      },
      getFieldText(targetAccount){
        return `${targetAccount.accountNumber} - ${targetAccount.accountName} `
      },
      selectedAccountHasFounds() {
        let selectedAccount = this.getSelectedAccount()
        return selectedAccount.amount > 0
      },
      async transfer(){
        let selectedAccount = this.getSelectedAccount()

        this.formData.type = 'transferencia'
        this.formData.createdAt = new Date().toLocaleString()
        this.formData.accountOrigin = selectedAccount.accountId
        this.formData.currency = selectedAccount.currency
        
        selectedAccount.amount -= this.formData.amount

        await this.axios.post(this.urlPostStatement, this.formData, {'content-type':'application/json'});
        await this.axios.put(this.url + '/' + selectedAccount.id, selectedAccount, {'content-type':'application/json'});

        this.formData = this.getInitialData()
        this.formstate._reset() 
      },
      isValidAmountToTransfer() {
        let selectedAccount = this.getSelectedAccount()
        return this.formData.amount <= selectedAccount.amount
      },
      referenceHasMaxLength(){
        return this.formData.reference && this.formData.reference.length == this.maxlength
      },
    },
    computed: {
      calculateFoundsAfterTransfer() {
        let amountToTransfer = this.formData.amount
        return this.getSelectedAccount().amount - amountToTransfer
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-transfer {

  }

  .jumbotron {
    background-color: lightsteelblue;
    color: dimgray;
  }

</style>
