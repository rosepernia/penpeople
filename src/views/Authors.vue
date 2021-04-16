<template>
<div class="view-top">
<div class="search">
  <input type="text" @keyup="inputFilter" placeholder="Nickname">
</div>
<div class="authors">
  <AuthorBox v-for="(user,ind) in users" :key="ind" 
    :avatar="user.avatar"
    :email="user.email"
    :nickname="user.nickname"
    :likes="user.likes"
    />
</div> 
</div>
</template>

<script>
import AuthorBox from "@/components/AuthorBox";
import { ref, reactive, computed, onMounted } from 'vue'
export default {
  name: "Author",
  components: {
    AuthorBox
  },
  setup() {

    let users=reactive([])

    let inputFilter=(e)=>{
      let letters=e.target.value
      list(letters)
      }

   onMounted(() => {
        list("")
        })

    function list(letters){
      fetch('http://localhost:8081/users/list',{
        method: 'POST',
        body: JSON.stringify({
          "nickname":letters,
          "admin":"false"
        }),
        headers: {'Content-Type':'application/json'}
      })
      .then(resp=>resp.json())
      .then(data=>{
        console.log(data)
        users.splice(0)
        data.forEach(user => {
        users.push(user)
        })
      })            
    }
    
    return { users  , inputFilter
    }
  },
}


</script>

<style lang="scss" scoped>

.authors{
  margin-right: auto;
  margin-left: auto ;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-evenly;
  
}
.search{
  margin-left: 100px;
  
  input{
  border: 0;
  height: 25px;
  }
}

</style>