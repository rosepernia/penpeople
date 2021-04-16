<template> 
  <div :class="{ 'view-top': true, profile: true, profile2: !yourProfile }">
    <div class="profile-info box" v-if="user.value">
      <div class="info-one">
        <div class="img">
          <img :src="user.value.avatar" alt="Avatar usuario" class="avatar">
          <button class="button" v-if="yourProfile">Subir imagen</button>
        </div>
        <div class="nickname">
          <input type="text" v-model="user.value.nickname" placeholder="Nickname" :readonly="!yourProfile">
          <div class="likes">
            <p>Junior</p>
            <i class="bi bi-heart"></i><p>{{user.value.likes}}</p>
          </div>
        </div>
        <div class="error"><p>HOLA</p></div>
        <input type="text" v-model="user.value.firstname" placeholder="Nombre" v-if="yourProfile">
        <input type="text" v-model="user.value.lastname" placeholder="Apellido" v-if="yourProfile">
        <input type="text" :value="user.value.email" v-if="yourProfile" readonly>
      </div>
      <div class="info-two">
        <div v-if="yourProfile" class="socials"><i class="bi bi-instagram"></i><input type="text" class="social" v-model="user.value.instagram" placeholder="Instagram"></div>
        <div v-if="yourProfile" class="socials"><i class="bi bi-twitter"></i><input type="text" class="social" v-model="user.value.twitter" placeholder="Twitter"></div>
        <div v-if="yourProfile" class="socials"><i class="bi bi-share"></i><input type="text" class="social" v-model="user.value.other" placeholder="Página web"></div>
        <textarea v-model="user.value.bio" placeholder="Biografía" :readonly="!yourProfile"></textarea>
        <div class="social-media" v-if="!yourProfile">
          <a :href="`https://www.instagram.com/${user.value.instagram}`" target="blank"><i class="bi bi-instagram"></i></a>  
          <a :href="`https://www.twitter.com/${user.value.twitter}`" target="blank"><i class="bi bi-twitter"></i></a>  
          <a :href="`https://${user.value.twitter}`" target="blank"><i class="bi bi-share"></i></a>  
        </div>
        <button class="button" v-if="yourProfile">Modificar</button>
      </div>
    </div>

    <div class="profile-blocks">
      <div>
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
import { ref, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex"

export default {
  name: "UserProfile",
  components: {},

  setup() {
    const store = useStore()
    let user = reactive({})
    let yourProfile = ref(true)
    let admin = ref(false)

    const findUser = () => {
      fetch("http://localhost:8081/users/findbynickname",{
        method: "POST",
        body:JSON.stringify({nickname: 'Pepita'}),
        headers: {"Content-type":"application/json"}
      })
        .then(resp=>resp.json())
        .then(data=>{
          user.value=data
          admin.value=user.value.admin
          })
    }

    findUser()
   
    //store.commit("setUser",user)
    return {
      user,
      yourProfile,
      admin
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
  height: 530px;
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
      height: 190px;
    }
  }
}
.profile2{
  margin-top: 150px;
  height: 350px;
  .profile-blocks{
    .blocks-box{
      height: 300px;
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
  }
  .nickname{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $size2;
    input{
      width: 50%;
      font-size: $size2;
      border: none;
    }
    .likes{
      width: 80px;
      position: relative;
      i::before{
        color: $primaryColor;
        position: absolute;
        top: 36px;
        left: 10px;
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
.error{
  color: $primaryColor;
  height: 20px;
  p{
    font-size: 1.2rem;
    margin: 0;
  }
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
  .info-one,.info-two{
    width: 46%;
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
  .avatar{
    width: 80px;
    height: 80px;
  }
  textarea{
    height: 100px;
  }
}

</style>