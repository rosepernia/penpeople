<template>
  <div class="blackbackground clickable" :class="{hide:!info}" @click="showInfo">
    <div class="view-top box popup ">
<!--       <p class="quote">  <i> <b>‘Dicen que el buen lector, es aquel, que al terminar un libro es capaz de escribir una página más’.</b></i></p> -->      <p> <b>¡Te damos la bienvenida a Penpeople!</b></p>
      <p>Penpeople es una plataforma colaborativa en la que puedes:</p>
      <p><i class="bi bi-book"></i>  LEER: Elige una historia y empieza a leer. Al final de cada fragmento encontrarás varias opciones.</p>
      <p><i class="bi bi-signpost-split"></i>  ELEGIR: Al hacer clic sobre tu opción elegida, pasarás al siguiente fragmento en el que puedes seguir leyendo y decidir por dónde continuar</p>
      <p><i class="bi bi-vector-pen"></i>  ESCRIBIR: En los fragmentos que estén sin concluir, puedes proponer tu propia continuación. EL autor del fragmento anterior revisará las propuestas recibidas y elegirá cual se publica.</p>
      <p><i class="bi bi-people-fill"></i>  CONOCER a otros aficionados a la escritura: Puedes seguir sus fragmentos por autor, y dar like a aquellos que más te hayan gustado.</p>
      <p>Y recuerda, por muy ocupado que pienses que estás, las historias están divididas en fragmentos cortos, ¡siempre hay hueco para leer un fragmento más!</p>
      <div class="quote"><i> <b>"En todas las ficciones, cada vez que alguien se enfrenta con diversas alternativas, opta por una y elimina las otras (…). Crea, así, diversos  porvenires, diversos tiempos, que también proliferan y se bifurcan."J.L. Borges.</b></i>
    </div>
    
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

.quote{
  padding:25px;
  font-weight: 100;
}

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
