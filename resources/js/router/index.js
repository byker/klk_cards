import Vue from "vue";
import VueRouter from "vue-router";
import Cards from "../components/Cards.vue";
import EditCard from "../components/EditCard.vue";
import EditProduct from "../components/EditProduct.vue";
import Login from "../components/auth/Login.vue";
import axios from "axios";
import store from "../vuex";

Vue.use(VueRouter); // Install the VueRouter plugin

// Define your routes
const routes = [
    { path: "/", component: Cards },
    { path: "/login", component: Login },
    { path: "/cards/:id/edit", component: EditCard },
    { path: "/products/:id/edit", component: EditProduct },
];

// Create the router instance
const router = new VueRouter({
    mode: "history",
    routes, // short for `routes: routes`
});

// Check if the user is logged in
async function isLoggedIn() {
    // Check if the token exists
    if (
        typeof localStorage.getItem("token") === "undefined" ||
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === ""
    ) {
        return false;
    }
    
    console.log("localStorage.getItem('token')", localStorage.getItem("token"));
    // Validate token
    const response = axios
        .post("/api/validate-token")
        .then((response) => {
            return response.data.valid;
        })
        .catch((error) => {
            console.log("error", error);
            return false;
        });
    return response;
}

// Redirect to login if not logged in
router.beforeEach(async (to, from, next) => {
    const isLoggedInResult = await isLoggedIn();
    store.commit('setIsLoggedIn', isLoggedInResult);

    if (to.path !== "/login" && !isLoggedInResult) {
        console.log('to.path', to.path, 'isLoggedInResult', isLoggedInResult);

        next("/login");
    } else if (to.path === "/login" && isLoggedInResult) {
        console.log('to.path', to.path, 'isLoggedInResult', isLoggedInResult);
        store.dispatch('setCurrentUser');
        next("/");
    } else {
        console.log('to.path', to.path, 'isLoggedInResult', isLoggedInResult);
        store.dispatch('setCurrentUser');
        next();
    }
});

export default router;
