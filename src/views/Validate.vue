<template>
<div class="center" v-if="user.value">
  <p class="size5">Gracias por validar la cuenta {{user.value.firstname}}!</p>
  <p class="size3">Ya puedes acceder a tu perfil y comenzar a mandar fragmentos para continuar nuestras historias. ¡Esperamos tus maravillosas ideas!</p>
</div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRoute } from "vue-router"

export default {
  name: 'Validate',
  setup() {
    const route = useRoute ()
    const user = reactive({})

    const validate = () => {
      fetch("http://localhost:8081/users/validate",{
        method: "POST",
        body: JSON.stringify({_id: route.params.id}),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          user.value = data
        })
    }

    onMounted(() => {
      validate()
    })
   
    return{
      user
    }
  }
}
</script>

<style lang="scss" scoped>
.center{
  text-align: center;
  width: 80%;
  max-width: 800px;;
}

@media (max-width: 575px){
  .size5{
    font-size: $size4;
  }
  .size3{
    font-size: $size2;
  }
}
</style>