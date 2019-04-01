<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard
      v-for="event in event.events"
      v-bind:key="event.id"
      :event="event"
    />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >&nbsp;|
    </template>
    <template v-if="nextExists">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    nextExists() {
      var nextExists = this.event.totalEvents > this.page * 3
      return nextExists
    },
    ...mapState(['event', 'user'])
  }
}
</script>
