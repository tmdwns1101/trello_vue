import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import NotFound from "@/components/NotFound";
import Board from "@/components/Board";
import Card from "@/components/Card";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/b/:bid",
    component: Board,
    children: [
      {
        path: "c/:cid",
        component: Card
      }
    ]
  },

  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
