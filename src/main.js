import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small', zIndex: 3000});

import store from './store/index'

router.beforeEach((to, from, next) => {
  console.log(store.state.common.activeModule)
  store.commit('common/setActiveModule', to.name)
  next()
})

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
