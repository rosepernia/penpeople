<template>
  <div class="logo">
    <transition name="rotate">
      <div class="square red one"></div>
    </transition>  
      <div class="square blue two"></div>
      <div class="square blue three"></div>
      <div class="square red four"></div>
    
    <div class="text">
      <h1>PENPEOPLE</h1>
      <h2>una historia que no acaba...</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
}
</script>

<style lang="scss" scoped>
.logo{
  margin: 0 auto;
  position: relative;
  border: 1px solid rgb(199, 194, 194);
  width: 500px;
  height: 500px;
}
.red{
  background-color: #e0144a;
}
.blue{
  background-color: #01b2e3;
}
.text{
  position: absolute;
  top: 36%;
  left: 20%;
  width: 60%;
  background-color: black;
  color: white;
  text-align: center;
  h1{
    font-size: 2.5em;
    margin: 16px auto;
  }
  h2{
    font-size: 1.3em;
    width: 70%;
    margin: 16px auto;
  }
}
.square{
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  mix-blend-mode: multiply;
}
/*.one{
  animation-delay: 0.45s;
}
.two{
  animation-delay: 0.3s;
}
.three{
  animation-delay: 0.15s;
}
.rotate-enter-from{
  transform: rotate(0deg);
}
.rotate-enter-to{
  transform: rotate(-90deg);
}
.rotate-enter-active{
  transition: all 2s ease;
}*/
.rotate-enter-from{
  opacity: 0;
}
.rotate-enter-to{
  opacity: 1;
}
.rotate-enter-active{
  transition: all 2s ease;
}
.rotate-leave-from{
  opacity: 1;
}
.rotate-leave-to{
  opacity: 0;
}
.rotate-leave-active{
  transition: all 2s ease;
}
</style>