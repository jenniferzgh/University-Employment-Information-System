<template>
  <div class="login">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'




    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h2 {
  font-size: 26px;
}
.fill {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
#fill1 {
  margin-top: 40px;
}
.fill > span {
  height: 35px;
  line-height: 35px;
}

.input_box {
  width: 400px;
  margin-left: 10px;
}
</style>
