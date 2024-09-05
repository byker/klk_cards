
import Vue from 'vue'; // Import Vue library
import VueRouter from 'vue-router'; // Import the VueRouter library
import App from './components/App.vue'; // Import the App component
import router from './router'; // Import the router
import store from './vuex'; // Import the Vuex store
import vuetify from './vuetify'; // Import Vuetify file
import Vuetify from 'vuetify'; //Import Vuetify library
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS

Vue.use(Vuetify)
Vue.use(VueRouter);


const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App),
});
