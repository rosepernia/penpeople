<template>
  <div class="blackbackground clickable" :class="{hide:!info}" @click="showInfo">
    <div class="view-top box popup">
      <p> Te damos la bienvenida a <b>Penpeople</b>, una plataforma colaborativa en la que puedes:</p>
      <h3> 📖 LEER</h3>
      <p> Elige una de nuestras historias y comienza tu aventura. Al final de cada fragmento encontrarás entre una y dos decisiones por donde continuar leyendo. </p>
      <h3> ↔️ ELEGIR</h3>
      <p>Al final de cada fragmento encontrarás dos tipos de decisiones:</p> <li>Azules (ya están escritas).</li> <li> Rojas (todavía nadie ha desarrollado la historia por ese camino).</li><p> Al hacer click sobre una decisión en azul pasarás a otro fragmento que de nuevo ofrece varios caminos para continuar (algunos fragmentos tendrán solo un camino o serán un final).</p> 
      <p>De esta manera puedes comenzar una y otra vez la misma historia porque siempre será diferente. Para ver el árbol de decisiones de cada historia pulsa en el icono mapa: <i class="bi bi-diagram-3-fill"></i></p>
      <h3> ✒️ ESCRIBIR</h3>
      <p>En los fragmentos que al final tengan alguna decisión en rojo (sin desarrollar) puedes hacer click sobre ella y escribir tú la continuación. Estate pendiente de tu email, el autor de dicho fragmento revisará tu propuesta y si resulta elegida se publicará. </p>
      <p>RECUERDA: Cuando escribas un fragmento antes de enviarlo tienes que incluir una decisión, dos decisiones o indicar que es un final.</p>
      <h3> 🖤 COMPARTIR </h3>
      <p>Puedes dar 'like' a aquellos fragmentos que más te hayan gustado, acceder al perfil de otros autores y mostrar en el tuyo propio información e intereses personales. Porque en Penpeople queremos que se crucen caminos, historias y personas.</p>
      <div class="quote"> <b><i>"En todas las ficciones, cada vez que alguien se enfrenta con diversas alternativas, opta por una y elimina las otras (…). Crea, así, diversos  porvenires, diversos tiempos, que también proliferan y se bifurcan".</i></b>
       <p>J.L. Borges</p>
     </div>
    </div>
  </div>
  <div class="footer">
    <p>© Penpeople 2021 - 
      <a href="http://bit.ly/penpeople" target="_blank"><i class="bi bi-github clickable size2"></i></a>
    </p>
    <div class="clickable info"  @click="showInfo">
      <span>Ayuda</span>
      <i class="bi bi-question-circle size2"></i>
    </div>
    
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

span{
  margin-right: 10px;
}

.quote{
  padding:25px;
  font-weight: 100;
  text-align: center;
  border-color:#21d5e6;
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
  .info{
    position: absolute;
    bottom: 8px;
    left: 18px;
  }
}

@media (max-width: 575px){
  .view-top{
    font-size: 1.3rem;
  }
}
</style>
