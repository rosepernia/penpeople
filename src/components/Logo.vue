<template>
  <div class="logo">
    <transition name="rotate-one" appear>
      <div class="square red"></div>
    </transition>
    <transition name="rotate-two" appear>
      <div class="square blue"></div>
    </transition>
    <transition name="rotate-three" appear>
      <div class="square blue"></div>
    </transition>
    <transition name="rotate-four" appear>
      <div class="square red"></div>
    </transition>
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
  background-color: #d44d3e;
}
.blue{
  background-color: #64e8f1;
}
.text{
  position: absolute;
  top: 180px;
  left: 20%;
  width: 60%;
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
    width: 400px;
    height: 400px;
  }
  .text{
    top: 140px;
    h1{
      font-size: 2rem;
    }
    h2{
      font-size: 1.05rem;
    } 
  }
}

@media (max-width: 480px){
  .logo{
    width: 300px;
    height: 300px;
  }
  .text{
    top: 100px;
    h1{
      font-size: 1.5rem;
    }
    h2{
      font-size: .9rem;
    } 
  }
}
</style>