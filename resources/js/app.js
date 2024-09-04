import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';

import router from './router'
import './bootstrap'
import vuex from './vuex'
import store from './vuex'; // Import the Vuex store

Vue.use(VueRouter);

// Create the Vue instance
const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App) // Render the App component

});


export default store