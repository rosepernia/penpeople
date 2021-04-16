<template>
  <div class="logo">
    <div class="square black"></div>
    <div class="square blue"></div>
    <div class="square red"></div>
    <div class="square blue"></div>
    <div class="square text">
      <h1>PENPEOPLE</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoMini',
}
</script>

<style lang="scss" scoped>
.logo{
  position: relative;
  width: 100px;
  height: 100px;
  div:first-child{
    transform: rotate(8deg);
  }
  div:nth-child(3){
    transform: rotate(20deg);
  }
  div:nth-child(4){
    transform: rotate(30deg);
  }
}
.red{
  background-color: #d44d3e;
  mix-blend-mode: multiply;
}
.blue{
  background-color: #64e8f1;
  mix-blend-mode: multiply;
}
.black{
  background-color: rgb(83, 83, 83);
  mix-blend-mode: multiply;
}
.text{
  color: white;
  display: flex;
  justify-content: center;
  h1{
    font-size: .6em;
    font-weight: 500;
  }
}
.square{
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
}

@media (max-width: 575px){
  .logo{
    width: 80px;
    height: 80px;
  }
  .text{
    h1{
      font-size: .5em;
    }
  }
}
</style>