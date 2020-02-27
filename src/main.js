import Vue from 'vue'
import vueDebounce from 'vue-debounce';
import VueRouter from 'vue-router'
import Books from './components/Books.vue'
import Authors from './components/Authors.vue'
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(vueDebounce);
Vue.config.productionTip = false

const routes = [
  { path: '/books', component: Books },
  { path: '/authors', component: Authors }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
