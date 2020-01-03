import { GraphinState } from '../types';

export default class HistoryController {
  historyIndex: number;

  history: GraphinState[];

  constructor() {
    this.history = [];
    this.historyIndex = -1;
  }

  save = (state: GraphinState) => {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history = this.history.concat([{ ...state }]);
    this.historyIndex = this.historyIndex + 1;
  };

  undo = () => {
    if (this.getHistoryInfo().disableUndo) {
      console.warn('There is no more undo history');
      return;
    }
    this.historyIndex = this.historyIndex - 1;
    return this.history[this.historyIndex];
  };

  redo = () => {
    if (this.getHistoryInfo().disableRedo) {
      console.warn('There is no more redo history');
      return;
    }
    this.historyIndex = this.historyIndex + 1;
    return this.history[this.historyIndex];
  };

  getHistoryInfo = () => {
    return {
      currentStep: this.historyIndex + 1,
      allStep: this.history.length,
      disableRedo: this.historyIndex === this.history.length - 1,
      disableUndo: this.historyIndex === 0,
    };
  };

  reset = () => {
    this.history = [];
    this.historyIndex = -1;
  };
}
