import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  totalEvents: 0,
  event: {}
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS(state, total) {
    state.totalEvents = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
// *** Best practice/ PRO TIP ***
// Mutations should NOT be called from other vuex modules
// Mutations should ONLY be called from Actions inside the current module
export const actions = {
  createEvent({ commit, dispatch, rootState }, event) {
    console.log('User creating event is: ' + rootState.user.user.name)
    // dispatch('actionToCall')
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        var totalEvents = response.headers['x-total-count']
        console.log('total events: ' + totalEvents)
        commit('SET_EVENTS', response.data)
        commit('SET_TOTAL_EVENTS', totalEvents)
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error: ' + error.response)
        })
    }
  }
}
export const getters = {
  catLength: state => {
    return state.categories.length
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
