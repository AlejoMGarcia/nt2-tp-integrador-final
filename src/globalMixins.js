import Vue from 'vue'

export const globalMixin = {
    beforeMount() {
      
    },
    mounted() {
      
    },
    methods : {
        getSelectedAccount() {
            let selectedAccount = this.$store.state.selectedAccount
            return selectedAccount
        },
        accountWasSelected() {
            return this.getSelectedAccount() != null
        },
    },
    computed : {
   
    }
}

Vue.mixin(globalMixin)
