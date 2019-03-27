<template>
  <div>
    <h1> Create an event: {{user.name}} </h1>
    <p>This was created by {{user.id}}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">
        {{ cat }}      
      </li>    
    </ul>
    <p>{{ getEventById(2) }}</p>
  </div>  
</template>

<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getEventById']),
      ...mapState(['user', 'categories'])
    }
  }
</script>

<style scoped>

</style>