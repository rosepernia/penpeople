<template>
  <div class="logo">
    <transition name="rotate-one" appear>
      <div class="square red"></div>
    </transition>
    <transition name="rotate-two" appear>
      <div class="square blue"></div>
    </transition>
    <transition name="rotate-three" appear>
      <div class="square red"></div>
    </transition>
    <transition name="rotate-four" appear>
      <div class="square blue"></div>
    </transition>
    <div class="text">
      <h1>PENPEOPLE</h1>
      <h2>Historias que no acaban...</h2>
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
  width: 400px;
  height: 400px;
}
.red{
  background-color: #d44d3e;
}
.blue{
  background-color: #64e8f1;
}
.text{
  position: absolute;
  top: 155px;
  left: 10%;
  width: 80%;
  color: white;
  text-align: center;
  h1{
    font-size: 3.2rem;
    margin: 8px auto;
  }
  h2{
    font-size: 1.7rem;
    width: 70%;
    margin: 8px auto;
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
.rotate-one-enter-from{
  transform: rotate(0deg);
}
.rotate-one-enter-to{
  transform: rotate(-90deg);
}
.rotate-one-enter-active{
  transition: all 2s ease;
}
.rotate-two-enter-from{
  transform: rotate(0deg);
}
.rotate-two-enter-to{
  transform: rotate(-90deg);
}
.rotate-two-enter-active{
  transition: all 2s ease;
  transition-delay: .15s;
}
.rotate-three-enter-from{
  transform: rotate(0deg);
}
.rotate-three-enter-to{
  transform: rotate(-90deg);
}
.rotate-three-enter-active{
  transition: all 2s ease;
  transition-delay: .3s;
}
.rotate-four-enter-from{
  transform: rotate(0deg);
}
.rotate-four-enter-to{
  transform: rotate(-90deg);
}
.rotate-four-enter-active{
  transition: all 2s ease;
  transition-delay: .45s;
}

@media (max-width: 990px){
  .logo{
    width: 350px;
    height: 350px;
  }
  .text{
    top: 130px;
    h1{
      font-size: 2.75rem;
      margin: 8px auto;
    }
    h2{
      font-size: 1.4rem;
      margin: 8px auto;
    } 
  }
}

@media (max-width: 575px){
  .logo{
    width: 300px;
    height: 300px;
  }
  .text{
    top: 110px;
    h1{
      font-size: 2.5rem;
      margin: 8px auto;
    }
    h2{
      font-size: 1.2rem;
      margin: 8px auto;
    } 
  }
}
</style>