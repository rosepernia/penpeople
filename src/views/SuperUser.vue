<template> 
  <div class="view-top profile" v-if="superadmin==true">
    <div class="profile-form">
      <div class="title">Formulario de registro</div>
      <div class="box">
      <input type="text" v-model="form.nickname" placeholder="Nickname">
      <div class="error"><p v-if="error.value">{{error.value.nickname}}{{error.value.repeatnickname}}</p></div>
      <input type="text" v-model="form.email" placeholder="Correo electrónico">
      <div class="error"><p v-if="error.value">{{error.value.email}}{{error.value.repeatemail}}</p></div>
      <input type="text" v-model="form.firstname" placeholder="Nombre">
      <div class="error"><p v-if="error.value">{{error.value.firstname}}</p></div>
      <input type="text" v-model="form.lastname" placeholder="Apellidos">
      <div class="error"><p v-if="error.value">{{error.value.lastname}}</p></div>
      <input type="password" v-model="form.password" placeholder="Contraseña">
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
      <div class="admins"> 
        <UserCard v-for="(user,ind) in users" :key="ind" @update="update"
          :avatar = "user.avatar"
          :email = "user.email"
          :nickname = "user.nickname"
          user = false
          />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard"
import { ref, reactive, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "SuperUser",
  components: {
    UserCard
  },
  setup() {
    const store = useStore()
    const form = reactive({
      nickname: "",
      email: "",
      firstname: "",
      lastname: "",
      password: ""
    })
    const oksignup = ref(false)
    const error = reactive({})
    const letters = ref("")
    const users = reactive([])
    const superadmin = ref(false)

    const createAdmin = () => {
      fetch('http://localhost:8081/users/create',{
        method: 'POST',
        body: JSON.stringify({ nickname: form.nickname, email: form.email, firstname: form.firstname, lastname: form.lastname, password: form.password, admin: true, active: true }),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp => resp.json())
        .then (data => {
          if (data=='ok') {
            error.value = ""
            form.nickname = ""
            form.email = ""
            form.firstname = ""
            form.lastname = ""
            form.password = ""
            oksignup.value = true
          }
          else {
            error.value = data
            oksignup.value = false
          }
        })
    }

    let inputLetter = () => list(letters.value)

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
          const admins = data.filter(admin => admin.nickname!="Administrador")
          admins.forEach(user => users.push(user))
        })            
    }

    const update = () => list("")

    onMounted(() => {
      list(letters.value)
      superadmin.value = store.state.user.superadmin
    })

    return {
      form,
      oksignup,
      error,
      inputLetter,
      letters,
      users,
      createAdmin,
      superadmin,
      update
    }
  },
}
</script>

<style lang="scss" scoped>
.profile{
  width: 80%;
  max-width: 1100px;
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
    .admins{
      height: 500px;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
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
      .admins{
      height: 300px;
    }
    }
  }
}
</style>