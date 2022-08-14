import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import CreateBlog from "../views/CreateBlog.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: RegisterView,
    },
    {
      path: "/signin",
      name: "login",
      component: LoginView,
    },
    {
      path: "/create-blog",
      name: "createblog",
      component: CreateBlog,
    },
  ],
});

export default router;
