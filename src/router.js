import Vue from 'vue'
import VueRouter from 'vue-router'

import Accountstate from './components/Accountstate'
import Statements from './components/Statements'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes : [
        // { path: '/', redirect: '/account-state' },
        { path: '/account-state', component: Accountstate },
        { path: '/statements', component: Statements },    
    ]
})
