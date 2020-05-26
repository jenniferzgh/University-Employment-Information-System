<template>

  <div class="messagePage">
    <h2>投递列表</h2>

    <div class="messageCard" v-for='item of messageList' :key='item.value'>
      <img :src="item.photo" alt="">
      <div>
        <h3>{{item.studentName}}</h3>
        <span>{{item.industryName}}</span>
        <div>{{item.updateTime}}</div>
      </div>
      <router-link :to="{name:'resumeDetai',params:{username:item.studentId,schoolId:item.schoolId}}">查看简历详情
      </router-link>
      <div class="link_box4" @click="luyong(item.josId,item.studentId,item.schoolId)">
        <el-row>
          <el-button>录用</el-button>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'messagePage',
  data() {
    return {
      messageList: []

    }
  },
  methods: {
    getStudentJos() {
      this.$axios.get('api/studentJos/info/list/0').then(response => {
        this.messageList = response.data.data;
        console.log(this.messageList)
        for (let i = 0; i++; i < this.messageList.length) {
          this.messageList[i].value = i
        }
      }).catch(err => {
        console.log(err)
      })
    },
    luyong(data1, data2, data3) {
      this.$axios.put('api/studentJos/info', { josId: data1, studentId: data2, schoolId: data3, status: 1 }).then(res => {
        console.log(res)
        this.getStudentJos()
      }).catch(err => {
        console.log(err)
      })


    }
  },
  mounted() {
    this.getStudentJos()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messagePage {
  width: 1000px;
  min-height: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 50px;
  margin-bottom: 50px;
}
.messageCard {
  width: 900px;
  height: 150px;
  margin: 0 auto;
  margin-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.messageCard > img {
  width: 120px;
  height: 120px;
}
</style>
