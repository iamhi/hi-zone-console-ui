export default class CommandHistory {
  constructor() {
    this.history = [];
    this.idx = -1;
  }

  addCommand(command) {
    if (command && command.trim() !== '' && command !== this.history[this.history.length - 1]) {
      this.history.push(command);
      this.idx = this.history.length;
    }
  }

  getPrevious() {
    if (this.idx === 0) {
      this.idx = this.history.length;
    }

    this.idx -= 1;

    return this.history[this.idx];
  }

  getNext() {
    if (this.idx === this.history.length - 1) {
      this.idx = -1; 
    }

    this.idx += 1;

    return this.history[this.idx];
  }

  reset() {
    this.idx = this.history.length;
  }
}

