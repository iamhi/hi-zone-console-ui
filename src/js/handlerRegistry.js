export default class HandlerRegistry {
  constructor() {
    this.handlers = {};
  }

  addHandler(command, handler) {
    this.handlers[command] = handler;
  }

  handleInput(input) {
    const [command, ...args] = input.split(' ');
    const handler = this.handlers[command];

    if (handler) {
      return handler(args);
    }
  }
}

