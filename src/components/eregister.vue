<template>
  <div class="eregister">
    <div class="upload_logo">
      <el-upload action="http://127.0.0.1:9004/file/upload/posts" :show-file-list="false" :on-success="getAvatar"
        :before-upload="beforeA" :headers="xtoken">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div id="register">
      <div class="registerAccount fill_in">
        <span>账号:</span>
        <el-input v-model="registerAccount" placeholder="请输入注册账号" class="input_box" @blur="resBlur">
          {{registerAccount}}
        </el-input>
        <span v-html="action"></span>
      </div>
      <div class="registerCode fill_in">
        <span>密码:</span>
        <el-input placeholder="请设置密码" v-model="registerCode" show-password class="input_box">
          {{registerCode}}</el-input>
      </div>
      <div class="registerCodeConfirm fill_in">
        <span>密码:</span>
        <el-input placeholder="请再次输入密码" v-model="registerCodeConfirm" show-password class="input_box" @blur="resBlur2">
          {{registerCode}}
        </el-input>
        <span v-html="action2"></span>
      </div>
    </div>
    <div class="companyInfo">
      <!-- <div class="fill_in" v-for="user in listObj" v-bind:key="user.id">
        <span>{{user.title}}</span>
        <el-input v-model="titleValue[user.id].value" placeholder="在此输入" class="input_box">
        </el-input>
      </div> -->
      <div class="fill_in" v-for="item in listObj" v-bind:key="item.id">
        <span>{{item.title}}：</span>
        <el-input v-model="enterpriseInfo[item.id].value" :placeholder="item.paceholer_info" class="input_box">
        </el-input>
      </div>
      <div class="industry fill_in">
        <span>所属行业：</span>
        <el-cascader v-model="industry" :options="industryList" :props="{ expandTrigger: 'hover' ,value:'id'}">
        </el-cascader>
      </div>
      <div class="timeRegistration fill_in">
        <span class="demonstration">成立时间：</span>
        <el-date-picker v-model="timeRegistration" type="datetime" placeholder="选择日期时间" class="input_box">
        </el-date-picker>
      </div>
      <div class="companySize fill_in">
        <span>公司规模：</span>
        <el-select v-model="companySize" placeholder="请选择">
          <el-option v-for="item in companySizeList" :key="item.value" :label="item.scaleName" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="place fill_in">
        <span>公司地址：</span>
        <el-cascader v-model="place" :options="placeList" :props="{ expandTrigger: 'hover' ,value:'id'}">
        </el-cascader>
      </div>
    </div>
    <!-- <div uploadAccredited>
      <span>公司注册证件</span>
    </div> -->
    <div @click="postRrgisterInfo">
      <el-row>
        <el-button>注册</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getToken } from '../services/auth'
export default {
  name: 'eregister',
  data() {
    return {
      imageUrl: '',
      registerCode: '',
      registerAccount: '',
      registerCodeConfirm: '',
      industry: [],
      timeRegistration: '',
      companySize: '',
      action: '账号名由数字和大小写英文开头，不能其他字符和中文字',
      action2: '',
      place: [],
      name: '',
      registered_capital: '',
      owner: '',
      website: '',
      xtoken: { "X-token": getToken() },
      enterpriseInfo: [
        { value: this.name },
        { value: this.registered_capital },
        { value: this.owner },
        { value: this.website }
      ],
      listObj: [
        { title: '企业名称', paceholer_info: '请输入公司名称', id: '0' },
        { title: '注册资本', paceholer_info: '请输入注册资本', id: '1' },
        { title: '法人代表', paceholer_info: '请输入公司法人代表', id: '2' },
        { title: '公司官网', paceholer_info: '请输入公司官网', id: '3' }

      ],
      placeList: [],
      companySizeList: [],
      industryList: []
    }
  },
  methods: {
    resBlur() {
      var reg = /[^\w]/g
      var reg2 = /\u4e00-\u9fa5/g
      if (this.registerAccount == '') {
        this.action = "不能为空"
      } else if (reg2.test(this.registerAccount)) {
        this.action = '不能含有中文'
      } else if (reg.test(this.registerAccount)) {
        this.action = '非法字符'
      } else { this.action = '' }
    },
    resBlur2() {

      if (this.registerCode === this.registerCodeConfirm) {
        this.action2 = ''
      } else {
        this.action2 = '两次输入的密码不一致'
      }
    },
    getAvatar(res, file) {
      // this.comment.handleAvatarSuccess(res, file)
      this.imageUrl = res.data
    },
    beforeA(file) {
      // this.comment.beforeAvatarUpload(file)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getSelectInfo() {
      this.$Axios.all([
        this.$axios
          .get('/api/trade/tree')
          .then(res => res.data),
        this.$axios
          .get('/api/scale/all')
          .then(res => res.data.data),
        this.$axios
          .get('/api/city/tree')
          .then(res => res.data)
      ]).then(
        this.$Axios.spread((val1, val2, val3) => {
          // val 是数组中每个接口返回的值 res.data
          this.industryList = this.comment.trimTreeData(val1);
          this.companySizeList = val2;
          this.placeList = this.comment.trimTreeData(val3)
        })
      ).catch(err => {
        console.log(err);
      })
    },
    postRrgisterInfo() {
      let myDate = new Date();
      let msg = {
        'id': this.registerAccount,
        'password': this.registerCode,
        'name': this.enterpriseInfo[0].value,
        'registeredCapital': this.enterpriseInfo[1].value,
        'owner': this.enterpriseInfo[2].value,
        'website': this.enterpriseInfo[3].value,
        'tradePid': this.industry[0],
        'tradeId': this.industry[1],
        'provinceId': this.place[0],
        'cityId': this.place[1],
        'areaId': this.place[2],
        'scaleId': this.companySize,
        'createTime': myDate,
        'photo': this.imageUrl
      };
      this.$axios.post('/api/auth/company/register', msg).then(response => {
        if (response.status === 200) {
          this.$message({
            message: '注册成功',
            type: 'sucess'
          })
          this.$router.push({ name: 'elogin' })
        }
      }).catch(err => {
        console.log(err)
      }
      )
    }
  },
  // 刷新就执行
  mounted() {
    this.getSelectInfo()

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eregister {
  width: 900px;
  padding: 20px 50px 20px 50px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
.register {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.companyInfo {
  display: flex;
  flex-direction: column;
}
.upload_logo {
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
.avatar > img {
  width: 178px;
  height: 178px;
}
.fill_in {
  margin-bottom: 20px;
  display: flex;
  justify-content: left;
}
.fill_in span {
  height: 35px;
  margin-left: 20px;
  line-height: 35px;
}
</style>
