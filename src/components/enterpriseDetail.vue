<template>
  <div class="enterprise">
    <img :src="enterpriceInfo.photo" alt="">
    <h1>{{enterpriceInfo.name}}</h1>
    <span>公司性质：{{enterpriceInfo.tradeName}}</span>
    <span>企业法人：{{enterpriceInfo.owner}}</span>
    <span>公司地址：{{enterpriceInfo.provinceName}}{{enterpriceInfo.Source}}{{enterpriceInfo.areaName}}</span>
    <span>公司规模：{{enterpriceInfo.scale}}</span>
    <span>公司建立时间：{{enterpriceInfo.createTime}}</span>
    <span>公司网站：{{enterpriceInfo.website}}</span>
    <router-view />
  </div>

</template>

<script>
export default {
  name: 'enterpriseDetail',
  data() {
    return {
      enterpriceInfo: {},
    }
  },
  methods: {
    getEnterparceInfo() {
      this.$axios.get(`api/company/string/${this.$route.query.companyId}`).then(res => {
        if (res.status === 200) {
          this.enterpriceInfo = res.data.data;

        }
      }).catch(err => { console.log(err) })
    }
  },
  mounted() {
    this.getEnterparceInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.enterprise {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 100px;
  padding-top: 80px;
  padding-bottom: 120px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.enterprise > img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
}
.enterprise > span {
  font-size: 25px;
}
</style>