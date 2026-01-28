import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");
  const isAuthPage = to.name === "Login" || to.name === "Register";

  if (isAuthPage && token) {
    return next({ name: "Dashboard" });
  }

  if (!isAuthPage && !token) {
    return next({ name: "Login" });
  }

  next();
});

export default router;
