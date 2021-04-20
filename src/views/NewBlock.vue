<template> 
  <div class="block">
    <h2 class="title2">The other's gold 
    <!--   <router-link to="/mapa"><img src="/img/stories/mapred.png" alt="" class="avatar"> </router-link> -->
    </h2> 
    <h3 class="title1">Se marcha a la playa</h3>
    <Editor
       api-key="s22x77w289dsg6ifamwucbt0tzr97yextl5n38le6u8paoho"
       :init="{
         height: 260,
         placeholder: 'Comienza a escribir tu fragmento...',
         menubar: false,
         skin: 'outside',
         toolbar_location: 'bottom',
         language_url : '/languages/es.js',
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
     <div class="checkbox" v-if="!check">
        <label>UNA DECISIÓN</label>
        <input  v-model="check" value="1" type="radio"> 
        <label>DOS DECISIONES</label>
        <input  v-model="check" value="2" type="radio">
        <label>FINAL</label>
        <input  v-model="check" value="0" type="radio">
        {{check}}
     </div>

     <div>
        <input v-model="closure1" class="closure" placeholder="Decisión 1">
      </div>
      <div>
         <input v-model="closure1" class="closure" placeholder="Decisión 1">
         <input v-model="closure1" class="closure" placeholder="Decisión 1">
      </div>
     

     
     <div class="send">
        <button @click="create" class="button2">Enviar</button>
     </div>
     
  </div>
</template>

<script>
import {ref} from 'vue'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "NewBlock",
  components: {
     'Editor': Editor
   },
  setup() {
      let body=ref('')
      let closure=ref('')
      let choose = ref(false)
      let check = ref('')

      


      function create(){
            fetch('http://localhost:8081/api/api/users/signup',{
                method: 'POST',
                body: JSON.stringify({
                    body: body.value,
                    closure: closure.value,
                }),
                headers: {'Content-Type':'application/json'}
            }).then(resp=>resp.json())
                .then(data=>data)
        }  

    return {
        choose,
        body,
        closure,
        create,
        check,

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

.send{
  margin-top: 20px;
  display:flex;
  justify-content: center;
}

.title1{
  margin-bottom: 20px;
  padding: 0 0 0 30px;
/*   background-color: #63d4df; */
  background-image: linear-gradient(85deg, #ff85d8 0, #ff85c3 4.17%, #ff87af 8.33%, #ff8b9c 12.5%, #ff9189 16.67%, #ff9877 20.83%, #ffa165 25%, #ffa954 29.17%, #ffb244 33.33%, #ffba35 37.5%, #ffc226 41.67%, #ffca19 45.83%, #f8d110 50%, #e5d712 54.17%, #d2dd1d 58.33%, #bde22c 62.5%, #a7e73d 66.67%, #8eeb4e 70.83%, #71ee5f 75%, #4af172 79.17%, #00f386 83.33%, #00f59a 87.5%, #00f7ae 91.67%, #00f8c3 95.83%, #00f9d9 100%);
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
   /*  background-color: $primaryColor; */
    padding: 3px;
    font-weight: bold;
   /*  text-align: center; */
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

.avatar{
  /* margin-left: 480px; */
  width: 50px;
  height: 40px;
  object-fit: cover;
  object-position: center;
}

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