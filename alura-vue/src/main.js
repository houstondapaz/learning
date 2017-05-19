import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { routes } from './routes';
import msg from './pt_BR';
//SASS
//node-sass sass-loader -dev
//BOOTSTRAP
// css-loader && style-loader  -dev
import 'bootstrap/dist/css/bootstrap.css';
//Para usar a diretiva globalmente
//import './directives/Transform';

Vue.use(VeeValidate, {
	locale: 'pt_BR',
	dictionary: {
		pt_BR: {
			messages: msg
		}
	}
});
Vue.use(VueResource);
//Setando o dominio padrão
// Vue.http.options.root = "http://localhost:3000/v1";
// Vue.http.interceptors.push((req, next) => {

//     // é possível colocar informações no header antes do envio da requisição
//     req.headers.set('Authorization', 'informação de segurança aqui');
//     console.log('Lidando com o request');

//     next(res => {
//       console.log('Lidando com a resposta')
//       // é possível acessar os dados da reposta e realizar transformações antes
//       console.log(res.body);
//     });

// });
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
