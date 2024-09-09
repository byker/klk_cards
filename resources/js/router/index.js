import Vue from "vue";
import VueRouter from "vue-router";
import Cards from "../components/Cards.vue";
import EditCard from "../components/EditCard.vue";
import EditProduct from "../components/EditProduct.vue";
import Login from "../components/auth/Login.vue";
import axios from "axios";

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
        localStorage.getItem("token") === null
    ) {
        return false;
    }

    // Validate token
    try {
        const response = await axios.post(
            "/api/validate-token",
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.valid;
    } catch (error) {
        console.error("tokenerror", error);
        return false;
    }
}

// Redirect to login if not logged in
router.beforeEach(async (to, from, next) => {
    const isLoggedInResult = await isLoggedIn();
    if (to.path !== "/login" && !isLoggedInResult) {
        next("/login");
    } else {
        next();
    }
});

export default router;
