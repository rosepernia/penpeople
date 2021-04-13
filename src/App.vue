<template>
  <Menu/>
  <router-view />
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "App",
  components: {
    Menu,
  },
  setup() {
   
    return {
      
    }
  },
}
</script>

<style lang="scss">

</style>
