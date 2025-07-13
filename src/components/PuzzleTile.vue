<template>
  <div :class="['tile', { 'empty-tile': isEmpty }]" @click="$emit('click')">
    <span v-if="!isEmpty">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'PuzzleTile',
  props: {
    value: {
      type: [Number, null], // 数字またはnull
      required: true
    },
    isEmpty: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  font-weight: bold;
  background-color: #4CAF50; /* ピースの色 */
  color: white;
  border: 1px solid #388E3C; /* ピースの境界線 */
  cursor: pointer;
  user-select: none; /* テキスト選択を無効化 */
  transition: transform 0.2s ease-in-out, background-color 0.2s ease;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2); /* 内側の影 */
}

.tile:hover:not(.empty-tile) {
  background-color: #66BB6A; /* ホバー時の色 */
  transform: scale(1.03); /* 少し拡大 */
}

.empty-tile {
  background-color: #e0e0e0; /* 空きマスの色 */
  cursor: default;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.3); /* 空きマスは深めの影 */
}
</style>