import Vue from 'vue'
import VueRouter from 'vue-router'

import Accountstate from './components/Accountstate'
import Statements from './components/Statements'
import Transfer from './components/Transfer'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes : [
        { path: '/', redirect: '/account-state' },
        { path: '/account-state', component: Accountstate },
        { path: '/statements', name: 'statements', component: Statements },
        { path: '/transfer', name: 'transfer', component: Transfer },
    ]
})
