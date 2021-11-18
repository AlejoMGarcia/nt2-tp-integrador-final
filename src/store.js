import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        loggedUser : null,
        selectedAccount: null
    },
    actions : {
        selectAccount({commit}, account) {
            // console.log('action -> selectAccount', account, new Date().toLocaleString())
            commit('selectAccount',account)
        },
        // loggedUser({commit}, user) {
        //     console.log('action -> contarDown', cant, new Date().toLocaleString())
        //     setTimeout(() => {
        //         commit('decrementar',cant)
        //     },2000)
        // },
    },
    mutations : {
        selectAccount(state, account) {
            state.selectedAccount = account
        },
        loggedUser(state, user) {
            state.loggedUser = user
        }
    }
})
