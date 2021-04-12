<template>
  <div>
    <Menu/>
    <div class="head">
      <slot />
    </div>
    <button class="btn-1">Leer</button>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "BasicLayout",
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
.head {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.btn-1 {
  width: 130px;
  height: 40px;
  line-height: 42px;
  border-radius: 10px;
  padding: 0;
  border: none;
  background: #d37469;
  font-family: 'Raleway', sans-serif;
  color:#fff;
  /* background: linear-gradient(
    0deg,
    rgba(255, 27, 0, 1) 0%,
    rgba(251, 75, 2, 1) 100%
  ); */
}
.btn-1:hover {
  color: #d37469;
  background: transparent;
  box-shadow: none;
}
.btn-1:before,
.btn-1:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #d37469;
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}
.btn-1:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.btn-1:hover:before,
.btn-1:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
</style>