// src/plugins/vuetify.js
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'; // Add Vuetify CSS


const opts = {};

export default new Vuetify(opts);