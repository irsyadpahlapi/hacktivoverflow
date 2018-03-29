<template>
  <div id="app">
    <navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '@/components/NavBar'
export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>
body {
  margin: 0;
  background-image:url('https://png.pngtree.com/thumb_back/fw800/back_pic/00/05/52/7756273b2f1c4e1.png');
  background-size : cover;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
