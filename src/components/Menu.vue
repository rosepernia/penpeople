<template>
 <div>
    <router-link to="/">
        <img class="logo" src="@/assets/images/logo.png" alt="logo Penpeople">
    </router-link>
    <router-link to="/autores">Autores</router-link> 
 </div>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style lang="scss">

.logo{
    width: 120px;
    height: 120px;
    margin-left: 30px;
}

</style>
