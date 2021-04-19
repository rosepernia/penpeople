<template>

  <div class="author box">
    <div class="avatar">
      <img v-bind:src="avatar">
    </div>
    <div class="description">
      <h2 class="nickname" v-text="`@${nickname}`"></h2>
      <div class="likes">
        <i class="bi bi-heart"></i>
        <h2 v-text="likes"></h2>
      </div>
      <router-link :to="`/perfil/${nickname}`" class="button">Ver usuario</router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AuthorBox',
  components: {
  },
  props: {
    avatar:String,
    email:String,
    nickname: String,
    likes:Number
  },
  setup() {
   
  },
}
</script>

<style lang="scss">

  .author{
    display:flex;
    width: 350px;
    margin: 20px;
      .avatar{
      /* background-color: red; */

        img{
          margin-top: 15px;
          margin-right: 15px;
          width: 120px;
          height: 120px;
          object-fit: cover;
          object-position: center;
          border-radius: 100%;
          box-shadow: 1px 1px 3px #cfcdcd;
        }
      }
      .description{
        /* background-color: green; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        justify-content: center;
        align-content: center;
          h2{
            margin:0px;
          }
          .likes{
            display: inline-flex;
            margin-bottom: 10px;
            i{
              padding-top:2px;
              margin:0 10px; 
              font-size: 23px;
              color: $primaryColor;
            }
           /*  h2{
              background-color: yellow;
            }
             */
          }
    
      }

   
  }
  

</style>
