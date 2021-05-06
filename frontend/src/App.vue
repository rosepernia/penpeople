<template>
  <Menu/>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> 
  <Footer/>
</template>

<script>
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Menu,
    Footer
  },
  setup() {
   
    return {
      
    }
  },
}
</script>

<style lang="scss">
.route-enter-from{
  opacity: 0;
  position: relative;
  top: 200px;
}
.route-enter-to{
  position: relative;
  top: 0px;
}
.route-enter-active{
  transition: all 0.5s ease-out;
}
.route-leave-from{
  position: relative;
  top: 0px;
}
.route-leave-to{
  opacity: 0;
  position: relative;
  top: -200px;
}
.route-leave-active{
  transition: all 0.5s ease-in;
}

</style>
