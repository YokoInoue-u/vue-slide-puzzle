<script setup>
import PuzzleBoard from '@/components/PuzzleBoard.vue';
</script>

<template>
  <div>
    <h1>スライドパズル</h1>
    <PuzzleBoard />

    <router-link :to="{ name: 'Home'}">＜ to Home</router-link>
  </div>
</template>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>