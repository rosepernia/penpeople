<template> 
  <div class="view-top">
    <div class="box">
      <div class="box-info">
        <div class="info">
          <input v-model="form.title" type="text" placeholder="Título de la historia">
          <div class="error"><p v-if="error.value">{{error.value.title}}</p></div>
          <input v-model="form.author" type="text" placeholder="Autor">
          <div class="error"><p v-if="error.value">{{error.value.author}}</p></div>
        </div>
        <div class="img">
          <label for="image" class="button">Subir imagen</label>
          <div class="image-name"><input type="file" id="image" accept=".jpg,.png,.jpeg*" @change="fileSelected" ></div> 
          <div class="error error-center"><p v-if="error.value">{{error.value.image}}</p></div>
        </div>
      </div>
      <textarea v-model="form.review" type="text" placeholder="Reseña"></textarea>
      <div class="error"><p v-if="error.value">{{error.value.review}}</p></div>
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
        v-model="form.body"
      />
      <div class="error error-center"><p v-if="error.value">{{error.value.body}}</p></div>
      <div class="decisions">
        <input v-model="closures[0]" placeholder="Decisión 1">
        <input  v-model="closures[1]" placeholder="Decisión 2">
      </div>
      <div class="error error-center"><p v-if="error.value">{{error.value.decisions}}</p></div>
      <div v-if="oksignup" class="ok">
        <p>¡Historia creada!</p>
        <router-link to="/libros" class="clickable">Puedes volver al modo lectura a gestionar historias.</router-link>
      </div> 
      <button v-if="!oksignup" @click="publish" class="button">Publicar</button>
    </div> 
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { ref, reactive, onMounted } from 'vue'
import { useStore } from "vuex"
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "NewStory",
  components: {
    Editor
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = reactive({
      title: "",
      author: "",
      review: "",
      body: ""
    })
    const closures = []
    const error = reactive({})
    const file = ref("")
    const oksignup = ref(false)

    const  fileSelected = (event) => file.value = event.target.files[0]

    const publish = () => {
      if(file.value=="") error.value = { image: "Introduce una imagen" }
      else if(closures.length<=1 || closures[0]=="" || closures[1]=="") error.value = { decisions: "Recuerda incluir dos decisiones" }
      else{
        error.value = {}
        let fd = new FormData()
        fd.append('file', file.value)
        fd.append('title', form.title)
        fd.append('author', form.author)
        fd.append('review', form.review)
        fd.append('body', form.body)
        fd.append('closure', closures[0])
        fd.append('closure', closures[1])
        fetch('http://localhost:8081/stories/create',{
          method: "POST",
          body: fd
        })
          .then(resp=>resp.json())
          .then(data=>{
            if(data=="ok") oksignup.value = true
            else error.value = data
          })
      }
    }

    onMounted(() => { if(store.state.user.admin!=true) router.push(`/`) })

    return {
      form,
      closures,
      error,
      oksignup,
      publish,
      fileSelected 
    }
  },
}
</script>

<style lang="scss" scoped>

.view-top{
  width: 90%;
  max-width: 900px;
}
.box{
  margin-bottom: 40px;
  &-info{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
}
.info{
 width: 40%;
}
.img{
  width: 58%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image-name{
    position: relative;
    left: 85px;
    margin-top: 8px;
    overflow: hidden;
  }
  input[type="file"]{
    position: relative;
    right: 135px;
  }
}
input[type="text"],textarea{
  margin: 4px 0;
  width: 100%;
  border: none;
  border-bottom: 1px solid $backgroundColor;
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
.error-center{
  p{
    margin: 0 auto;
  }
}
.ok{
  text-align: center;
  p{
    margin: 0;
  }
}

@media (max-width: 990px){
  .img{
    .image-name{
      left: 105px;
    }
  }
}
@media (max-width: 575px){
  .box{
    &-info{
      flex-direction: column;
    }
  }
  .info{
    width: 100%;
  }
  .img{
    width: 100%;
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