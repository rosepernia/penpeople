<template>
<div class="view-top authors">
 
  <AuthorBox v-for="(user,ind) in users" :key="ind"
    :avatar="user.avatar"
    :email="user.email"
    :nickname="user.nickname"
    :likes="user.likes"
    />
 
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
  setup(props) {

    let users=reactive([])
     
    onMounted(() => {
        list()
        })

    function list(){
      fetch('http://localhost:8081/users/list',{
        method: 'POST',
        body: JSON.stringify({
          "nickname":"",
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

    return { users  
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

</style>