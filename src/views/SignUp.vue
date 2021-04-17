<template> 
  <div class="view-top">
    <div class="title">Formulario de registro</div>
    <div class="box square">
      <input class="inputs input-form" type="text" v-model="nickname" placeholder="Nickname" required>
      <div v-if="nicknameerror" class="error"> {{nicknameerror}} </div>
      <input class="inputs input-form" type="text" v-model="email" placeholder="Correo electrónico" required>
      <div v-if="emailerror" class)="error">{{emailerror}}</div>
      <input class="inputs input-form" type="text" v-model="name" placeholder="Nombre" required>
      <div v-if="nameerror" class="error">{{nameerror}}</div>
      <input class="inputs input-form" type="text" v-model="lastname" placeholder="Apellidos" required>
      <div v-if="lastnameerror" class="error">{{lastnameerror}}</div>
      <input class="inputs input-form" type="password" v-model="password" placeholder="Contraseña" required>
      <div v-if="passworderror" class="error">{{passworderror}}</div>
      <div><label class="priv input-form"><input type="checkbox" v-model="checked" required> He podido leer y entiendo la política de privacidad y cookies</label></div>
      <div v-if="checkerror" class="error">{{checkerror}}</div>
      </div>
    <div class="button" type="submit" value="submit">Registrarse</div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {},

  setup() {

/*    let nickname=ref("")
      let email=ref("")
      let name=ref("")
      let lastname=ref("")
      let password=ref("") */

/*     nicknameerror="Este nickname no está disponible"
    emailerror="Introduce un email válido"
    nameerror="Tu nombre debe contener caracteres"
    lastnameerror="Tus apellidos deben contener"
    passworderror="La contraseña debe contener" */
    
/*     return {
      errors:[""],
      nickname,
      email,
      name,
      lastname,
      password
    } */
  },
}
</script>

<style lang="scss" scoped>

.inputs{
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
}

.box{
  border: 1px solid #131212;
  background-color: transparent;
}

.priv{
  font-size: xx-small;
}

.button{
 margin-top: 20px;
 text-align: center;
}

.view-top{
  width: 35%;
}

.error{
  color:red
}
</style>