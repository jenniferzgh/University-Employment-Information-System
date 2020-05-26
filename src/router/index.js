import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import slogin from '@/components/slogin'
import elogin from '@/components/elogin'
import recruitmentDetail from '@/components/recruitmentDetail'
import eregister from '@/components/eregister'
import home from '@/components/home'
import helpStudent from '@/components/helpStudent'
import sform from '@/components/sform'
import eform from '@/components/eform'
import messagePage from '@/components/messagePage'
import resumeDetail from '@/components/resumeDetail'
import articleDetail from '@/components/articleDetail'
import enterpriseDetail from '@/components/enterpriseDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        { path: '/', component: home },
        { path: 'home', name: 'home', component: home },
        // eslint-disable-next-line standard/object-curly-even-spacing
        { path: 'helpStudent', component: helpStudent, name: 'helpStudent' },
        { path: 'eform', component: eform, name: 'eform' },
        { path: 'sform', component: sform, name: 'sform' },
        { path: 'messagePage', component: messagePage, name: 'messagePage' },
        { path: 'resumeDetail', name: 'resumeDetai', component: resumeDetail },
        { path: 'recruitmentDetail', name: 'recruitmentDetail', component: recruitmentDetail },
        { path: 'articleDetail', name: 'articleDetail', component: articleDetail },
        { path: 'enterpriseDetail', name: 'enterpriseDetail', component: enterpriseDetail }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      children: [
        { path: 'slogin', component: slogin, name: 'slogin' },
        // eslint-disable-next-line standard/object-curly-even-spacing
        { path: 'elogin', component: elogin, name: 'elogin' },
        { path: 'eregister', component: eregister, name: 'eregister' }
      ]
    }
  ],
  scrollBehavior (to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    } else {
      return { x: 0, y: 0 }
    }
  }
})
