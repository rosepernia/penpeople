<template> 
  <div class="view-top">
    <div class="head">
      <h2 class="head-title">{{story.title}}<i class="bi bi-arrow-left-circle clickable" @click="comeBack"></i></h2> 
    </div>
    <div class="box">
      <div><p class="box-title">{{title}}</p></div>
      <Editor
        api-key="s22x77w289dsg6ifamwucbt0tzr97yextl5n38le6u8paoho"
        :init="{
          branding: false,
          height: 260,
          placeholder: 'Comienza a escribir tu fragmento...',
          menubar: false,
          skin: 'outside',
          toolbar_location: 'bottom',
          language_url : '/languages/langs/es.js',
          language: 'es',
          plugins: [
            'advlist autolink lists charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            ' | undo redo bold italic | wordcount \
          bullist numlist \
          ',
            menu: {
              favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
            },
            removed_menuitems: 'undo, redo',
            selector: 'textarea',
            content_style: 'body {color:#666262; font-family: Avenir;}',
            
        }"
        v-model="body"
      />
      <div class=error><p v-if="error.value">{{error.value.body}}</p></div>
      <div class="checkbox">
        <div>
          <input  v-model="check" id="two" value="2" type="radio">
          <label for="two">DOS DECISIONES</label>
        </div>
        <div>
          <input  v-model="check" id="one" value=1 type="radio">
          <label for="one">UNA DECISIÓN</label>
        </div>
        <div v-if="blockid.length>2">
          <input  v-model="check" id="zero" value=0 type="radio">
          <label for="zero">FINAL</label>
        </div>
      </div>
      <div class="decisions">
        <p v-if="check==0"><i>The End</i></p>
        <input v-if="check>=1" v-model="closures[0]" placeholder="Decisión 1">
        <input v-if="check==2" v-model="closures[1]" placeholder="Decisión 2">
      </div>
      <div class=error><p v-if="error.value">{{error.value.decisions}}</p></div>
      <div v-if="oksignup" class="ok">
        <p>¡Gracias por enviar tu propuesta! En un plazo máximo de 7 días sabrás si ha sido publicada.</p>
        <p class="clickable" @click="comeBack">Retomar la lectura</p>
      </div> 
      <button v-if="!oksignup" @click="send" class="button">Enviar</button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
import { ref, reactive, onMounted, watch } from 'vue'
import { useStore } from "vuex"
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "NewBlock",
  components: {
    Editor
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const story = ref('')
    const title = route.params.title
    const blockid = route.params.blockid
    const body = ref('')
    const check = ref(-1)
    const closures = []
    const error = reactive({})
    const oksignup = ref(false)

    const getStory = () => {
      fetch('http://localhost:8081/stories/findbyid',{
        method:'POST',
        body: JSON.stringify({_id: route.params.story}),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp=>resp.json())
        .then(data=>{
          story.value=data
        })          
    }

    const createOptions = () => {
      closures.splice(0)
      error.value = {}
      }

    const send = () => {
      if (check.value==-1) error.value = { decisions: "Tienes que decidir como continuará tu fragmento" }
      else if(closures.length!=check.value || closures[0]=="" || closures[1]=="") error.value = { decisions: "Las decisiones no pueden estar vacías" }
      else{
        error.value = {}
        fetch('http://localhost:8081/blocks/create',{
          method: "POST",
          body: JSON.stringify({ blockid: blockid, title: title, body:body.value, closure:closures, author: store.state.user._id, story: route.params.story }),
          headers: {'Content-Type':'application/json'}
        })
          .then(resp=>resp.json())
          .then(data=>{
          if(data=="ok") oksignup.value = true
          else error.value = data
          })
      }
    }

    const comeBack = () => {
      router.push(`/lectura/${story.value._id}/${blockid.substring(0, blockid.length - 1)}`)
    }

    watch(check, () => createOptions())

    onMounted(() => getStory())

    return {
      story,
      title,
      blockid,
      body,
      check,
      closures,
      error,
      oksignup,
      createOptions,
      send,
      comeBack
    }
  },
}
</script>

<style lang="scss" scoped>
.view-top{
  margin-top: 200px;
  width: 90%;
  max-width: 900px;
  min-height: 400px;
}
.head{
  position: fixed;
  top: 120px;
  left: 0;
  width: 100%;
  background-color: #f4f1f1d7;
  z-index: 10;
  &-title{
    position: relative;
    width: 95%;
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;
    font-family: $font3;
    color: #52b1b9;
    padding: 3px;
    font-weight: bold;
    font-size: $size2;
    border-bottom:1px solid #52b1b9;
  }
  i::before{
    top:0;
    right:24px;
    position: absolute;
    font-size: $size3;
    color: #52b1b9;
  }
}
.box{
  margin-bottom: 40px;
  &-title{
    margin-bottom: 16px;
    padding: 0 0 0 30px;
    background-color: #a6ebf1;
    font-size: $size1;
    max-width: 300px;
    width: 100%;
    border-radius: 15px;
  }
  &-data{
    position: relative;
  }
  &-author{
    top: -15px; 
    left: 50px;
    position: absolute;
  }
  &-avatar{
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    box-shadow: 1px 1px 3px #cfcdcd;
    border-radius: 100%;
  }
}
.error{
  p{
    margin: 0 auto;
  }
}
.checkbox{
  display:flex;
  justify-content: space-evenly;
  input[type="radio"] {
    display: none;
 }
  input[type="radio"]:checked +label {
    /* padding: 5px 15px; */
    background: $backgroundColor;
    border-radius: 2px;
 }
  input[type="radio"]:checked +label:before {
    display:none;
 }
  label{
    padding:5px 15px 5px 15px;
    display:inline-block;
    position:relative;
    border-radius: 3px ;
    cursor: pointer;
 /*    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease; */
   }
   label:hover{
     background: $backgroundColor;
   }
  label:before{
     content:"";
/*      width:15px;
     height: 15px;
     display:inline-block;
     background: none;
     border: 2px solid $secondaryColor;
     border-radius:50%;
     position:absolute;
     left:25px;
     top:8px; */
   }
}
.decisions{
  height: 36px;
  margin: 24px 0 16px 0;
  display:flex;
  justify-content: space-evenly;
  input{
    margin: 4px 0;
    height: 32px;
    width: 200px;
    border: none;
    border-bottom: 1px solid $textColor;
  }
}
.button{
  margin-top: 8px;
}
.ok{
  text-align: center;
  p{
    margin: 0;
  }
}
@media (max-width: 575px){
  .checkbox{
    flex-direction: column;
    align-items: center;
  }
  .decisions{
    height: 100px;
    margin: 8px 0 8px 0;
    flex-direction: column;
    align-items: center;
  }
}

</style>