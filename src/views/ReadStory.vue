<template> 
  <div class="block">
    <h2 class="title2">THE OTHER'S GOLD 
     <!--  <router-link to="/mapa"><img src="/img/stories/mapred.png" alt="" class="avatar"> </router-link> -->
    </h2> 
    <div class="read">
       <!-- <h1>{{stories[0].title}}</h1>  
      <p>{{stories[0].body}}</p>  -->
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem consequuntur quas incidunt amet? Perspiciatis placeat vero, nobis molestiae libero, aut similique tenetur natus unde dicta laudantium nesciunt ratione recusandae quisquam!</p>
    </div>
    <div class="send">
      <router-link to="/nuevo-fragmento"><p class="closure">Se marcha a la playa</p></router-link>
      <router-link to="/nuevo-fragmento"><p class="closure">Se queda con Antonia</p></router-link>
      <!--  <router-link to="/nuevo-fragmento"><button class="button">Se marcha a la playa</button></router-link>
       <router-link to="/nuevo-fragmento"><button class="button">Se queda con Antonia</button></router-link>
 -->
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "ReadStory",
  components: {},

  setup() {
   let stories=reactive([])

   onMounted(()=> {
        list()
        }) 

    function list(){
            fetch('http://localhost:8081/stories/list',{
               method:'POST',
               body: JSON.stringify({}),
               headers: {'Content-Type':'application/json'}
            })
              .then(resp=>resp.json())
              .then(data=>{
                    data.forEach(story => {
                        stories.push(story)
                    })
                      console.log(stories)
              })            
    }
    return {
      stories,
    }
  },
}
</script>

<style lang="scss" scoped>

p{
  padding: 20px 20px 20px 20px;
}
 .block{
  margin: 120px auto 0 auto;
  width: 90%;
  max-width: 900px;
  min-height: 400px;
  /* border: 1px solid $textColor;
   */
}

.read{
  margin: 20px auto 0 auto;
  width: 90%;
  max-width: 900px;
  height: 400px;
  /* background-color: white; */
}

.send{
  margin: 0 auto 0 auto;
  display:flex;
  justify-content: space-evenly;
  /* background-color: white; */
  width: 90%;
}

.title2{
    margin-bottom: 10px ;
   /*  background-color: $primaryColor; */
    color: #52b1b9;
    padding: 3px;
    font-weight: bold;
   /*  text-align: center; */
    font-size: $size1;
    border-bottom:1px solid   #39888f;
}

.avatar{
  margin-left: 480px;
  width: 50px;
  height: 40px;
  object-fit: cover;
  object-position: center;
}

.closure{
  display:flex;
  justify-content: center;
  font-size: $size1;
  /* padding:10px 10px 10px 5px;  */
  width:250px;
  border:none;
  border-bottom:1px solid black;
  background-color: transparent;
}  
.closure:focus  	{ outline:none; }
.closure:hover {
  color: #52b1b9;
  border-bottom:#52b1b9;
} 	

</style>