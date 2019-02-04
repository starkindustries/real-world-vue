import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import EventCreate from './views/EventCreate.vue'
import EventShow from './views/EventShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/list',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/show',
      name: 'event-show',
      component: EventShow
    }
  ]
})
