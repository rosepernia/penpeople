<template> 
  <div class="block">
    <h2 class="title2">{{story}}
    </h2> 
    <h3 class="title1">{{title}}</h3>
    
    <Editor
       api-key="s22x77w289dsg6ifamwucbt0tzr97yextl5n38le6u8paoho"
       :init="{
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
           ' | redo bold italic | wordcount \
         bullist numlist \
         ',
          menu: {
            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
          },
          selector: 'textarea',
          content_style: 'body {color:#666262; font-family: Avenir;}',
       }"
       v-model="body"
     />
     <div>{{error}}</div>
     <div class="checkbox">
        <label>DOS DECISIONES</label>
        <input  v-model="check" value="2" type="radio">
        <label>UNA DECISIÓN</label>
        <input  v-model="check" value="1" type="radio"> 
        <label>FINAL</label>
        <input  v-model="check" value="0" type="radio">
      </div>

      <div class="decissions" v-if="check==1">
         <input v-model="closure[0]" class="closure" placeholder="Decisión 1">
      </div>
      
      <div class="decissions" v-if="check==2">
        <input v-model="closure[0]" class="closure" placeholder="Decisión 1">
        <input v-model="closure[1]" class="closure" placeholder="Decisión 2">
      </div>
     
     <div class="send">
        <button @click="send" class="button2">Enviar</button>
     </div>
     
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import { ref, reactive } from 'vue'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "NewBlock",
  components: {
     'Editor': Editor
   },
  setup() {
      const route = useRoute()
      const store = useStore()
      const closure = reactive([])
      const check = ref('')
      const story = route.params.story
      const title = route.params.title
      const blockid = route.params.blockid
      const author = store.state.user._id
      const body=ref('')
      const error =ref('')
      console.log(route.params)
      console.log(author)

  let send=() => {
            fetch('http://localhost:8081/blocks/create',{
                method: 'POST',
                body: JSON.stringify({

                "blockid":blockid,
                "title":title,
                "body":body.value,
                "closure":closure,
                "author": author,
                "story":story

                  
                }),
                headers: {'Content-Type':'application/json'}
                 })
                  .then(resp=>resp.json())
                  .then(data=> {
                if (data=="ok"){
                console.log("Fragmento creado correctamente")
                error.value=""
                } 
                else error.value="Debe contener entre 150 y 200 palabras"
                })
      }

    return {
      
        closure,
        check,
        story,
        title,
        blockid,
        body,
        author,
        send,
        error
    }
  },
}
</script>

<style lang="scss" scoped>

 .block{
 /*  margin-left: auto;
  margin-right: auto; */
  margin: 130px auto 0 auto;
  width: 90%;
  max-width: 800px;
  min-height: 400px;
  /* border: 1px solid $textColor;  */
}

label{
  padding: 0 0 0 10px;
}

.checkbox{
  margin-top: 20px;
  display:flex;
  justify-content: center;
}
.decissions{
  display:flex;
  justify-content: center;
  input{
   margin: 30px;
  }
}

.send{
  margin-top: 20px;
  display:flex;
  justify-content: center;
}

.title1{
  margin-bottom: 20px;
  padding: 0 0 0 30px;
  background-color: #63d4df;
  font-size: $size1;
  display:flex;
  align-items: center;
  width: 300px;
  border-radius: 15px;
} 

.title2{
    margin-bottom: 20px;
    font-family: $font3;
    color: #52b1b9;
    padding: 3px;
    font-weight: bold;
    font-size: $size2;
    border-bottom:1px solid  #52b1b9;;
}

.closure{
  display:flex;
  justify-content: center;
  font-size: $size1;
  padding:10px 10px 10px 5px; 
  width:300px;
  border:none;
  border-bottom:1px solid black;
  background-color: transparent;
}  
.closure:focus  	{ outline:none; }



.button2{
    cursor: pointer;
    font-family: $font;
    font-size: $size1;
    border: 1px solid #c4c1c1;
    padding: 8px 16px;
    background-color: $backgroundColor;
    &:hover{
        background-color: #d6d6d6;
    }
}

</style>