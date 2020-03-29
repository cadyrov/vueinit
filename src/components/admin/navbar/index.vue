<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#" >REHAU {{currentPageHeader}}</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto ">
                </ul>
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Редактирование заказов</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Список заказов</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" @click="isHideMenu = !isHideMenu" href="#">{{user.username}}</a>
                    </li>
                </ul>
                    <div class="btn-group show">

                        <div class="btn-group dropleft">
                            <div
                                    class="dropdown-menu menushow"
                                    style="border-radius:1px;"
                                    :class="{show: !isHideMenu}"
                            >
                                <li>
                                    <a class="dropdown-item" @click="toChangePassword">Сменить пароль</a>
                                </li>
                                <li>
                                    <div class="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a v-if="can('settings')" class="dropdown-item" @click="toPekCities">Города ПЭК</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" @click="toUsers">Пользователи</a>
                                </li>
                                <li>
                                    <div class="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a class="dropdown-item" @click="toLogout">Выход</a>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>
</template>


<script>
  import Vuex from 'vuex'
  import Acl from '../../../utils/acl'

  export default {
    mixins: [Acl],
    name: 'navbar',
    data() {
      return {
        isHideMenu: true,
      }
    },
    computed: {
      ...Vuex.mapGetters({
        isAuthenticated: 'auth/isAuthenticated',
        user: 'auth/user',
        currentPageHeader: 'app/currentPageHeader',
      }),
    },
    methods:{
      toLogout(){
        this.$router.push('/logout')
        this.isHideMenu = !this.isHideMenu
      },
      toChangePassword(){
        this.$router.push('/changepassword')
        this.isHideMenu = !this.isHideMenu
      },
      toUsers(){
        this.$router.push('/users')
        this.isHideMenu = !this.isHideMenu
      },
      toPekCities(){
        this.$router.push('/pekcity')
        this.isHideMenu = !this.isHideMenu
      },
    }
  }
</script>

<style>
    .menushow {
        transform: translate3d(-202px, 27px, 0px);
    }
</style>
