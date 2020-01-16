import Vue from 'vue'
import books from './Books.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(books),
}).$mount('#app')
