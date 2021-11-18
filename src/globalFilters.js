import Vue from 'vue'

Vue.filter('currency', function(amount, currency) {
    let sign = ''
    if(currency == 'PES')
        sign = '$ '
    else if(currency == 'USD')
        sign ='U$S '

    return sign + amount
})

Vue.filter('toUpper', function(value) {
    return value.toUpperCase()
})