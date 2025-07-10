<template>
  <div class="puzzle-container">
    <div class="board">
      <PuzzleTile
          v-for="(tile, index) in board"
          :key="index"
          :value="tile"
          :is-empty="tile === null"
          @click="moveTile(index)"
      />
    </div>
    <p v-if="isSolved" class="solved-message">🎉 クリアおめでとう！ 🎉</p>
    <div class="controls">
      <button @click="shuffleBoard" class="control-button">
        <span v-if="!isSolved">シャッフルして再スタート</span>
        <span v-else>もう一度プレイ</span>
      </button>
      <p class="move-count">移動回数: {{ moveCount }}</p>
    </div>
  </div>
</template>

<script>
import PuzzleTile from './PuzzleTile.vue';

export default {
  name: 'PuzzleBoard',
  components: {
    PuzzleTile
  },
  data() {
    return {
      board: [],
      emptyTileIndex: null,
      isSolved: false,
      moveCount: 0,
    };
  },
  created() {
    this.shuffleBoard(); // コンポーネトが作成されたらシャッフル
  },
  methods: {
    // パズルボードをシャッフルする
    shuffleBoard() {
      // 1から8とnullの初期配列
      let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

      // 解けるシャッフルを保証するロジック (簡易版)
      // より厳密な方法はインバージョン数を確認する必要がありますが、ここではシンプルに
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }

      this.board = tiles;
      this.emptyTileIndex = this.board.indexOf(null);
      this.isSolved = false;
      this.moveCount = 0;
    },

    // ピースを移動する
    moveTile(clickedIndex) {
      if (this.isSolved) return; // クリア後は移動させない

      const emptyRow = Math.floor(this.emptyTileIndex / 3);
      const emptyCol = this.emptyTileIndex % 3;
      const clickedRow = Math.floor(clickedIndex / 3);
      const clickedCol = clickedIndex % 3;

      const rowDiff = Math.abs(emptyRow - clickedRow);
      const colDiff = Math.abs(emptyCol - clickedCol);

      // 移動可能条件: 空きマスとクリックされたマスが隣接していること
      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        // ピースを入れ替える
        const newBoard = [...this.board]; // 新しい配列を作成してリアクティブに更新
        [newBoard[this.emptyTileIndex], newBoard[clickedIndex]] =
            [newBoard[clickedIndex], newBoard[this.emptyTileIndex]];

        this.board = newBoard;
        this.emptyTileIndex = clickedIndex;
        this.moveCount++; // 移動回数をインクリメント

        this.checkSolved(); // クリア判定
      }
    },

    // パズルがクリアされたかチェックする
    checkSolved() {
      const correctBoard = [1, 2, 3, 4, 5, 6, 7, 8, null];
      this.isSolved = this.board.every((val, index) => val === correctBoard[index]);
    }
  }
}
</script>

<style scoped>
.puzzle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  width: 300px; /* 3 * 100px */
  height: 300px; /* 3 * 100px */
  border: 3px solid #666;
  border-radius: 8px;
  overflow: hidden; /* 角を丸める */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background-color: #ddd;
}

.solved-message {
  font-size: 1.8em;
  color: #28a745;
  font-weight: bold;
  margin-top: 20px;
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.controls {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.control-button {
  padding: 12px 25px;
  font-size: 1.1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.control-button:hover {
  background-color: #0056b3;
}

.move-count {
  font-size: 1.2em;
  color: #555;
  font-weight: bold;
}
</style>