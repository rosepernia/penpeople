<template>
  <header class="menu">
    <div>
      <router-link to="/">
        <LogoMini/>
      </router-link>
      <router-link to="/autores"><span class="menu-item">Autores</span><i class="bi bi-search"></i></router-link>
      <router-link to="/nueva-historia" v-if="admin"><span class="menu-item">Crear Historia</span><i class="bi bi-journal-text"></i></router-link>
    </div>
    <div>
      <router-link to="/registro" v-if="!registered"><span class="menu-item">Nuevo registro</span><i class="bi bi-person-plus"></i></router-link>
      <LoginBox/>
    </div>
 </header>
</template>

<script>
import LogoMini from "@/components/LogoMini";
import LoginBox from "@/components/LoginBox";
import { ref, watch } from 'vue';
import { useStore } from "vuex"
export default {
  name: 'Menu',
  components: {
    LogoMini,
    LoginBox
  },
  setup(){
    const store = useStore()
    const registered = ref(false)
    const admin = ref(false)
    

    function login(user){
      admin.value = user.admin
      console.log(user.admin)
    }

    watch(store.state, () => {
      registered.value = store.state.user.active
      admin.value = store.state.user.admin
      } )

    return{
      registered,
      admin,
      login
    }
  }
}
</script>

<style lang="scss">

.menu{
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 120px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f4f1f1d7;
  div{
    display: flex;
    align-items: center;
  }
  &-item{
    margin-left: 20px;
  }
  i::before{
    margin: 0 10px;
  }
}

@media (max-width: 575px){
  span{
    display: none;
  }
}

</style>
