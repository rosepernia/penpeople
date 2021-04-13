<template>
  <div class="loginbox" v-if="!registrado">
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Contraseña">
    <i class="bi bi-arrow-right-circle size2 button button-arrow" @click="login"></i>
  </div>
  <div class="loginbox" v-else>
    <div class="user">
      <img src="/img/users/default.jpg" alt="Avatar usuario" class="avatar">
      <p>{{email}}</p> 
    </div>
    <p class="button" @click="login">Salir</p>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex"

export default {
  name: 'LoginBox',
  setup(){
    const store = useStore()
    let email = ref("")
    let password = ref("")
    let registrado = ref(false)
    
    const login = () => {
      if(email.value=='pepa' && password.value=='1234')
        registrado.value = !registrado.value
    }

    return{
      email,
      password,
      login,
      registrado
    }
  }
}
</script>

<style lang="scss" scoped>
.loginbox{
  margin: 0 20px 0 20px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  p{
    margin: 0;
  }
}
.user{
  width: 80%;
  display: flex;
  justify-content: center;
}
input{
  width: 160px;
  height: 30px;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
}
.button-arrow{
  position: absolute;
  right: 0;
  top: 50px
}
.avatar{
  margin-right: 15px;
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  box-shadow: 1px 1px 3px #cfcdcd;
}
</style>