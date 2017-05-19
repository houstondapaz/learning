import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes'
//Para usar a diretiva globalmente
//import './directives/Transform';

Vue.use(VueResource)
//Setando o dominio padrão
// Vue.http.options.root = "http://localhost:3000/v1";
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
