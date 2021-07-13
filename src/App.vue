<template>
<div>
  <head>
    <title>My first BootstrapVue app</title>
  </head>
  <body>
  <b-container fluid>
    <div id="app" class="mt-1 py-0">
      <DataViewer/>
    </div>
  </b-container>
  </body>
  </div>
</template>

<script>

import DataViewer from './components/DataViewer.vue'

export default {
  name: 'App',
  components: {
    DataViewer
  },
  created(){
    document.title = 'Canteras. Capacidad de carga'
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
