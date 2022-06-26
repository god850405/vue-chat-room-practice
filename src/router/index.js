import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import ChatRoom from "../pages/ChatRoom.vue";
import $store from "../store"

const routes = [
    { name: 'Login',path: '/', component: Login},
    { name: 'ChatRoom',path: '/ChatRoom', component: ChatRoom ,meta: { requiresAuth: true} },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth) && !$store.getters.isAuthorized){
        next({ name: 'Login' ,query: {redirect: to.fullPath } });
    }
    else{
        next();
    }
});


export default router;