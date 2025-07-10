<template>
  <div id="app">
    <h1>スライドパズル</h1>
    <PuzzleBoard />
  </div>
</template>

<script>
import PuzzleBoard from './components/PuzzleBoard.vue';

export default {
  name: 'App',
  components: {
    PuzzleBoard
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>