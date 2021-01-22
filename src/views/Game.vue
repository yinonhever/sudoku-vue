<template>
  <Page name="game" :heading="`Level: ${level}`">
    <div class="board">
      <div
        v-for="(row, rowIndex) in userBoard"
        :key="rowIndex"
        class="board__row"
      >
        <input
          v-for="(col, colIndex) in row"
          :key="colIndex"
          :class="
            initialBoard[rowIndex][colIndex] !== ''
              ? 'board__cell board__cell--prefilled'
              : 'board__cell'
          "
          :readonly="initialBoard[rowIndex][colIndex] !== ''"
          :maxlength="1"
          :value="userBoard[rowIndex][colIndex]"
          @input="changeHandler($event, rowIndex, colIndex)"
        />
      </div>
    </div>
    <div class="game__buttons">
      <BaseButton type="fill" @click="finishGame">Finish</BaseButton>
      <BaseButton type="unite" @click="resetBoard">Again</BaseButton>
    </div>
  </Page>
</template>

<script>
import { randomSudoku, emptySudokuCells } from "../util/functions";

export default {
  data() {
    return {
      targetBoard: [],
      initialBoard: [],
      userBoard: [],
    };
  },
  computed: {
    level() {
      return this.$store.getters.level;
    },
  },
  methods: {
    initBoard() {
      this.targetBoard = randomSudoku();
      this.initialBoard = emptySudokuCells(this.targetBoard, this.level);
      this.userBoard = this.initialBoard.map((row) => [...row]);
    },
    changeHandler(event, rowIndex, colIndex) {
      event.target.value = event.target.value.replace(/[^1-9]/g, "");
      this.userBoard[rowIndex][colIndex] = event.target.value;
    },
    resetBoard() {
      this.userBoard = this.initialBoard.map((row) => [...row]);
    },
    finishGame() {
      const { targetBoard, userBoard } = this;
      this.$store.dispatch("finishGame", { targetBoard, userBoard });
    },
  },
  created() {
    this.initBoard();
  },
};
</script>
