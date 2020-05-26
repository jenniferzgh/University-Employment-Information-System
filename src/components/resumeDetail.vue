<template>
  <div class="resumeDetail">
    <div class="resumeHead">
      <div class="headLeft">
        <img :src="studentId.photo" alt="">
      </div>
      <div class="headRight">
        <div>
          <span>姓名：{{studentId.name}}</span>
          <span>年龄：{{studentId.age}}</span>
          <span>身份：{{studentId.politicalName}}</span>
          <span>学历：{{studentId.categoryName}}</span>
          <span>学校：{{studentId.schoolName}}</span>
          <span>专业：{{studentId.majorName}}</span>
        </div>
        <div>
          <span v-if="studentId.sex==2">性别：女</span>
          <span v-if="studentId.sex==1">性别：男</span>
          <span>电话：{{studentId.tel}}</span>
          <span>微信：{{studentId.wx}}</span>
          <span>邮箱：{{studentId.mail}}</span>
          <span>求职意向：{{studentId.industryName}}</span>
        </div>
      </div>
    </div>
    <div class="resumeMain">
      <div class="resumeMainPart1 resumeMainPart">
        <h2>个人优势</h2>
        <span>{{studentId.advantage}}</span>
      </div>
      <div class="resumeMainPart1 resumeMainPart">
        <h2>实习经历</h2>
        <span>{{studentId.practice}}</span>
      </div>
      <div class="resumeMainPart1 resumeMainPart">
        <h2>校园经历</h2>
        <span>{{studentId.campus}}</span>
      </div>
      <div class="resumeMainPart1 resumeMainPart">
        <h2>项目经历</h2>
        <span>{{studentId.project}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'resumeDetail',
  data() {
    return {
      studentId: ''
    }
  },
  methods: {
    getData() {
      this.$axios.get(`api/student/info?studentId=${this.$route.params.username}&schoolId=${this.$route.params.schoolId}`).then((response) => {
        this.studentId = response.data.data
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style scoped>
.resumeDetail {
  width: 1000px;
  min-height: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 70px;
  margin-bottom: 50px;
}
.resumeDetail > .resumeHead {
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.headLeft {
  width: 220px;
  height: 220px;
  margin-right: 30px;
}
.headLeft > img {
  width: 220px;
  height: 220px;
}
.headRight {
  width: 690px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.headRight > div {
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.headRight > div > span {
  text-align: left;
  margin: 2px;
  font-size: 23px;
}
.resumeMain {
  text-align: left;
}
.resumeMain h2 {
  font-size: 28px;
}
.resumeMain > div {
  margin-top: 30px;
}
</style>
