<template>
  <div class="loginbox" v-if="!registered">
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Contraseña">
    <i class="bi bi-arrow-right-circle size2 clickable button-arrow" @click="login"></i>
    <div class="error">
      <p v-if="error!=''">{{error}}</p>
      <p v-if="error=='Contraseña incorrecta'" class="clickable" @click="forgetPassword">Pulsa para cambiarla</p>
      <p v-if="error=='Usuario no validado'" class="clickable" @click="validate">Pulsa para validar</p>
      <p v-if="sendMail">Revisa tu email</p>
    </div> 
  </div>
  <div class="loginbox" v-else>
    <div class="user clickable" @click="changeProfile" v-if="!user.value.superadmin">
      <img :src="require(`../assets/img/users/${user.value.avatar}`)" :alt="`Avatar ${user.value.nickname}`" class="avatar">
      <div>
        <p>{{user.value.nickname}}</p>
        <p v-if="user.value.admin==true" class="admin">Admin</p>
      </div>
    </div>
    <p v-if="user.value.superadmin">PenPeople Admin</p>
    <router-link to="/"><p class="clickable" @click="logout"><i class="bi bi-box-arrow-right"></i>Salir</p></router-link>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { ref, reactive, watch } from "vue";
import { useStore } from "vuex"

export default {
  name: 'LoginBox',
  setup(){
    const store = useStore()
    const router = useRouter()
    const email = ref("")
    const password = ref("")
    const registered = ref(false)
    const error = ref("")
    const sendMail = ref(false)
    const user = reactive({})

    const login = () => {
      fetch("http://localhost:8081/users/login",{
        method: "POST",
        body:JSON.stringify({email: email.value, password: password.value}),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          sendMail.value = false
          if(data.error) error.value = data.error
          else {
            store.commit("setUser",data)
            registered.value = true
            user.value = store.state.user
            }
        })
    }

    const forgetPassword = () => {
      fetch("http://localhost:8081/users/forgetpassword",{
        method: "POST",
        body:JSON.stringify({email: email.value}),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          if(data=='ok') {
            sendMail.value = true
            error.value = ""
            }
        })
    }

    const validate = () => {
      fetch("http://localhost:8081/users/validateemail",{
        method: "POST",
        body:JSON.stringify({email: email.value}),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          if(data=='ok') {
            sendMail.value = true
            error.value = ""
            }
        })
    }

    const logout = () => {
      store.commit("setUser",{})
      error.value=""
      registered.value = false
      sendMail.value = false
      user.value = {}
      email.value = ""
      password.value = ""
    }

    const changeProfile = () => {
      router.push(`/perfil/${user.value.nickname}`)
      setTimeout(() => store.commit("setProfile"), 100) 
    }

    watch(store.state, ()=> {
      user.value.nickname = store.state.user.nickname
      user.value.avatar = store.state.user.avatar
      if(!store.state.user.nickname) {
        error.value=""
        registered.value = false
        sendMail.value = false
        user.value = {}
        email.value = ""
        password.value = ""
      }
    })

    return{
      email,
      password,
      login,
      logout,
      changeProfile,
      forgetPassword,
      validate,
      registered,
      error,
      sendMail,
      user
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
  i::before{
    padding-bottom: 2px;
  }
}
.user{
  display: flex;
  justify-content: center;
  div{
    display: block;
    .admin{
      font-size: 1.2rem;
      color: #888;
    }
  }
}
input{
  width: 140px;
  height: 30px;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
}
.button-arrow{
  position: absolute;
  right: -10px;
  top: 35px
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
.error{
  display: flex;
  flex-direction: column;
}
</style>