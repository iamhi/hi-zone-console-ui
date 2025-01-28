import InputHandler from './js/inputHandler.js';
import ElementHandler from './js/elementHandler.js';
import CommandHistory from './js/commandHistory.js';
import HandlerRegistry from './js/handlerRegistry.js';

import './styles.css';

class Application {
  constructor() {
    this.elementHandler = new ElementHandler();
    this.commandHistory = new CommandHistory();
    this.handlerRegistry = new HandlerRegistry();
    this.inputHandler = new InputHandler(this.elementHandler, this.commandHistory, this.handlerRegistry);
  }

  setup() {
    this.inputHandler.setupInput();

    this.handlerRegistry.addHandler('help', () => `Available commands:
      help     - Show this help message
      clear    - Clear the terminal
      echo     - Echo a message
      date     - Show current date and time
      whoami   - Show current user`);

    this.handlerRegistry.addHandler('clear', () => this.elementHandler.clear());
  }
}

window.onload = () => {
  window.app = new Application();

  window.app.setup();
};
