export default class InputHandler {
  constructor(
    elementHandler,
    commandHistory,
    handlerRegistry,
  ) {
    this.elementHandler = elementHandler;
    this.commandHistory = commandHistory;
    this.handlerRegistry = handlerRegistry;
  }

  setupInput() {
    this.elementHandler.content.addEventListener('click', () => {
      const input = this.elementHandler.getCurrentInputElement();

      if (input) {
        input.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      const input = this.elementHandler.getCurrentInputElement();

      if (!input) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const value = input.value;
        const output = this.handlerRegistry.handleInput(value);

        this.elementHandler.addOutput(output);
        this.commandHistory.addCommand(value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const value = this.commandHistory.getPrevious();

        this.elementHandler.setInput(value);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const value = this.commandHistory.getNext();

        this.elementHandler.setInput(value);
      }
    });
  }
}

