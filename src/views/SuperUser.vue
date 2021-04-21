<template> 
  <div class="view-top profile" v-if="superadmin==true">
    <div class="profile-form">
      <div class="title">Formulario de registro</div>
      <div class="box">
      <input type="text" v-model="nickname" placeholder="Nickname">
      <div class="error"><p v-if="error.value">{{error.value.nickname}}{{error.value.repeatnickname}}</p></div>
      <input type="text" v-model="email" placeholder="Correo electrónico">
      <div class="error"><p v-if="error.value">{{error.value.email}}{{error.value.repeatemail}}</p></div>
      <input type="text" v-model="firstname" placeholder="Nombre">
      <div class="error"><p v-if="error.value">{{error.value.firstname}}</p></div>
      <input type="text" v-model="lastname" placeholder="Apellidos">
      <div class="error"><p v-if="error.value">{{error.value.lastname}}</p></div>
      <input type="password" v-model="password" placeholder="Contraseña">
      <div class="error"><p v-if="error.value">{{error.value.password}}</p></div>
      <div class="ok"><p v-if="oksignup"> Administrador registrado con éxito.</p></div>
      <button class="button" @click="createAdmin">Registrar Administrador</button>
      </div>
    </div>
    <div class="profile-admins">
      <div class="title">
        <p>Administradores</p>
        <div><i class="bi bi-search"></i><input type="text" v-model="letters" @keyup="inputLetter" placeholder="Nickname"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex"

export default {
  name: "SuperUser",
  components: {},

  setup() {
    const store = useStore()
    const nickname = ref("")
    const email = ref("")
    const firstname = ref("")
    const lastname = ref("")
    const password = ref("")
    const error = reactive({})
    const letters = ref("")
    const users = reactive([])
    const oksignup = ref(false)
    const superadmin = ref(false)

    const createAdmin = () => {
      fetch('http://localhost:8081/users/create',{
        method: 'POST',
        body: JSON.stringify({ nickname: nickname.value, email: email.value, firstname: firstname.value, lastname: lastname.value, password: password.value, admin: true, active: true }),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp => resp.json())
        .then (data => {
          if (data=='ok') {
            error.value = ""
            nickname.value = ""
            email.value = ""
            firstname.value = ""
            lastname.value = ""
            password.value = ""
            oksignup.value = true
          }
          else {
            error.value = data
            oksignup.value = false
          }
        })
    }

    let inputLetter = () => {
      list(letters)
    }

    const list = (letters) => {
      fetch('http://localhost:8081/users/list',{
        method: 'POST',
        body: JSON.stringify({
          nickname: letters,
          admin: true
        }),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp=>resp.json())
        .then(data=>{
          users.splice(0)
          data.forEach(user => {
          users.push(user)
          })
        })            
    }

    onMounted(() => {
      list(letters)
      superadmin.value = store.state.user.superadmin
    })

    return {
      nickname,
      email,
      firstname,
      lastname,
      password,
      error,
      inputLetter,
      letters,
      users,
      oksignup,
      createAdmin,
      superadmin
    }
  },
}
</script>

<style lang="scss" scoped>
.profile{
  width: 80%;
  max-width: 900px;
  height: 500px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-form{
    width: 35%;
    margin-bottom: 10px;
  }
  &-admins{
    width: 60%;
    height: 100%;
    .title{
      padding-right: 16px;
      padding-left: 16px;
      display: flex;
      justify-content: space-between;
      p{
        margin: 0;
      }
      div{
        display: flex;
      }
      i::before{
        margin: 0 10px;
      }
    }
  }
}
input,textarea{
  margin: 4px 0;
  width: 100%;
  border: none;
}
input{
  border-bottom: 1px solid $backgroundColor;
}
.ok{
  height: 40px;
  p{
    margin: 0;
  }
}

@media (max-width: 990px){
  .profile{
    height: 100%;
    flex-direction: column;
    &-form{
      width: 100%;
    }
    &-admins{
      width: 100%;
    }
  }
}
</style>