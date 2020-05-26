<template>
  <div class="sform">
    <div class="head">
      <el-upload class="avatar-uploader" action="http://127.0.0.1:9004/file/upload/posts" :show-file-list="false"
        :on-success="getAvatar" :before-upload="beforeA" :headers="xtoken">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="main">
      <h2>基本信息</h2>
      <div class="studentInfoPart1 studentInfoPart">
        <div class="fill_in" v-for="item in studentlistObj" v-bind:key="item.id">
          <span>{{item.title}}：</span>
          <el-input v-model="user[item.id].value" :placeholder="item.placeholder" :class="'input_box'+item.id">
          </el-input>
        </div>
        <div class="sex fill_in">
          <span>性别：</span>
          <el-select v-model="sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fill_in">
          <span>学校</span>
          <el-input placeholder="请输入学校" v-model="schoolName" :disabled="true">
          </el-input>
        </div>
        <div class="selectClass fill_in">
          <span>专业：</span>
          <el-cascader v-model="className" :options="classNameList" :props="{ expandTrigger: 'hover' ,value:'id'}">
          </el-cascader>
        </div>
        <div class="identity fill_in">
          <span>身份：</span>
          <el-select v-model="identity" placeholder="请选择">
            <el-option v-for="item in identityList" :key="item.value" :label="item.politicalName" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="jonIntension fill_in">
          <span>求职意向：</span>
          <el-cascader v-model="jonIntension" :options="jonIntensionList" :props="{ expandTrigger: 'hover' ,value:'id'}"
            @change="handleChange">
          </el-cascader>
        </div>
      </div>
      <h2>个人优势</h2>
      <div class="studentInfoPart2">
        <div class="advantage fill_in">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="advantage">
          </el-input>
        </div>
      </div>
      <h2>实习经历</h2>
      <div class="internshipExperience studentInfoPart2">
        <div class="advantage fill_in">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="practice">
          </el-input>
        </div>
      </div>
      <h2>项目经历</h2>
      <div class="proojectExperience">
        <div class="advantage fill_in">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="project">
          </el-input>
        </div>
      </div>
      <h2>校园经历</h2>
      <div class="educationExperience">
        <div class="advantage fill_in">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="campus">
          </el-input>
        </div>
      </div>
    </div>
    <div class="tijiao">
      <el-button type="primary" @click="postSform">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from '../services/auth'
export default {
  name: 'sform',
  data() {
    return {
      id: '',
      imageUrl: '',
      registerCode: '',
      registerAccount: '',
      registerCodeConfirm: '',
      industry: '',
      timeRegistration: '',
      identity: '',
      sex: '',
      xtoken: { "X-token": getToken() },
      schoolName: '',
      schoolId: '',
      user: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ],
      className: [],
      school: '',
      advantage: '',
      practice: '',
      campus: '',
      project: '',
      jonIntension: [],
      jonIntensionList: [],
      classNameList: [],
      identityList: [],
      studentInfo: undefined,
      studentlistObj: [{ title: '姓名', id: '0', placeholder: '请输入姓名' },
      { title: '手机号', id: '1', placeholder: '请输入手机号' },
      { title: '邮箱', id: '2', placeholder: '请输入邮箱' },
      { title: '微信', id: '3', placeholder: '请输入微信号' },
      { title: '年龄', id: '4', placeholder: '请输入年龄' }
      ],
      sexList: [{ value: '1', label: '男' }, { value: '2', label: '女' }]

    }
  },
  methods: {
    getAvatar(res, file) {
      // this.comment.handleAvatarSuccess(res, file)
      this.imageUrl = res.data
    },
    beforeA(file) {
      // this.comment.beforeAvatarUpload(file)
    },
    getwantList() {
      // this.$axios.get('/api/industry/tree').then((response) => {
      //   this.jonIntensionList = this.comment.trimTreeData(response.data);
      //   this.jonIntension = [1, 11];

      // })
      this.$Axios.all([
        this.$axios
          .get('/api/political/all')
          .then(res => res.data.data),
        this.$axios
          .get('/api/industry/tree')
          .then(res => res.data),
        this.$axios
          .get('/api/academy/tree/')
          .then(res => res.data),
        this.$axios
          .get('/api/student/info/')
          .then(res => res.data.data)
      ]).then(
        this.$Axios.spread((val1, val2, val3, val4) => {
          // val 是数组中每个接口返回的值 res.data
          console.log('4个接口全部加载完成', val1, val2, val3, val4);
          this.identityList = val1;
          this.jonIntensionList = this.comment.trimTreeData(val2);
          this.classNameList = val3;
          this.studentInfo = val4;
          this.schoolName = val4.schoolName;
          this.schoolId = val4.schoolId;
          this.user[0].value = val4.name;
          this.user[1].value = val4.tel;
          this.user[2].value = val4.mail;
          this.user[3].value = val4.wx;
          this.user[4].value = val4.age;
          this.className = [val4.academyId, val4.majorId];
          this.identity = val4.politicalId;
          this.sex = val4.sex;
          this.id = val4.id;
          this.jonIntension = [val4.industryPid, val4.industryId];
          this.advantage = val4.advantage;
          this.practice = val4.practice;
          this.campus = val4.campus;
          this.project = val4.project;
          this.imageUrl = val4.photo;
        })
      ).catch(err => {
        console.log(err);
      })
    },
    handleChange() {
      console.log('123')
    },
    placehover() { },
    postSform() {
      console.log('123')
      let params = {
        'id': this.id,
        'name': this.user[0].value,
        'age': this.user[4].value,
        'schoolId': this.schoolId,
        'academyId': this.className[0],
        'majorId': this.className[1],
        'tel': this.user[1].value,
        'wx': this.user[3].value,
        'mail': this.user[2].value,
        'politicalId': this.identity,
        'industryId': this.jonIntension[1],
        'industryPid': this.jonIntension[0],
        'advantage': this.advantage,
        'practice': this.practice,
        'campus': this.campus,
        'project': this.project,
        'sex': this.sex,
        'photo': this.imageUrl
      };
      this.$axios.put('/api/student/resume', params).then((response) => {
        if (response.status === 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }


  },
  created() {
    this.getwantList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sform {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 20px 50px 20px;
}
.head {
  margin: 0 auto;
  margin-bottom: 40px;
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.sform > .main {
  width: 900px;
  margin: 0 auto;
  border-top: 1px solid #f5f5f5;
  padding: 30px;
  flex-direction: row;
}
.main > .studentInfoPart {
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.main > .studentInfoPart > .fill_in {
  width: 400px;
  height: 40px;
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.main > .studentInfoPart > .fill_in > div {
  width: 280px;
}
</style>
