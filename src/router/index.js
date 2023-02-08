import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/views/layout/Layout.vue'),
        redirect: '/login'
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: { title: '登录' }
    },

    {
        path: '/middle',
        name: 'middle',
        component: () => import('@/views/middle/Middle.vue'),
        meta: { title: '加载中' }
    },
    {
        path: '/enter',
        name: 'enter',
        component: () => import('@/views/enter/Enter.vue'),
        meta: { title: '白名单录入' }
    },


]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


//路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to)
    document.title = to.meta.title
    next()
})



// // 在刷新页面的时候重置当前路由
// activeRouter()
//
// function activeRouter() {
//     const permissions = sessionStorage.getItem("permissions")
//     if (permissions) {
//         const permission = JSON.parse(permissions)
//         let root = {
//             path: '/',
//             name: 'Layout',
//             component: Layout,
//             redirect: "/echart",
//             children: []
//         }
//         permission.forEach(p => {
//             let obj = {
//                 path: p.path,
//                 name: p.name,
//                 component: () => import("@/views/" + p.name)
//             };
//             root.children.push(obj)
//         })
//         if (router) {
//             router.addRoute(root)
//         }
//     }
// }



//路由守卫
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login' || to.path === '/register') {
//         next()
//         return
//     }
//     let permissions = sessionStorage.getItem("permissions") ? JSON.parse(sessionStorage.getItem("permissions")) : {}
//     if (!permissions || !permissions.length) {
//         next('/login')
//     } else if (!permissions.find(p => p.path === to.path)) {
//         next('/login')
//     } else {
//         next()
//     }
// })



export default router
