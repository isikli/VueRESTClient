import Vue from 'vue'
import App from './App.vue'
import vueDebounce from 'vue-debounce';

Vue.use(vueDebounce);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
