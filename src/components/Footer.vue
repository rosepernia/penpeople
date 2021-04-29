<template>
  <div class="blackbackground clickable" :class="{hide:!info}" @click="showInfo">
    <div class="view-top box popup">
      <p>¡Te damos la bienvenida a Penpeople!</p>
      <p>En Penpeople puedes elegir qué leer, cómo avanza la historia e incluso proponer cómo continúa.</p>
      <p>Para empezar, elige una historia y déjate llevar por ella eligiendo el itinerario que más te llame la atención.</p>
      <p>«En todas las ficciones, cada vez que alguien se enfrenta con diversas alternativas, opta por una y elimina las otras (…). Crea, así, diversos  porvenires, diversos tiempos, que también proliferan y se bifurcan.» J.L. Borges,  «El jardín de los senderos que se bifurcan».</p>
      <p>Dependiendo de tus elecciones, irás descubriendo nuevas posibilidades, y es muy posible que llegues a un punto en el que la historia sigue abierta. En este caso, puedes esperar a que alguien publique una continuación, o también … ‘Dicen que el buen lector, es aquel, que al terminar un libro es capaz de escribir una página más’. … puedes proponer tu propia continuación a la historia que has venido leyendo. Para ello, regístrate en Penpeople (si no lo estás) y envía tu propuesta. Intenta que se adapte</p>
    </div>
  </div>
  <div class="footer">
    <p>© Penpeople 2021 - 
      <a href="http://bit.ly/penpeople" target="_blank"><i class="bi bi-github clickable size2"></i></a>
    </p>
    <i class="bi bi-info-circle clickable size3 info" @click="showInfo"></i>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Footer",
  setup() {
    const info = ref(false)

    const showInfo = () => {
      info.value = !info.value
    }
   
    return {
      info,
      showInfo
    }
  },
}
</script>

<style lang="scss" scoped>
.view-top{
  margin-bottom: 40px;
}
.footer{
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  height: 35px;
  background-color: #f4f1f1d7;
  p{
    text-align: center;
    margin: 0;
  }
  .info:before{
    position: absolute;
    bottom: 8px;
    left: 8px;
  }
}

@media (max-width: 575px){
  .view-top{
    font-size: 1.3rem;
  }
}
</style>