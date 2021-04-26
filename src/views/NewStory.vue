<template> 
  <div class="view-top">
    <div class="box">
       <!-- <div class="img"> -->
          <!-- <img src="../assets/img/users/default.jpg" alt="Portada historia" class="cover"> -->
          <div class="wrapper"> 
            <label for="image">Subir imagen</label>
            <div class="file-upload">
              <input type="file" />
              <i class="bi bi-upload"></i>
            </div>
          </div>
          <!-- <div>
            <label for="image">Subir imagen</label>
            <input type="file" id="image" accept=".jpg,.png,.jpeg*" @change="fileSelected" >
            <div class="error"><p v-if="error.value">{{error.value.image}}</p></div>
          </div> -->
      <!-- </div> -->
      <div class="box1">
        <input class="inputs2 input-form" v-model="title" type="text" placeholder="Título de la historia">
        <div class="error"><p v-if="error.value">{{error.value.title}}</p></div>
     
        <input class="inputs2 input-form" v-model="author" type="text" placeholder="Autor">
        <div class="error"><p v-if="error.value">{{error.value.author}}</p></div>
     </div>
     <div class="box2">
        <textarea class="inputs input-form" v-model="review" type="text" placeholder="Reseña"></textarea>
        <div class="error"><p v-if="error.value">{{error.value.review}}</p></div>
     </div>
      <Editor
        api-key="s22x77w289dsg6ifamwucbt0tzr97yextl5n38le6u8paoho"
        :init="{
          branding: false,
          height: 260,
          placeholder: 'Añade el primer fragmento de la historia...',
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
      <div class="decisions">
        <input v-model="closures[0]" placeholder="Decisión 1">
        <input  v-model="closures[1]" placeholder="Decisión 2">
      </div>
      <div class=error><p v-if="error.value">{{error.value.decisions}}</p></div>
      <button @click="publish" class="button">Publicar</button>
    </div> 
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { ref, reactive } from 'vue'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "NewStory",
  components: {
    Editor
  },

  
  setup() {
    const router = useRouter()
    const title = ref('')
    const author = ref('')
    const review = ref('')
    const body = ref('')
    const closures = []
    const error = reactive({})

    const  fileSelected = (event) => {
      console.log(event.target.file[0])
      file.value = event.target.files[0]
      let fd = new FormData()
      fd.append('image', file.value)
    }
    const publish = () => {
      if(closures.length<=1 || closures[0]=="" || closures[1]=="") error.value = { decisions: "Recuerda incluir dos decisiones" }
      else{
        error.value = {}
        fetch('http://localhost:8081/stories/create',{
          method: "POST",
          body: JSON.stringify({ title: title.value, author: author.value, review: review.value, body:body.value, closure:closures }),
          headers: {'Content-Type':'application/json'}
        })
          .then(resp=>resp.json())
          .then(data=>{
          if(data=="ok") router.push('/libros')
          else error.value = data
          })
      }
    }


    return {
      title,
      author,
      review,
      body,
      closures,
      error,
      publish,
      fileSelected 
    }
  },
}
</script>

<style lang="scss" scoped>

.view-top{
  margin-top: 150px;
  width: 90%;
  max-width: 900px;
  min-height: 400px;
}
.box{
  margin-bottom: 40px;
  flex-wrap: nowrap;
}
.box1{
 margin-top: 15px;
 width: 50%;
 padding: auto;
 float: left;
}
.box2{
  margin: 0 0 15px 0;
}
label{
  margin: auto;
}
.wrapper{
  width:50%;
  height:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin: auto;
  float: right;

  .file-upload{
    height:80px;
    width:80px;
    position:relative;
    
    display:flex;
    justify-content:center;
    align-items: center;  

    border:4px solid #d6d6d6;
    overflow:hidden;
    background-image: linear-gradient(to bottom, #f4f1f1 50%, #d6d6d6 50%);
    background-size: 100% 200%;
    transition: all 1s;
    color: #d6d6d6;
    font-size:100px;

    input[type='file']{
      height:200px;
      width:200px;
      position:absolute;
      top:0;
      left:0;
      opacity:0;
      cursor:pointer;
    }
    &:hover{
      background-position: 0 -100%;
      color:#f4f1f1;
    }
  }
}
.inputs{
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid $backgroundColor;
  margin-top: 10px;
}
.inputs2{
  width: 100%;
  height: 25px;
  border: none;
  border-bottom: 1px solid $backgroundColor;
}

.head{
  position: fixed;
  top: 120px;
  left: 0;
  width: 100%;
  background-color: #f4f1f1d7;
  z-index: 10;
}
.error{
  p{
    margin: 0 auto;
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
/* .img{
    width: 50%;
    display: flex;
    align-items: center;
    float: right;
    margin: 0 0 0 auto;
    input[type="file"]{
      color:blue;
      display: none;
    } 
} */
/* .cover{
  width: 90px;
  height: 90px;
  object-fit: cover;
  object-position: center;
  box-shadow: 1px 1px 3px #cfcdcd;
} */

@media (max-width: 990px){
  .img{
    height: 100%;
    flex-direction: column;
  }
  .cover{
    width: 70px;
    height: 70px;
  }
  .box1{
    height: 100%;
    flex-direction: column;
  }
}
@media (max-width: 575px){
  .file-upload{
    height:50px;
    width:50px;
  }
  .cover{
    width: 50px;
    height: 50px;
  }
  .img{
    height: 100%;
    flex-direction: column;
  }
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