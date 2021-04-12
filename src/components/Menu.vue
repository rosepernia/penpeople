<template>
 <nav class="menu">
    <div>
      <router-link to="/">
        <LogoMini/>
      </router-link>
      <router-link to="/autores">Autores</router-link> 
    </div>
    <div>
      <router-link to="/registro">Nuevo registro</router-link> 
    </div>
 </nav>
</template>

<script>
import LogoMini from "@/components/LogoMini";
export default {
  name: 'Menu',
  components: {
    LogoMini,
  },
}
</script>

<style lang="scss">

.menu{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 2px solid red;
  div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
  }
}

</style>
