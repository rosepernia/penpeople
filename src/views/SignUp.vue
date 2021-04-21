<template> 
  <div class="view-top">
     
    <div class="title">Formulario de registro</div>
    <div class="box square">
      <input class="inputs input-form" type="text" v-model="nickname" placeholder="Nickname" required>
      <div class="error"><p v-if="error.value">{{error.value.nickname}}{{error.value.repeat}}</p></div>
      <input class="inputs input-form" type="text" v-model="email" placeholder="Correo electrónico" required>
      <div class="error"><p v-if="error.value">{{error.value.email}}{{error.value.repeat}}</p></div>
      <input class="inputs input-form" type="text" v-model="firstname" placeholder="Nombre" required>
      <div class="error"></div>
      <input class="inputs input-form" type="text" v-model="lastname" placeholder="Apellidos" required>
      <div class="error"><p v-if="error.value">{{error.value.lastname}}</p></div>
      <input class="inputs input-form" type="password" v-model="password" placeholder="Contraseña" required>
      <div class="error"><p v-if="error.value">{{error.value.password}}</p></div>
      <div><label class="priv input-form"><input type="checkbox" v-model="checked" required> He podido leer y entiendo la política de privacidad y cookies</label></div>
      <div class="error"><p v-if="error.value">{{error.value.nickname}}</p></div>
      <button @click="send" class="button">Registrarse</button>
      </div>
      <div v-if="oksignup">
        <p>¡Gracias por unirte a Penpeople!. Abre el correo electrónico que has recibido y haz clic en el botón para confirmar tu registro.</p>
      </div>
     
</div>
</template>

<script>

import { ref, reactive } from "vue";

export default {
  name: "SignUp",
  components: {},

  setup() {

  const nickname=ref("")
  const email=ref("")
  const firstname=ref("")
  const lastname=ref("")
  const password=ref("")
  const error= reactive({})
  const oksignup= ref(false)


      function send(){
            fetch('http://localhost:8081/users/create',{
                method: 'POST',
                body: JSON.stringify({

                  "nickname":nickname.value,
                  "email":email.value,
                  "firstname":firstname.value,
                  "lastname":lastname.value,
                  "password":password.value
                  
                }),
                headers: {'Content-Type':'application/json'}
            }).then(resp=>resp.json())
                .then (data=> {
                if (data=="ok"){
                console.log("Usuario creado correctamente")
                error.value="",
                oksignup.value=true
                } 
               
                else error.value=data
                
                })
        }




return {
      nickname,
      email,
      firstname,
      lastname,
      password,
      send,
      error,
      oksignup
    }
  },
}
</script>

<style lang="scss" scoped>

.inputs{
  width: 100%;
  height: 25px;
  border: none;
  border-bottom: 1px solid $backgroundColor;
}

.priv{
  font-size: xx-small;
}

.button{
 text-align: center;
}

.view-top{
  width: 35%;
  display:flex;
  flex-direction: column;
}

.error{
  color:red
}

@media (max-width: 575px){
.view-top{
  width: 70%;
}
}
</style>