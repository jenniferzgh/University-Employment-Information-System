<template>
  <div class="slogin">
    <div class="slogin_title">
      <h2>学生登录</h2>
    </div>
    <div class="fill" id="fill1">
      <span>教务系统学号:</span>
      <el-input v-model="studentId" placeholder="请输入学号" class="input_box"></el-input>
    </div>
    <div class="fill">
      <span>密码:</span>
      <el-input v-model="studentPwd" placeholder="请输入密码" class="input_box" show-password></el-input>
    </div>
    <div class="fill">
      <span>选择所在学校：</span>
      <el-cascader v-model="school" :options="schoolList" :props="{ expandTrigger: 'hover' ,value:'id'}">
      </el-cascader>
    </div>
    <!-- <router-link to="/" id="confirm"> -->
    <div @click="postSlogin" id="confirm">
      <el-row>
        <el-button>登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { setToken, setUserType } from '../services/auth'
export default {
  name: 'slogin',
  data() {
    return {
      studentId: '',
      studentPwd: '',
      school: [],
      schoolList: []
    }
  },
  methods: {
    getSchoolList() {
      this.$axios.get('/api/school/tree').then((response) => {
        this.schoolList = response.data
      })

    },
    postSlogin() {
      let params = {
        'schoolId': this.school[1],
        'password': this.studentPwd,
        'id': this.studentId
      };
      this.$axios.post('/api/auth/student/login', params).then((response) => {
        if (response.status === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          setToken(response.data.data.token);
          setUserType('1');
          this.$router.push({ name: 'home' });
        }
      }).catch(err => {
        console.log(err);
      })

    }
  },
  created() {
    this.getSchoolList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slogin {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 200px;
  padding: 20px;
  border-radius: 3px;
}

#confirm {
  margin-top: 50px;
}
</style>
