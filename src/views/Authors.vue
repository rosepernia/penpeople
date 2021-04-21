<template>
<div class="view-top">
  <div class="search">
    <input type="text" @keyup="inputLetter" v-model="letters" placeholder="Nickname">
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
import { ref, reactive, onMounted } from 'vue'
export default {
  name: "Author",
  components: {
    AuthorBox
  },
  setup() {
    const users = reactive([])
    const letters = ref("")

    onMounted(() => {
      list("")
    })

    let inputLetter = () => {
      list(letters.value)
    }

    const list = (letters) => {
      fetch('http://localhost:8081/users/list',{
        method: 'POST',
        body: JSON.stringify({
          "nickname":letters,
          "admin":"false"
        }),
        headers: {'Content-Type':'application/json'}
      })
      .then(resp => resp.json())
      .then(data => {
        
        data.sort((a, b) => {
        if (a.likes > b.likes) return -1
        if (a.likes < b.likes) return 1;
        return 0;
        })
        
        users.splice(0)
        data.forEach(user => {
        users.push(user)
        })
      })            
    }
    
    return {
      users,
      inputLetter,
      letters
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
  margin-left: 130px;
  
  input{
  border: 0;
  height: 25px;
  font-size: $size1;
  }
}

@media (max-width: 575px){
  .search{
    margin-left: auto;
    margin-right: auto;
    display:flex;
    justify-content: center;
  }
}


</style>