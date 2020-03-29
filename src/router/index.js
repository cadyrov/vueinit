import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '../components/admin/login'
import Logout from '../components/admin/logout'
import Users from '../components/admin/users'
import Profile from '../components/admin/users/profile'
import ChangePassword from '../components/admin/users/changePassword'
import RightUser from '../components/admin/users/right'
import Registration from '../components/admin/registration'
import Restore from '../components/admin/restore'
import Activate from '../components/admin/activate'
import Pekcity from '../components/citypek'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (store.state.auth.isAuthenticated !== true) {
    next()
    return
  }
  next('/login')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.isAuthenticated === true) {
    next()
    return
  }
}


const check = (to, from, next) => {
  store.dispatch('auth/check')
  .then(() => {
    next()
  })
  .catch(error => {
    console.log('error: ', error)
    next('/login')
  })
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: check, ifNotAuthenticated,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/profile/:id',
      name: 'cliencardProfile',
      component: Profile,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: ChangePassword,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/rightsUser/:id',
      name: 'rightsUser',
      component: RightUser,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/restore',
      name: 'restore',
      component: Restore,
    },
    {
      path: '/activate/:key',
      name: 'activate',
      component: Activate,
    },
    {
      path: '/pekcity',
      name: 'pekcity',
      component: Pekcity,
      beforeEnter: check, ifNotAuthenticated,
    },
  ],
})
