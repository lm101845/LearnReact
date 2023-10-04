import Vue from 'vue'
import App from './App.vue'


// JSX语法
Vue.component('TestDemo', {
  data() {
    return {
      level: 2
    };
  },
  render(h) {
    // h->createElement
    return h(`h${this.level}`, null, ["我是标题"])
  }
}); 


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
