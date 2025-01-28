export default class ElementHandler {
  constructor() {
    this.content = document.getElementById('terminal-content');
    
    const input = this.getCurrentInputElement();

    if (input) {
      input.value = '';
    }
  }

  setInput(text) {
    const input = this.getCurrentInputElement();

    if (input) {
      input.value = text;
    }
  }

  addOutput(text) {
    const outputDiv = document.createElement('div');

    outputDiv.className = 'terminal-output';
    outputDiv.textContent = text;

    this.content.appendChild(outputDiv);

    this.addInput();
  }

  addInput() {
    const newLine = document.createElement('div');

    newLine.className = 'terminal-line';
    newLine.innerHTML = `
      <span class="terminal-prompt">$</span>
      <input type="text" class="terminal-input" autofocus>
    `;

    this.content.appendChild(newLine);

    this.getCurrentInputElement().focus();

    this.content.scrollTop = this.content.scrollHeight;
  }

  getCurrentInputElement() {
    const inputs = this.content.querySelectorAll('.terminal-input');

    if (inputs.length === 0) {
      this.addInput();
    }

    return inputs[inputs.length - 1];
  }

  clear() {
    this.content.innerHTML = '';
  }
}

