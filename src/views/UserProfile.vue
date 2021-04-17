<template> 
  <div :class="{ 'view-top': true, profile: true, profile2: !yourProfile, profile3: admin }">
    <div class="profile-info box" v-if="user.value">
      <div class="info-one">
        <div class="img">
          <img :src="user.value.avatar" alt="Avatar usuario" class="avatar">
          <div v-if="yourProfile">
            <label for="image" class="button">Subir imagen</label>
            <input type="file" id="image" accept=".jpg,.png,.jpeg*" @change="fileSelected">
          </div>
        </div>
        <div class="nickname">
          <div>
            <input type="text" v-model="user.value.nickname" placeholder="Nickname" :readonly="!yourProfile">
            <div class="error" v-if="yourProfile"><p v-if="error.value">{{error.value.nickname}}{{error.value.repeat}}</p></div>
          </div>
          <div class="likes" v-if="!admin">
            <p>{{role}}</p>
            <i class="bi bi-heart"></i><p>{{user.value.likes}}</p>
          </div>
        </div>
        <input type="text" v-model="user.value.firstname" placeholder="Nombre" v-if="yourProfile">
        <div class="error" v-if="yourProfile"><p v-if="error.value">{{error.value.firstname}}</p></div>
        <input type="text" v-model="user.value.lastname" placeholder="Apellido" v-if="yourProfile">
        <div class="error" v-if="yourProfile"><p v-if="error.value">{{error.value.lastname}}</p></div>
        <input type="text" v-model="user.value.email" v-if="yourProfile" readonly>
      </div>
      <div class="info-two">
        <div v-if="!admin">
          <div v-if="yourProfile" class="socials"><i class="bi bi-instagram"></i><input type="text" class="social" v-model="user.value.instagram" placeholder="Instagram"></div>
          <div v-if="yourProfile" class="socials"><i class="bi bi-twitter"></i><input type="text" class="social" v-model="user.value.twitter" placeholder="Twitter"></div>
          <div v-if="yourProfile" class="socials"><i class="bi bi-share"></i><input type="text" class="social" v-model="user.value.other" placeholder="Página web"></div>
          <textarea v-model="user.value.bio" placeholder="Biografía" :readonly="!yourProfile"></textarea>
          <div class="error" v-if="yourProfile"><p v-if="error.value">{{error.value.bio}}</p></div>
          <div class="social-media" v-if="!yourProfile">
            <a :href="`https://www.instagram.com/${user.value.instagram}`" target="blank" v-if="user.value.instagram!=''"><i class="bi bi-instagram"></i></a>  
            <a :href="`https://www.twitter.com/${user.value.twitter}`" target="blank" v-if="user.value.twitter!=''"><i class="bi bi-twitter"></i></a>  
            <a :href="`https://${user.value.other}`" target="blank" v-if="user.value.other!=''"><i class="bi bi-share"></i></a>  
          </div>
        </div>
        <button class="button" v-if="yourProfile" @click="editUser">Modificar</button>
      </div>
    </div>

    <div class="profile-blocks" v-if="user.value">
      <div v-if="!admin">
        <div class="title">Contribuciones</div>
        <div class="box blocks-box">
          <h1>bloques</h1>
        </div>
      </div>
      <div v-if="yourProfile">
        <div class="title">Pendientes de moderación</div>
        <div class="box blocks-box">
          <h1>bloques</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { ref, reactive, watch } from "vue";
import { useStore } from "vuex"

