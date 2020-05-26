<template>
  <div class="eform">
    <h1>招聘信息填写</h1>
    <h2>招聘详情</h2>
    <div class="epart epart1">
      <div class="recruitPart recruitPart1">
        <span>招聘岗位：</span>
        <el-cascader v-model="wanted" :options="wantedList" :props="{ expandTrigger: 'hover' ,value:'id'}"
          @change="wantedChange">
        </el-cascader>
      </div>
      <div class="recruitPart recruitPart2">
        <span>薪资待遇：</span>
        <div>
          <el-input v-model="salaryMax" placeholder="最低薪资"></el-input>
          <span>-</span>
          <el-input v-model="salaryMin" placeholder="最高薪资"></el-input>
        </div>
      </div>
      <div class="recruitPart recruitPart3">
        <span>工作地址：</span>
        <el-cascader :props="setting" ref="cascader" v-model="place" :options="placeList" @change="placehover"
          @hover="placehover">
        </el-cascader>
      </div>
      <div class="recruitPart recruitPart4">
        <span>可见高校：</span>
        <el-cascader :options="schoolList" v-model="schoolNeverChange" :show-all-levels="false" collapse-tags clearable
          :props="schoolprops" @change="setArray">
        </el-cascader>
      </div>
      <div class="recruitPart recruitPart5">
        <span>详细地址:</span>
        <el-input v-model="placedetail" placeholder="请输入详细地址"></el-input>
      </div>
      <div class="recruitPart recruitPart6">
        <span>联系方式</span>
        <el-input v-model="phone" placeholder="请输入电话号码"></el-input>
      </div>
      <div class="recruitPart recruitPart7">
        <span>招聘截止时间：</span>
        <el-date-picker v-model="dateCut" type="date" placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div class="epart2">
      <span>额外待遇：</span>
      <el-checkbox v-model="checked1" label="五险一金" border></el-checkbox>
      <el-checkbox v-model="checked2" label="周末双休" border></el-checkbox>
      <el-checkbox v-model="checked3" label="996" border></el-checkbox>
      <el-checkbox v-model="checked4" label="965" border></el-checkbox>
    </div>
    <h2>职位详情</h2>
    <div class="editor">
      <el-card style="height: 610px;">
        <quill-editor v-model="editorContent" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
        </quill-editor>
      </el-card>
    </div>
    <div class="tijiao">
      <el-button type="primary" v-on:click="postInfo">提交</el-button>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'eform',
  components: {
    quillEditor
  },
  // eslint-disable-next-line
  data() {
    return {
      editorOption: {},
      editorContent: null,
      qualification: '',
      schoolNeverChange: '',
      wanted: '',
      place: [],
      pay: '',
      checked1: '',
      imageUrl: '',
      checked2: '',
      checked3: '',
      checked4: '',
      province: '',
      salaryMin: '',
      salaryMax: '',
      placeList: [],
      wantedList: [],
      school: [],
      dateCut: '',
      placedetail: '',
      phone: '',
      schoolprops: { multiple: true, expandTrigger: 'hover', multiple: true, value: 'id' },
      setting: {
        value: 'id',
        expandTrigger: 'hover'
      },
      schoolList: []
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
    placehover(val) {
      let nodesObj = this.$refs['cascader'].getCheckedNodes()

    },
    wantedChange() {
    },
    placeChange() {
    },
    setArray(data) {
      for (let i = 0; i < data.length; i++) {
        this.school[i] = data[i].join(',')
      }
    },
    // getplaceList() {
    //   this.$axios.get('/api/city/tree').then((response) => {
    //     this.placeList = this.trimTreeData(response.data)
    //   })
    // },
    getInfo() {
      this.$Axios.all([
        this.$axios
          .get('/api/city/tree')
          .then(res => res.data),
        this.$axios
          .get('/api/industry/tree')
          .then(res => res.data),
        this.$axios
          .get('/api/school/tree')
          .then(res => res.data)
      ]).then(
        this.$Axios.spread((val1, val2, val3) => {
          // val 是数组中每个接口返回的值 res.data
          this.placeList = this.comment.trimTreeData(val1);
          this.wantedList = this.comment.trimTreeData(val2);
          this.schoolList = val3
        })
      ).catch(err => {
        console.log(err);
      })
    },
    postInfo() {
      let params = {
        'schools': this.school,
        'detail': this.editorContent,
        'qualification': this.qualification,
        'industries': this.wanted,
        'address': this.placedetail,
        'city': this.place,
        'pay': this.pay,
        'degrees': this.degrees,
        // 'extra': [{1:this.checked1}, {this.checked2, {this.checked3, this.checked4],
        // 'extra': { '1': this.checked1, '2': this.checked2, '3': this.checked3, '4': this.checked4 },
        'extra1': this.checked1,
        'extra2': this.checked2,
        'extra3': this.checked3,
        'extra4': this.checked4,
        'salaryMin': this.salaryMin,
        'salaryMax': this.salaryMax,
        'deadline': this.dateCut,
        'placedetail': this.placedetail,
        'tel': this.phone
      };
      this.$axios.post('/api/jos/add', params).then((response) => {
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
  // 刷新就执行
  mounted() {
    this.getInfo()

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eform {
  width: 1200px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 20px 20px 20px;
  margin-bottom: 60px;
}
.eform > .epart {
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.eform > .epart > div {
  width: 340px;
  margin-bottom: 20px;
}
.eform > .epart1 > .recruitPart {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
}
.eform > .epart1 > .recruitPart2 > div {
  width: 220px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
}
.eform > .epart1 > .recruitPart2 > div > span {
  margin-left: 10px;
  margin-right: 10px;
}
.eform > .epart1 > .recruitPart > .el-cascader {
  width: 220px;
}
.eform > .epart1 > .recruitPart > .el-input {
  width: 220px;
}

.epart2 {
  width: 900px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
}
.editor {
  width: 900px;
  margin: 0 auto;
}
.tijiao {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 25px;
}
</style>
