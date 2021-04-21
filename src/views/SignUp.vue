<template> 
  <div class="view-top">
     
    <div class="title">Formulario de registro</div>
      <div class="box square">
        <input class="inputs input-form" type="text" v-model="form.nickname" placeholder="Nickname">
      <div class="error"><p v-if="error.value">{{error.value.nickname}}{{error.value.repeatnickname}}</p></div>
        <input class="inputs input-form" type="text" v-model="form.email" placeholder="Correo electrónico">
      <div class="error"><p v-if="error.value">{{error.value.email}}{{error.value.repeatemail}}</p></div>
        <input class="inputs input-form" type="text" v-model="form.firstname" placeholder="Nombre">
      <div class="error"></div>
        <input class="inputs input-form" type="text" v-model="form.lastname" placeholder="Apellidos">
      <div class="error"><p v-if="error.value">{{error.value.lastname}}</p></div>
        <input class="inputs input-form" type="password" v-model="form.password" placeholder="Contraseña">
      <div class="error"><p v-if="error.value">{{error.value.password}}</p></div>
        <div>
          <label class="priv input-form">
            <input type="checkbox" v-model="checked" @click="check"> He podido leer y entiendo la política de privacidad y cookies
          </label>
        </div>
      <div class="error">
        <p>{{priv}}</p>
      </div>
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

  let form=reactive({
    nickname:"",
    email:"",
    firstname:"",
    lastname:"",
    password:"",
  })
  
  const error = reactive({})
  let oksignup = ref(false)
  let checked = ref("")
  let priv =  ref("")



      let check= () => priv.value=""
      let privacity= () => {
          if (!checked.value) priv.value="Recuerda que debes aceptar la política de privacidad"
      } 

      let send=() => {
        privacity()
          if (checked.value){

            fetch('http://localhost:8081/users/create',{
                method: 'POST',
                body: JSON.stringify({

                  "nickname":form.nickname,
                  "email":form.email,
                  "firstname":form.firstname,
                  "lastname":form.lastname,
                  "password":form.password
                  
                }),
                headers: {'Content-Type':'application/json'}
                 })
                  .then(resp=>resp.json())
                  .then(data=> {
                if (data=="ok"){
                console.log("Usuario creado correctamente")
                error.value="",
                oksignup.value=true
                } 
                else error.value=data
                })
          }
      }
        

      return {
            form,
            send,
            error,
            oksignup,
            checked,
            privacity,
            priv,
            check
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
  width: 80%;
  max-width: 450px;
  display:flex;
  flex-direction: column;
}

.error{
  color:red
}
</style>