export default {
  name: "UserProfile",
  components: {},

  setup() {
    const store = useStore()
    const route = useRoute ()
    const user = reactive({})
    const yourProfile = ref(false)
    const admin = ref(false)
    const error = reactive({})
    const role = ref("")
    const file = ref("")

    const findUser = () => {
      fetch("http://localhost:8081/users/findbynickname",{
        method: "POST",
        body:JSON.stringify({nickname: route.params.nickname}),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          user.value=data
          admin.value=user.value.admin
          role.value = user.value.likes <= 100 ? "Novel" : user.value.likes <= 400 ? "Experto" : "Embajador"
          if(store.state.user.nickname==user.value.nickname) yourProfile.value = true
          if(store.state.user.nickname!=user.value.nickname && admin.value==true) user.value = ""
          })
    }

    const fileSelected = (event) => {
      file.value = event.target.files[0]
      console.log(file.value)
    }

    const editUser = () => {
      fetch("http://localhost:8081/users/edit",{
        method: "POST",
        body:JSON.stringify({ email: user.value.email, firstname: user.value.firstname, lastname: user.value.lastname, nickname: user.value.nickname, avatar: user.value.avatar, bio: user.value.bio, instagram: user.value.instagram, twitter: user.value.twitter, other: user.value.other }),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          if(data.email) {
            error.value = ""
            user.value = data
            store.commit("setUser",data)
            route.params.nickname = data.nickname
            }
          else error.value = data
          })
    }

    watch(store.state, () => findUser())
    
    findUser()
   
    return {
      route,
      user,
      yourProfile,
      admin,
      error,
      role,
      file,
      fileSelected,
      editUser
    }
  },
}
</script>

<style lang="scss" scoped>
.view-top{
  margin-top: 150px;
}
.profile{
  width: 80%;
  max-width: 800px;
  height: 590px;
  margin-top: 120px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  &-info{
    width: 36%;
  }
  &-blocks{
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .blocks-box{
      height: 230px;
    }
  }
}
.profile2{
  margin-top: 200px;
  height: 350px;
  .profile-blocks{
    .blocks-box{
      height: 300px;
    }
  }
}
.profile3{
  margin-top: 200px;
  height: 380px;
  .profile-blocks{
    .blocks-box{
      height: 330px;
    }
  }
  .profile-info{
    flex-wrap: wrap;
  }
  .info-one{
    width: 100%;
  }
  .info-two{
    width: 100%;
    button{
      margin-top: 6px;
    }
  }
  
}
.avatar{
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  box-shadow: 1px 1px 3px #cfcdcd;
}
.info-one{
  width: 100%;
  .img{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 10px;
    input[type="file"]{
      display: none;
    }
  }
  .nickname{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $size2;
    input{
      width: 70%;
      font-size: $size2;
      border: none;
    }
    .likes{
      width: 100px;
      position: relative;
      i::before{
        color: $primaryColor;
        position: absolute;
        top: 36px;
      }
      p{
        text-align: center;
        margin: 0;
      }
      p:last-child{
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}
.info-two{
  text-align: center;
  i::before{
    color: #dbd9d9;
  }
  .socials{
    display: flex;
    justify-content: space-between;
  }
  .social{
    margin-left: 10px;
  }
  .social-media{
    display: flex;
    justify-content: space-evenly;
    i::before{
      font-size: $size3;
    }
  }
  button{
    margin-top: 6px;
  }
}
input,textarea{
  margin: 4px 0;
  width: 100%;
  border: none;
}
input{
  border-bottom: 1px solid $backgroundColor;
}
textarea{
  height: 100px;
  resize: none;
}

@media (max-width: 990px){
  .profile{
    height: 100%;
    flex-direction: column;
    &-info{
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    &-blocks{
      width: 100%;
    }
  }
  .info-one{
    width: 55%;
  }
  .info-two{
    width: 35%;
    button{
      margin-top: 20px;
    }
  }
  .avatar{
    width: 80px;
    height: 80px;
  }
  textarea{
    height: 120px;
  }
}

@media (max-width: 575px){
  .profile{
    &-info{
      display: block;
    }
    &-blocks{
      width: 100%;
    }
  }
  .info-one,.info-two{
    width: 100%;
  }
  .info-two{
    button{
      margin-top: 6px;
    }
  }
  .avatar{
    width: 80px;
    height: 80px;
  }
  textarea{
    height: 100px;
  }
}

</style>