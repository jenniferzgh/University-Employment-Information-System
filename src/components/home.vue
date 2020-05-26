<template>
  <div id="home">
    <div class="part1">
      <h1>事业单位</h1>
      <div class="institution">
        <div class="institutionCont Cont">
          <div class="mesCard" v-for="item in allInstitution" v-bind:key="item.id">
            <img :src="item.photo" alt="">
            <span>{{item.name}}</span>
            <div @click="linkToEnterprise(item)" class="hoverThis">企业详情</div>
          </div>
        </div>
        <div class="paginationForInst pagination">
          <el-pagination :page-size="listQuery.pageSize" :current-page="listQuery.pageNum" background
            layout="prev, pager, next" :total="total" current-change="handlerCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="part2 part">
      <h1>热门招聘</h1>
      <div class="hot">
        <div class="Cont">
          <div class="mesCard" v-for="item in popularRecruitment" v-bind:key="item.id">
            <div class="recruContent">
              <h2>{{item.companyName}}</h2>
              <span>地点:{{item.provinceName}}|{{item.cityName}}</span>
              <div>职位：{{item.industryName}}</div>
              <div>薪资：{{item.salaryMax}}-{{item.salaryMin}}</div>
            </div>
            <div @click="linkToRecruitment(item)" class="hoverThis">企业招聘详情</div>
          </div>
        </div>
        <div class="paginationForHot pagination">
          <el-pagination :page-size="listQuery2.pageSize" :current-page="listQuery2.pageNum" background
            layout="prev, pager, next" :total="total2" @current-change="handlerCurrentChange2">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="part3 part">
      <h1>就业指导</h1>
      <div class="guidanceArticles">
        <div class="Cont">
          <div class="mesCard" v-for="item in guidanceArticles" v-bind:key="item.id">
            <img :src="item.background" alt="">
            <span>{{item.title}}</span>
            <div @click="linkToArticle(item.id)" class="hoverThis">文章详情</div>
          </div>
        </div>
        <div class="paginationForArticle pagination">
          <el-pagination :page-size="listQuery3.pageSize" :current-page="listQuery3.pageNum" background
            layout="prev, pager, next" :total="total3" @current-change="handlerCurrentChange3">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getUserType } from '../services/auth'
export default {
  name: 'home',
  data() {
    return {
      fatherMsg: { name: '123' },
      userTypeId: undefined,
      popularRecruitment: [],
      listQuery: {
        pageSize: 3,
        pageNum: 1
      },
      listQuery2: {
        pageSize: 3,
        pageNum: 1
      },
      listQuery3: {
        pageSize: 3,
        pageNum: 1
      },
      total: 0,
      total2: 0,
      total3: 0,
      allInstitution: [],
      guidanceArticles: []
    }
  },
  methods: {
    linkToRecruitment(data) {

      this.$router.push({ path: 'recruitmentDetail', query: { companyId: data.companyId, id: data.id } })
    },
    linkToArticle(data) {

      this.$router.push({ path: 'articleDetail', query: { msg: data } })
    },
    linkToEnterprise(data) {

      this.$router.push({ path: 'enterpriseDetail', query: { companyId: data.id } })
    },
    getSelectInfo() {

    },
    getJosList() {
      this.$axios.get('/api/company/page', { params: this.listQuery }).then(response => {
        let { data, success, total } = response.data
        if (success) {
          this.total = total
          this.allInstitution = data

        }
      }).catch()
    },
    getJosList2() {
      this.$axios.get('/api/jos/info/list', { params: this.listQuery2 }).then(response => {
        let { data, success, total } = response.data
        if (success) {
          this.total2 = total
          this.popularRecruitment = data
        }
      }).catch()
    },
    getArticleList() {
      this.$axios.get('/api/guidance/page', { params: this.listQuery3 }).then(response => {
        let { data, success, total } = response.data
        if (success) {
          this.total3 = total
          this.guidanceArticles = data
        }
      }).catch()
    },
    handlerCurrentChange(currentPage) {
      this.listQuery.pageNum = currentPage
      this.getJosList()
    },
    handlerCurrentChange2(currentPage) {
      this.listQuery2.pageNum = currentPage
      this.getJosList2()
    },
    handlerCurrentChange3(currentPage) {
      this.listQuery2.pageNum = currentPage
      this.getJosList2()
    }
  },
  created() {
    this.userTypeId = getUserType();
    this.getJosList();
    this.getJosList2();
    this.getArticleList()
  }

}
</script>

<style scoped>
#home {
  padding-bottom: 100px;
}
.part {
  margin-top: 120px;
}
.Cont {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.mesCard {
  width: 280px;
  height: 221px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.mesCard > img {
  display: block;
  width: 280px;
  height: 160px;
}
.mesCard > span {
  height: 40px;
  line-height: 40px;
  color: #ff9900;
}
.mesCard > .recruContent {
  flex-direction: column;
  justify-content: center;
  height: 180px;
  margin: 20px;
  border-bottom: 3px solid #ff9900;
}
.pagination {
  margin-top: 50px;
}
.hoverThis {
  color: #000;
  cursor: pointer;
}
.hoverThis:hover {
  color: #ff9900;
}
</style>
