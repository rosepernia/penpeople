<template>
<div class="center">
  <div class="box form" v-if="user.value">
    <p>Desde PenPeople lamentamos que hayas olvidado tu contraseña {{user.value.firstname}}. Escribe una nueva y te la cambiaremos.</p>
    <input type="password" v-model="password" placeholder="Nueva contraseña">
    <div class="error"><p v-if="error">{{error}}</p></div>
    <button class="button" @click="changePassword">Cambiar contraseña</button>
  </div>
  <div class="ok" v-if="oksignup">
    <p>Contraseña cambiada con éxito</p>
  </div> 
</div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
import { ref, reactive, onMounted } from "vue"

export default {
  name: "ChangePassword",
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute ()
    const password = ref("")
    const user = reactive({})
    const error = ref("")
    const oksignup = ref(false)

    const findUser = () => {
      fetch("http://localhost:8081/users/findbyid",{
        method: "POST",
        body:JSON.stringify({ _id: route.params.id }),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          if(data==null) router.push('/')
          user.value=data
          })
    }

    const changePassword = () => {
      fetch("http://localhost:8081/users/newpassword",{
        method: "POST",
        body:JSON.stringify({ _id: route.params.id, password: password.value }),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          if(data=='ok') {
            error.value = ""
            oksignup.value = true
            setTimeout(() => oksignup.value = false, 6000)
          }else {
            error.value=data.password
            oksignup.value = false
          }
        })
    }

    onMounted(() => {
      findUser()
    })

    return {
      password,
      user,
      error,
      changePassword,
      oksignup
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  margin-right: auto;
  margin-left: auto;
  width: 80%;
  max-width: 400px;
  height: 260px;
}
.ok{
  text-align: center;
}
input{
  margin: 8px 0;
  width: 100%;
  border: none;
  border-bottom: 1px solid $backgroundColor;
}
.button{
  margin-top: 16px;
}

@media (max-width: 575px){
  .form{
    width: 280px;
    height: 280px;
  }
}
</style>