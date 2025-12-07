import { createRouter, createWebHistory } from 'vue-router'
// import { useUser } from '../store/userLogin'




//cac component
import Home from '../view/Home.vue'
import BookList from '../view/BookList.vue'
import UserLogin from '../view/UserLogin.vue'
import UserRegister from '../view/UserRegister.vue'
import BookDetail from '../components/BookDetail.vue'
import BorrowAdd from '../view/BorrowAdd.vue'
import stafflogin from '../view/stafflogin.vue'
import manaBook from '../view/manaBook.vue'
import manaUser from '../view/manaUser.vue'
import manaAdmin from '../view/manaAdmin.vue'
import manaBorrow from '../view/manaBorrow.vue'
import manaAuthor from '../view/manaAuthor.vue'
import mybook from '../view/mybook.vue'
import manaPublisher from '../view/manaPublisher.vue'
// const userStore = useUser()
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { notshow: true },
    },
    {
        path: "/books",
        name: "bookList",
        component: BookList,
    },
    {
        path: "/user/login",
        name: "UserLogin",
        component: UserLogin,
    },
    {
        path: "/user/register",
        name: "UserRegister",
        component: UserRegister,
    },
    {
        path: "/books/:id",
        name: "BookDetail",
        component: BookDetail,
    },
    {
        path: "/borrow/:id",
        name: "BorrowAdd",
        component: BorrowAdd,
        meta: { requireAuth: true }
    },
    {
        path: "/staff/login",
        name: "StaffLogin",
        component: stafflogin,

    },
    {
        path: "/staff/manaBook",
        name: "manaBook",
        component: manaBook,
        meta: { requireAdmin: true, requireAuth: true }

    },
    {
        path: "/staff/manaUser",
        name: "manaUser",
        component: manaUser,
        meta: { requireAuth: true, requireAdmin: true }

    },
    {
        path: "/staff/manaBorrow",
        name: "manaBorrow",
        component: manaBorrow,
        meta: { requireAuth: true, requireAdmin: true }

    },
    {
        path: "/staff/manaBook",
        name: "manaBook",
        component: manaBook,
        meta: { requireAuth: true, requireAdmin: true }

    },
    {
        path: "/staff/manaAdmin",
        name: "manaAdmin",
        component: manaAdmin,
        meta: { requireAuth: true, requireAdmin: true }

    },
    {
        path: "/staff/manaAuthor",
        name: "manaAUthor",
        component: manaAuthor,
        meta: { requireAuth: true, requireAdmin: true }

    },
    {
        path: "/user/mybook",
        name: "mybook",
        component: mybook,
        meta: { requireAuth: true }
    },
    {
        path: "/staff/manapublisher",
        name: "manapublisher",
        component: manaPublisher,
        meta: { requireAuth: true, requireAdmin: true }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const isLogin = !!sessionStorage.getItem("user")

    if (to.meta.requireAuth && !isLogin) {
        alert("Vui lòng đăng nhập!")
        next({
            path: "/user/login",
            query: { redirect: to.fullPath },
        })
    } else {
        next()
    }
})
router.beforeEach((to, from, next) => {
    const user = JSON.parse(sessionStorage.getItem("user"))

    if (to.meta.requireAdmin && user.role != 'admin') {
        alert("Truy cập không được phép!")
        next({
            path: "/",
        })
    } else {
        next()
    }
})
export default router
