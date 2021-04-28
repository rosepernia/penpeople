<template> 
  <div class="view-top" v-if="block.value && admin==true">
    <div class="head">
      <h2 class="head-title">{{block.value.story.title}}<i class="bi bi-arrow-left-circle clickable" @click="comeBack"></i></h2> 
    </div>
    <div class="box">
      <div><p class="box-title">{{block.value.title}}</p></div>
      <div class="box-data">
        <router-link :to="`/perfil/${block.value.author.nickname}`"><p class="box-author">{{block.value.author.nickname}}</p>
        <img :src="require(`../assets/img/users/${block.value.author.avatar}`)" v-if="block.value.author.avatar" alt="Foto autor" class="box-avatar"></router-link>
      </div>
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
        v-model="block.value.body"
      />
      <div class=error><p v-if="error">{{error}}</p></div>
      <div class="closures">
        <p v-if="block.value.closure.length==0" class="end">THE END</p>
        <p v-for="(option, i) in block.value.closure" :key="i" class="closures-choose">{{option}}</p>
      </div>
      <button @click="send" class="button">Corregir</button>
    </div> 
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
import { ref, reactive, onMounted, watch } from 'vue'
import { useStore } from "vuex"
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "EditBlock",
  components: {
    Editor
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const block = reactive({})
    const error = ref("")
    const admin = ref(false)

    const getBlock = () => {
      admin.value = store.state.user.admin
      if(admin.value!=true) router.push(`/`)
      fetch('http://localhost:8081/blocks/findbyid',{
        method:'POST',
        body: JSON.stringify({_id: route.params.id}),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp=>resp.json())
        .then(data=>{
          block.value=data
        })          
    }

    const send = () => {
        fetch('http://localhost:8081/blocks/edit',{
          method: "POST",
          body: JSON.stringify({ _id: route.params.id, body: block.value.body }),
          headers: {'Content-Type':'application/json'}
        })
          .then(resp=>resp.json())
          .then(data=>{
            if(data=="ok") router.push(`/lectura/${block.value.story._id}/${block.value.blockid}`)
            else error.value = data.body
          })
    }

    const comeBack = () => {
      router.push(`/lectura/${block.value.story._id}/${block.value.blockid}`)
    }

    onMounted(() => getBlock())

    return {
      block,
      error,
      send,
      admin,
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
    left: 60px;
    position: absolute;
  }
  &-avatar{
    margin: 0 8px 8px 0;
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
.closures{
  margin: 0 auto;
  display:flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 90%;
  &-choose{
    text-align: center;
    font-size: $size1;
    margin: 10px;
    padding: 5px;
    width: 210px;
    border-bottom: 1px solid #888;
  }
  .end{
    margin: 0;
    padding: 10px;
  }
}
.button{
  margin-top: 8px;
}

@media (max-width: 990px){
  
}
@media (max-width: 575px){
  
}

</style>