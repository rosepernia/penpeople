<template>
 <header class="menu">
    <router-link to="/">
      <LogoMini/>
    </router-link>
    <nav class="navbar navbar-expand-sm navbar-light">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/autores"><span class="menu-item">Autores</span><i class="bi bi-search"></i></router-link>
          </li>
          <li>
            <router-link to="/nueva-historia"><span class="menu-item">Crear Historia</span><i class="bi bi-journal-text"></i></router-link>
          </li>
          <li>
            <router-link to="/registro"><span class="menu-item">Nuevo registro</span><i class="bi bi-person-plus"></i></router-link>
          </li>
          <li>
            <LoginBox/>
          </li>
        </ul>
      </div>
    </nav>

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
  .prueba{
    border: 1px solid red;
  }
}

.navbar-toggler{
  border: none;
}

</style>
