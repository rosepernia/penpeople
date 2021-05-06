<template>
<div class="center home">
  <Logo/>
  <div v-if="superadmin==true">
    <div class="line" >
      <router-link to="/administrar"><p class="admin">ADMINISTRAR</p></router-link>
    </div>
    <router-link to="/administrar"><i class="bi bi-arrow-right-circle clickable"></i></router-link>
  </div>
  <div v-if="superadmin==false || superadmin==undefined">
    <div class="line" >
      <router-link to="/libros"><p>LEER</p></router-link>
    </div>
    <router-link to="/libros"><i class="bi bi-arrow-right-circle clickable"></i></router-link>
  </div>
</div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { ref, watch, onMounted } from 'vue'
import { useStore } from "vuex"

export default {
  name: 'Home',
  components: {
    Logo
  },
  setup(){
    const store = useStore()
    const superadmin = ref(false)

    watch(store.state, () => {
      superadmin.value = store.state.user.superadmin
      })

    onMounted(() => {
      superadmin.value = store.state.user.superadmin
    })

    return{
      superadmin
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  padding-top: 30px;
  text-align: center;
}
.line{
  margin: 0 auto;
  width: 450px;
  height: 25px;
  border-bottom: 1px solid $textColor;
  p{
    font-size: $size4;
    background-color: $backgroundColor;
    margin: 0 auto;
    width: 130px;
  }
  .admin{
      width: 270px;
    }
}
i::before{
  padding-top: 30px;
  font-size: $size5;
}

@media (max-width: 990px){
  .line{
    width: 380px;
  }
}
@media (max-width: 575px){
  .line{
    width: 280px;
    height: 20px;
    p{
      font-size: $size3;
      width: 100px;
    }
  }
  i::before{
    padding-top: 20px;
    font-size: $size4;
  }
}
</style>
