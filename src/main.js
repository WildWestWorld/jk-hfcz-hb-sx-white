import Vue from 'vue'
import App from './App.vue'

import 'amfe-flexible';
import 'intersection-observer';

import "@/assets/style/reset.css"


import store from './store/index.js'
import router from "@/router";

// Vant组件专区
import { NavBar, Button, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Search, Tab, Tabs, Area, Popup, Toast, Dialog, PullRefresh, List } from 'vant';
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(PullRefresh);
Vue.use(List);




Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
