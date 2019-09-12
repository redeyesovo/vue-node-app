import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Nofind from './views/404'
import Login from './views/Login.vue'
import Home from './views/Home'
import InfoShow from './views/InfoShow'
import UserList from './views/UserList'
import MediaManage from './views/MediaManage'
import RepresentManage from './views/RepresentManage'
import PlatManage from './views/PlatManage'
import StationManage from './views/StationManage'
import OAManage from './views/OAManage'
import InrecordManage from './views/InrecordManage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {path: '/', redirect: '/index'},
      {path: '/register', name: 'register', component: Register },
      {path: '*', name: '/404', component: Nofind },
      {path: '/login', name: 'login', component: Login },
      {path: '/index', name: 'Index.vue', component: Index,
          children:[
              { path: '', component: Home },
              { path: '/home', name: 'home', component: Home },
              { path: '/infoshow', name: 'infoshow', component: InfoShow },
              { path: '/userlist', name: 'userlist', component: UserList },
              { path: '/mediamanage', name: 'mediamanage', component: MediaManage },
              { path: '/representmanage', name: 'representmanage', component: RepresentManage },
              { path: '/platmanage', name: 'platmanage', component: PlatManage },
              { path: '/stationmanage', name: 'stationmanage', component: StationManage },
              { path: '/oamanage', name: 'oamanage', component: OAManage },
              { path: '/inrecordmanage', name: 'inrecordmanage', component: InrecordManage },
          ]
      },
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;