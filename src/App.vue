<template>
  <div id="app">
    <div class="container-fluid">
        <errormessage class="col-8 offset-2 mt-1 absolutealert"></errormessage>
      <div class="row">
        <div class="col padding_none" style="padding-left:0;padding-right:0;">
          <navbar v-if="isAuthenticated"/>
          <div class="container-fluid">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/admin/navbar'
import Vuex from 'vuex'
import errormessage from "./components/errormessage";
export default {
  name: 'app',
  data () {
      return {
        name: 'app',
      }
    },
  components: {
    Navbar,
    errormessage
  },
  computed: {
    ...Vuex.mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    })
  },
  methods: {
    check () {
      this.$store.dispatch('auth/check')
    }
  },
  created () {
    this.$store.dispatch('app/setDictionary')
  }
}
</script>

<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
    .absolutealert{
        position: absolute;
        z-index: 1000;
    }

</style>

