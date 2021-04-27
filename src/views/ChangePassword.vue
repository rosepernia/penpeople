<template>
  <div class="center box form" v-if="user.value">
    <p>Desde PenPeople lamentamos que hayas olvidado tu contraseña {{user.value.firstname}}. Escribe una nueva y te la cambiaremos.</p>
    <input type="password" v-model="password" placeholder="Nueva contraseña">
    <div class="error"><p v-if="error">{{error}}</p></div>
    <button class="button" @click="changePassword">Cambiar contraseña</button>
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
          if(data=='ok') error.value = "Contraseña cambiada con éxito"
          else error.value = data.password
          })
    }

    onMounted(() => {
      findUser()
    })

    return {
      password,
      user,
      error,
      changePassword
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  width: 80%;
  max-width: 400px;
  height: 260px;
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