<template>
  <div class="author box">
    <img class="avatar" :src="require(`../assets/img/users/${avatar}`)">
    <div class="description">
      <p class="nickname size3" v-text="`@${nickname}`"></p>
      <div class="likes size3" v-if="user=='true'">
        <i class="bi bi-heart-fill"></i>
        <p v-text="likes"></p>
      </div>
      <div class="email" v-if="user=='false'">
        <p v-text="email"></p>
      </div>
      <div class="buttons">
        <router-link :to="`/perfil/${nickname}`" class="button" v-if="user=='true'">Ver usuario</router-link>
        <i class="bi bi-trash clickable" v-if="admin==true" @click="closeAccount"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { ref, watch, onMounted } from 'vue'

export default {
  name: 'AuthorBox',
  components: {
  },
  props: {
    avatar:String,
    email:String,
    nickname: String,
    likes:Number,
    user:String,
  },
  setup(props, context) {
    const store = useStore()
    const admin = ref(false)

    const closeAccount = () => {
      fetch("http://localhost:8081/users/closeaccount",{
        method: "POST",
        body:JSON.stringify({ email: props.email }),
        headers: {"Content-type":"application/json"}
      })
        .then(resp => resp.json())
        .then(() => context.emit('update'))
    }

    watch(store.state, () => admin.value = store.state.user.admin)

    onMounted(() => admin.value = store.state.user.admin)

    return{
      admin,
      closeAccount
    }
  },
}
</script>

<style lang="scss" scoped>
.author{
  display:flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: 10px 5px;
  img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    box-shadow: 1px 1px 3px #cfcdcd;
  }
  .description{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    overflow: hidden;
    p{
      margin:0px;
    }
    .likes{
      display: inline-flex;
      margin-bottom: 10px;
      i{
        padding-top:2px;
        margin:0 10px; 
        font-size: $size3;
        color: $primaryColor;
      }
    }
    .email{
      margin-bottom: 10px;
      font-size: 1.4rem;
    }
    .buttons{
      display: inline-flex;
      i{
        margin-left: 10px;
        font-size: $size3;
        color: #888;
      }
    }
  }
}
  @media (max-width: 990px){
  .author{
    width: 250px;
    img{
      width: 80px;
      height: 80px;
    }
    p{
      font-size: $size2;
    }
    .description{
      .likes{
        i{
          font-size: $size2;
        }
      }
      .email{
        p{
          font-size: 1rem;
        }
      }
      .buttons{
        i{
          font-size: $size2;
        }
      }
    }
  }
}

</style>
