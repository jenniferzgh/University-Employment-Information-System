<template>
  <div class="recruitmentDetail">
    <div class="leftCont">
      <div class="head">
        <div class="headLeft">

          <h1>{{enterpriceProfile.name}}{{recruitmentData.industryName}}</h1>
          <span>{{recruitmentData.summery}}</span>
          <span>薪资：{{recruitmentData.salaryMin}}-{{recruitmentData.salaryMax}}|{{recruitmentData.industryName}}</span>
          <span>工作地址：{{recruitmentData.provinceName}}{{recruitmentData.cityName}}{{recruitmentData.areaName}}</span>
          <span>截止日期：{{recruitmentData.deadline}}</span>
          <span v-if="recruitmentData.extra1">福利：五险一金</span>
          <span v-if="recruitmentData.extra2">福利：周末双休</span>
        </div>
        <div class="headRight">
          <!-- <router-link to="../login/eregister"> -->
          <el-row>
            <el-button @click="postInfo">投递简历</el-button>
          </el-row>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="main" v-html="recruitmentData.detail">

      </div>
    </div>
    <div class="rightCont">
      <img :src="enterpriceProfile.photo" alt="">
      <span>公司名称：{{enterpriceProfile.name}}</span>
      <span>公司性质：{{enterpriceProfile.tradePname}}</span>
      <span>所属行业：{{enterpriceProfile.tradePname}}{{enterpriceProfile.tradeName}}</span>
      <span>公司规模：{{enterpriceProfile.scale}}</span>
      <span>公司网址：{{enterpriceProfile.website}}</span>
      <span>所在地址：{{enterpriceProfile.provinceName}}{{enterpriceProfile.cityName}}{{enterpriceProfile.areaName}}</span>
      <span>创建时间：{{enterpriceProfile.createTime}}</span>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'recruitmentDetail',
  data() {
    return {
      recruitmentData: {},
      enterpriceProfile: {}
    }
  },
  methods: {
    getCompanyMsg() {
      this.$Axios.all([
        this.$axios.get(`api/company/string/${this.$route.query.companyId}`).then(res => res.data.data),
        this.$axios.get(`api/jos/${this.$route.query.id}`).then(res => res.data.data)
      ]).then(
        this.$Axios.spread((val1, val2) => {
          this.enterpriceProfile = val1;
          this.recruitmentData = val2
        })
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    postInfo() {
      this.$axios.get(`api/studentJos/info/${this.recruitmentData.id}`).then(response => {
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getCompanyMsg()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recruitmentDetail {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.leftCont {
  width: 820px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.leftCont > .head {
  height: 200px;
  background: #eff7fa;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid #cdd1d3;
}
.leftCont > .head > .headLeft {
  display: flex;
  flex-direction: column;
  align-items: left;
}
.leftCont > .head > .headLeft > h1 {
  font-size: 24px;
}
.leftCont > .head > .headLeft > span {
  margin-bottom: 5px;
}
.leftCont > .head > .headRight {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.leftCont > .main {
  min-height: 500px;
  padding: 25px 10px 25px 10px;
}
.rightCont {
  width: 320px;
  height: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.rightCont > img {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  margin-bottom: 25px;
  margin-top: 25px;
  border-radius: 100%;
}
.rightCont > span {
  margin-bottom: 5px;
}
</style>
