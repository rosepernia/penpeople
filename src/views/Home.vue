<template>
<div class="center home">
  <Logo/>
  <p class="size4">LEER</p>
  <i class="bi bi-arrow-right-circle size5 button"></i>
</div>
</template>

<script>
import Logo from '@/components/Logo.vue'
export default {
  name: 'Home',
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.home{
  padding-top: 30px;
  text-align: center;
  p{
    margin: 0;
  }
}
</style>
