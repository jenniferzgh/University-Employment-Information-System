<template>
  <div class="elogin">
    <div class="slogin_title">
      <h2>企业登录</h2>
    </div>
    <div class="fill" id="fill1">
      <span>企业登录帐号:</span>
      <el-input v-model="eid" placeholder="请输入学号" class="input_box"></el-input>
    </div>
    <div class="fill">
      <span>企业登录密码:</span>
      <el-input v-model="epwd" placeholder="请输入密码" class="input_box" show-password></el-input>
    </div>
    <div id="confirm_line">
      <div class="link_box1" @click="postEloginInfo">
        <el-row>
          <el-button>登录</el-button>
        </el-row>
      </div>
      <div @click="gotoRegister">
        <el-row>
          <el-button>去注册</el-button>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import { setToken, setUserType } from '../services/auth'
export default {
  name: 'elogin',
  data() {
    return {
      eid: '',
      epwd: ''
    }
  },
  methods: {
    postEloginInfo() {
      let msg = {
        'id': this.eid,
        'password': this.epwd
      };
      this.$axios.post('/api/auth/company/login', msg).then(response => {
        if (response.status === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });

          setToken(response.data.data);
          setUserType('2');
          this.$router.push({ name: 'home' })
        }
      }).catch()
    },
    gotoRegister() {
      this.$router.push({ name: 'eregister' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elogin {
  width: 600px;
  height: 400px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 200px;
  padding: 20px;
  border-radius: 3px;
}
#confirm_line {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.link_box1 {
  margin-right: 20px;
}
</style>
