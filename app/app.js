import Vue from "nativescript-vue";
import VueAxios from 'vue-axios'
import App from "./components/App";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import Results from "./components/Results";
import Table from "./components/Table";
import Players from "./components/Players";
import Post from "./components/Post";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";

Vue.use(RadSideDrawer);
Vue.use(VueAxios);

const routes = {
  Home,
  Schedule,
  Results,
  Table,
  Players,
  Post
};

Vue.config.silent = (TNS_ENV === 'production');

Vue.prototype.$routes = routes;

new Vue({
    render (h) {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Home, { slot: 'mainContent' })
          ]
        )
      }
  }).$start();
