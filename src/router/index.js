import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Levels from "../views/Levels";
import Game from "../views/Game";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/", redirect: !store.getters.isAuth ? "/login" : "/levels" },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/levels", component: Levels, meta: { protected: true } },
    { path: "/game", component: Game, meta: { protected: true } },
    { path: "/:notFound(.*)", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.protected && !store.getters.isAuth) next("/login");
  else if (
    (to.path === "/login" || to.path === "/signup") &&
    store.getters.isAuth
  ) next("/levels");
  else if (to.path === "/game" && !store.getters.level) next("/levels");
  else next();
});

export default router;
