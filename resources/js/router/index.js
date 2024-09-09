import Vue from "vue";
import VueRouter from "vue-router";
import Cards from "../components/Cards.vue";
import EditCard from "../components/EditCard.vue";
import EditProduct from "../components/EditProduct.vue";

Vue.use(VueRouter); // Install the VueRouter plugin

// Define your routes
const routes = [
    { path: "/home", component: Cards },
    { path: "/cards/:id/edit", component: EditCard },
    { path: "/products/:id/edit", component: EditProduct },
];

// Create the router instance
const router = new VueRouter({
    mode: "history",
    routes, // short for `routes: routes`
});

export default router;
