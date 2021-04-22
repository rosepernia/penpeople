<template>
<div class="view-top">
  <div class="search">
    <input type="text" @keyup="inputLetter" v-model="letters" placeholder="Nickname">
  </div>
  <div class="authors">
    <UserCard v-for="(user,ind) in users" :key="ind" @update="update"
      :avatar = "user.avatar"
      :email = "user.email"
      :nickname = "user.nickname"
      :likes = "user.likes"
      user = true
      />
  </div> 
</div>
</template>

<script>
import UserCard from "@/components/UserCard"
import { ref, reactive, onMounted } from 'vue'

export default {
  name: "Author",
  components: {
    UserCard
  },
  setup() {
    const users = reactive([])
    const letters = ref("")

    let inputLetter = () => list(letters.value)

    const list = (letters) => {
      fetch('http://localhost:8081/users/list',{
        method: 'POST',
        body: JSON.stringify({ nickname: letters, admin: "false" }),
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
        data.forEach(user => users.push(user))
      })            
    }

    const update = () => list("")

    onMounted(() => list(""))
    
    return {
      users,
      inputLetter,
      letters,
      update
    }
  },
}


</script>

<style lang="scss" scoped>

.authors{
  padding-top: 30px;
  margin-right: auto;
  margin-left: auto ;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  max-width: 1200px;
  justify-content: space-evenly;
}
.search{
  background-color: #f4f1f1d7;
  position: fixed;
  height: 35px;
  width: 100%;
  input{
    margin-left: 128px;
    border: 0;
    height: 25px;
    font-size: $size1;
  }
}

@media (max-width: 575px){
  .search{
    width: 100%;
    left: 0;
    input{
      margin-left: 0px;
      transform: translate(-50%,-0);
      position: absolute;
      left: 50%;
    }
  }
}


</style>