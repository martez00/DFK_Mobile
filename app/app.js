import Vue from "nativescript-vue";
import VueAxios from 'vue-axios'
import App from "./components/App.vue";
import Home from "./components/Home.vue";
import Schedule from "./components/Schedule.vue";
import Results from "./components/Results.vue";
import Table from "./components/Table.vue";
import Players from "./components/Players.vue";
import Post from "./components/Post.vue";
import DrawerContent from "./components/DrawerContent.vue";
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
  render(h) {
    return h(
      App,
      [
        h(DrawerContent, { slot: 'drawerContent' }),
        h(Home, { slot: 'mainContent' })
      ]
    )
  }
}).$start();
