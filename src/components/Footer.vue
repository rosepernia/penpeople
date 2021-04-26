<template>
  <div class="black clickable" :class="{hide:!info}" @click="showInfo">
    <div class="center box popup">
      <p>¡Bienvenido a PenPeople!</p>
      <p>Penpeople es una plataforma en la que las historias fluyen "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>  
    </div>
  </div>
  <div class="footer">
    <p>© Penpeople 2021 - 
      <a href="http://bit.ly/penpeople" target="_blanl¡k">GitHub</a>
    </p>
    <i class="bi bi-info-circle clickable size3" @click="showInfo"></i>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Footer",
  setup() {
    const info = ref(false)

    const showInfo = () => {
      info.value = !info.value
    }
   
    return {
      info,
      showInfo
    }
  },
}
</script>

<style lang="scss" scoped>
.popup{
  position: fixed;
  z-index: 30;
  width: 90%;
  max-width: 450px;
}
.black{
  position: absolute;
  top: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.692);
  width: 100%;
  height: 100vh;
}
.hide{
  display: none;
}
.footer{
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #f4f1f1d7;
  p{
    padding-top: 8px;
    text-align: center;
    margin: 0;
  }
  i:before{
    position: absolute;
    bottom: 8px;
    left: 8px;
  }
}
</style>