import Vue from 'vue'
import Vuex from 'vuex'
import app from './admin/app'
import auth from './admin/auth'
import navigation from './admin/navigation'
import citypek from "./components/citypek";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    auth,
    navigation,
    citypek
  },
  strict: debug,
})
