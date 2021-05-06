<template> 
  <div class="center">
    <div class="title">Formulario de registro</div>
    <div class="box square">
      <input class="inputs input-form" type="text" v-model="form.nickname" placeholder="Nickname">
      <div class="error"><p v-if="error.value">{{error.value.nickname}}{{error.value.repeatnickname}}</p></div>
      <input class="inputs input-form" type="text" v-model="form.email" placeholder="Correo electrónico">
      <div class="error"><p v-if="error.value">{{error.value.email}}{{error.value.repeatemail}}</p></div>
      <input class="inputs input-form" type="text" v-model="form.firstname" placeholder="Nombre">
      <div class="error"><p v-if="error.value">{{error.value.firstname}}</p></div>
      <input class="inputs input-form" type="text" v-model="form.lastname" placeholder="Apellidos">
      <div class="error"><p v-if="error.value">{{error.value.lastname}}</p></div>
      <input class="inputs input-form" type="password" v-model="form.password" placeholder="Contraseña">
      <div class="error"><p v-if="error.value">{{error.value.password}}</p></div>
      <div>
        <label class="priv input-form">
          <input type="checkbox" v-model="checked" @click="check"> He podido leer y entiendo la política de privacidad y cookies
        </label>
      </div>
      <div class="error"><p>{{message}}</p></div>
      <button @click="send" class="button">Registrarse</button>
    </div>
    <div v-if="oksignup">
      <p>¡Gracias por unirte a Penpeople! Abre el correo electrónico que has recibido y haz clic en el botón para confirmar tu registro.</p>
    </div> 
  </div>
</template>

<script>

import { ref, reactive } from "vue";

export default {
  name: "SignUp",
  components: {},

  setup() {
    const form=reactive({
      nickname:"",
      email:"",
      firstname:"",
      lastname:"",
      password:"",
    })
    const error = reactive({})
    const oksignup = ref(false)
    const checked = ref(false)
    const message =  ref("")
    const routeBack = process.env.VUE_APP_API

    const send=() => {
      if (!checked.value) message.value = "Recuerda que debes aceptar la política de privacidad"
      else message.value = ""
      error.value = ""
      if (checked.value){
        fetch(`${routeBack}/users/create`,{
          method: 'POST',
          body: JSON.stringify({nickname:form.nickname, email:form.email, firstname:form.firstname, lastname:form.lastname, password:form.password}),
          headers: {'Content-Type':'application/json'}
          })
            .then(resp=>resp.json())
            .then(data=> {
              if (data=="ok"){
                error.value = "",
                oksignup.value = true
                setTimeout(() => oksignup.value = false, 8000)
              }else {
                error.value=data
                oksignup.value = false
              }
            })
      }
    }
 
    return {
      form,
      error,
      oksignup,
      checked,
      message,
      send,
    }
  },
}
</script>

<style lang="scss" scoped>
.center{
  width: 80%;
  max-width: 450px;
}
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

@media (max-width: 575px){
  .center{
    transform: none;
    position: initial;
    margin: 120px auto 50px auto;
  }
  .error{
    height: 36px;
  }
}

</style>