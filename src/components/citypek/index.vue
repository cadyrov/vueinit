<template>
  <section>
      <div class="form-row">
        <div class="col-1">
          <button class="btn btn-primary" @click="saveData">Добавить</button>
        </div>
        <div class="col-7"></div>
        <pagination class="col-4" @setPage="setPage" :padding="2" :totalpages="pagination.total/pagination.limit" :page="pagination.page"></pagination>
      </div>
      <table class="table table-border table-hover">
        <tr>
          <th>Название</th>
          <th>Идентификатор</th>
          <th>Регион</th>
          <th></th>
          <th></th>
        </tr>
        <tbody v-for="model in datalist" :key="model.id">
          <tr v-if="edit == null || edit.id != model.id">
            <td>{{model.name_pek}}</td>
            <td>{{model.id_pek}}</td>
            <td>{{model.nameregion_pek}}</td>
            <td><a class="fui-new" @click="toChange(model)" ></a></td>
            <td width="60px;"><vue-confirmation-button
                    :css="'fui-trash'"
                    v-on:confirmation-success="deleteData(model.id)">
            </vue-confirmation-button></td>
          </tr>
          <tr v-if="edit != null && edit.id == model.id">
            <td><input type="text" class="form-control" v-model="edit.name_pek" placeholder="Название"></td>
            <td><input type="text" class="form-control" v-model="edit.id_pek" placeholder="Идентификатор"></td>
            <td><input type="text" class="form-control" v-model="edit.nameregion_pek" placeholder="Регион"></td>
            <td><a class="fui-check" @click="update"></a></td>
            <td><a class="fui-cross" @click="edit = null"></a></td>
          </tr>
        </tbody>

      </table>
  </section>
</template>

<script>
  import Acl from '../../utils/acl'
  import Vuex from 'vuex'
  import vueConfirmationButton from '../../utils/confirmButton'
  import pagination from "../../utils/pagination";

  export default {
    mixins: [Acl],
    name: 'citypek',
    data () {
      return {
        form:{
          name_pek: 'Новый',
          id_pek: '0',
          nameregion_pek: 'неизвестный'
        },
        page: null,
        edit: null,
      }
    },
    components: {
      VueConfirmationButton: vueConfirmationButton,
      pagination
    },
    computed: {
      ...Vuex.mapGetters({
        apiUrl: 'app/apiUrl',
        datalist: 'citypek/datalist',
        pagination: 'citypek/pagination',
      }),
    },
    methods: {
      ...Vuex.mapMutations({
        setMessage: 'app/setMessage',
        setError: 'app/setError',
        setHeader:'app/setCurrentPageHeader'
      }),
      ...Vuex.mapActions({
        save: 'citypek/save',
        find: 'citypek/find',
        drop: 'citypek/delete'
      }),
      saveData(){
        this.setError(null)
        this.save(this.form)
                .then(() =>{
                  this.findData()
                })
      },
      update() {
        this.setError(null)
        this.save(this.edit)
                .then(() =>{
                  this.edit = null
                  this.findData()
                })
      },
      deleteData(id){
        this.setError(null)
        this.drop(id)
                .then(() =>{
                  this.findData()
                })
      },
      toChange(model){
        this.edit = Object.assign({}, model)
      },
      setPage(i){
        this.page = i
        this.findData()
      },
      findData(){
        this.find({page:this.page})
      }
    },
    created() {
      this.setHeader('Города ПЭК')
      this.page = this.pagination.page
      this.findData()
    }
  }
</script>
