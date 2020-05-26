<template>
  <div class="hello">
    <div class="nav-bar">
      <div class="nav-left">
        <div class="class tabForSform">
          <router-link to="../home">首页</router-link>
        </div>
        <div class="tabForSform" v-if="userType==='1'">
          <router-link to="../sform">简历填写</router-link>
        </div>
        <div class=" tabForEform" v-if="userType==='2'">
          <router-link to="../eform"> 招聘信息填写</router-link>
        </div>
      </div>
      <div class="nav-right">
        <div class="slogin login" v-if="userType==='0'">
          <router-link to="login/slogin">学生登录</router-link>
        </div>
        <div class="elogin login" v-if="userType==='0'">
          <router-link to="login/elogin">企业登录</router-link>
        </div>
        <div class="eregister login" v-if="userType==='0'">
          <router-link to="login/eregister">企业注册</router-link>
        </div>
        <div class="emessage login" v-if="userType==='2'">
          <router-link to="../messagePage">消息</router-link>
        </div>
        <div class="longout login" v-if="userType!='0'" @click="longoutClick">
          注销登录
        </div>

      </div>

    </div>
    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
import { getUserType, setToken, setUserType } from '../services/auth'
export default {
  name: 'HelloWorld',
  data() {
    return {
      userType: '0'
    }
  },
  methods: {
    longoutClick() {
      setToken(null);
      setUserType('0')
      this.userType = getUserType();
      this.$router.push({ path: 'home' })
    }

  },
  created() {
    this.userType = getUserType()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  z-index: 9999;
  width: 100%;
  height: 100px;
  min-width: 1280px;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: space-between;
}
.container {
  padding-top: 140px;
}
.nav-bar > div {
  color: #ff9900;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.login {
  display: block;
  width: 120px;
  height: 50px;
  border: 1px solid #ff9900;
  border-radius: 2px;
  line-height: 50px;
  margin-right: 20px;
}
.login > a {
  color: #ff9900;
}
.nav-left > div {
  display: block;
  width: 120px;
  height: 50px;
  border-radius: 2px;
  line-height: 50px;
  margin-right: 20px;
  margin-left: 10px;
}
.nav-left a {
  color: #ff9900;
}
</style>
