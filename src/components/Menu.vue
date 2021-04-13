<template>
 <header class="menu">
    <div>
      <router-link to="/">
        <LogoMini/>
      </router-link>
      <router-link to="/autores"><span class="menu-item">Autores</span><i class="bi bi-search"></i></router-link>
      <router-link to="/nueva-historia"><span class="menu-item">Crear Historia</span><i class="bi bi-journal-text"></i></router-link> 
    </div>
    <div>
      <router-link to="/registro"><span class="menu-item">Nuevo registro</span><i class="bi bi-person-plus"></i></router-link>
      <LoginBox/>
    </div>
 </header>
</template>

<script>
import LogoMini from "@/components/LogoMini";
import LoginBox from "@/components/LoginBox";
export default {
  name: 'Menu',
  components: {
    LogoMini,
    LoginBox
  },
}
</script>

<style lang="scss">

.menu{
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  max-height: 120px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f4f1f1ef;
  div{
    display: flex;
    align-items: center;
  }
  &-item{
    margin: 0 10px 0 20px;
  }
}

</style>
