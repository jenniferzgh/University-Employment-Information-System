<template>
  <div class="articleDetail">
    <div class="header">
      <img :src="articleId.background" alt="">
      <h1>{{articleId.title}}</h1>
    </div>
    <div class="content" v-html="articleId.content"></div>
    <div v-if="articleId.source!=null">文章转载来自：{{articleId.source}} 文章编写人：{{articleId.author}}</div>
    <router-view />
  </div>

</template>

<script>
export default {
  name: 'articleDetail',
  data() {
    return {
      articleId: ''

    }
  },
  methods: {
    getArticle() {
      this.$axios.get(`api/guidance/${this.$route.query.msg}`).then(res => {
        this.articleId = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.articleId = this.$route.query.msg;
    this.getArticle()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articleDetail {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  min-height: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 50px;
}
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 50px;
}
.header > img {
  width: 200px;
  height: 200px;
  margin-right: 50px;
}
.content {
  width: 100%;
  min-height: 600px;
}
</style>
